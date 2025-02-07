import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import useChat from '../components/UseChat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/Colors';
import {typography} from '../styles/TypoGraphy';

const Chat = ({route}) => {
  const recipientId = route.params.userId; // assuming you're passing userId and recipientId as params
  const [userId, setUserId] = useState('');
  const {messages, sendMessage, fetchMessages} = useChat(userId);
  const [newMessage, setNewMessage] = useState('');

  // Ref for FlatList to scroll to the bottom
  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchUserIdAndMessages = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('_id');
        if (storedUserId) {
          setUserId(storedUserId);
          fetchMessages(storedUserId, recipientId); // Fetch chat history
        }
      } catch (error) {
        console.error('Failed to retrieve user ID:', error);
      }
    };
    fetchUserIdAndMessages();
  }, [recipientId]);

  useEffect(() => {
    // Scroll to the end whenever new messages are received
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(userId, recipientId, newMessage);
      setNewMessage('');
    }
  };

  return (
    <View style={{flex: 1, padding: 10, backgroundColor: Colors.chatbg}}>
      {/* Message List */}
      <FlatList
        ref={flatListRef} // Reference to FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={{
              alignSelf: item.fromSelf ? 'flex-end' : 'flex-start',
              backgroundColor: item.fromSelf ? '#dcf8c6' : '#ececec',
              borderRadius: 10,
              padding: 10,
              marginBottom: 5,
            }}>
            <Text style={[typography.smallbody, {color: Colors.black}]}>
              {item.message}
            </Text>
            {/* Display time with AM/PM */}
            <Text
              style={{
                fontSize: 10,
                textAlign: 'right',
                color: Colors.gray,
                marginTop: 5,
              }}>
              {item.time} {/* Time with AM/PM */}
            </Text>
          </View>
        )}
      />

      {/* Input and Send Button */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CustomTextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
          style={{
            flex: 1,
            padding: 10,
          }}
        />
        
        <CustomButton
          title="Send"
          onPress={handleSendMessage}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  button: {
    top: 4,
  },
});