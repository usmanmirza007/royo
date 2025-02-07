import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {postData} from '../apiservice/ApiService';
import {baseUrl, postMessage, receivedMessage} from '../constants/ApiEndPoints';

// Helper function to format time as HH:mm AM/PM
const formatTime = timestamp => {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    // If timestamp is invalid, return a fallback (like '--:--')
    return '--:--';
  }
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 24-hour time to 12-hour format
  const formattedHours = hours.toString().padStart(2, '0');
  return `${formattedHours}:${minutes} ${ampm}`;
};

const useChat = userId => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('wss://cultivatepie.com', {
      transports: ['websocket'],
      cors: {
        origin: baseUrl,
        credentials: true,
      },
    });

    // Set socket in state
    setSocket(newSocket);

    // Add user to online users map when connected
    if (userId) {
      newSocket.emit('add-user', userId);
    }

    // Clean up socket when component unmounts
    return () => newSocket.disconnect();
  }, [userId]);

  // Send message using the API
  const sendMessage = async (from, to, message) => {
    const newMessage = {
      fromSelf: true,
      message,
      time: formatTime(new Date()), // Use current time for immediate update
    };

    // Immediately add the new message to state
    setMessages(prevMessages => [...(prevMessages || []), newMessage]);

    try {
      const response = await postData(`${baseUrl}${postMessage}`, {
        from,
        to,
        message,
      });
      if (response.msg === 'Message added successfully.') {
        // If server returns a valid createdAt, update the message time
        setMessages(prevMessages => {
          const updatedMessages = prevMessages.map((msg, index) => {
            if (index === prevMessages.length - 1) {
              return {
                ...msg,
                time: formatTime(response.data?.createdAt || new Date()),
              };
            }
            return msg;
          });
          return updatedMessages;
        });

        // Emit message to the recipient via socket
        if (socket) {
          socket.emit('send-msg', {
            from,
            to,
            msg: message,
          });
        }
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Fetch messages between two users
  const fetchMessages = async (from, to) => {
    try {
      const response = await postData(`${baseUrl}${receivedMessage}`, {
        from,
        to,
      });

      const formattedMessages = response.map(msg => ({
        ...msg,
        time: formatTime(msg.createdAt || new Date()), // Format time with AM/PM, fallback to current time if missing
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    if (socket) {
      socket.on('msg-receive', msg => {
        // Assuming msg is an object with message and createdAt fields
        const messageContent =
          typeof msg.message === 'object'
            ? JSON.stringify(msg.message)
            : msg.message; // Convert object to string if necessary
        setMessages(prevMessages => [
          ...prevMessages,
          {
            fromSelf: false,
            message: messageContent, // Add the received message content
            time: formatTime(msg.createdAt || new Date()), // Add formatted time with fallback to current time
          },
        ]);
      });
    }
  }, [socket]);

  return {
    messages,
    sendMessage,
    fetchMessages,
  };
};

export default useChat;
