import {Voice, Call} from '@twilio/voice-react-native-sdk';
import {baseUrl} from '../constants/ApiEndPoints';
import {postData} from './ApiService';

// Function to generate Twilio token
export const generateToken = async identity => {
  try {
    const response = await postData(`${baseUrl}/calls/generate-token`, {
      identity,
    });
    return response.token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
};

export const TokenValidate = async token => {
  try {
    const response = await postData(`${baseUrl}/calls/validate-token`, {
      token,
    });
    console.log('response_token', response);
    return response;
  } catch (error) {
    console.error('Error invalid token:', error);
    throw error;
  }
};

// Initialize Twilio Voice SDK
export const initializeTwilio = async token => {
  try {
    // Initialize Twilio with the provided token
    const voice = new Voice();
    await voice.register(token);
    console.log('Twilio Voice initialized successfully');

    // Handle incoming calls
    voice.on(Voice.Event.CallInvite, callInvite => {
      console.log('Incoming Call Invite:', callInvite);
      // Handle the incoming call invite (e.g., navigate to an IncomingCallScreen)
    });

    voice.on(Voice.Event.CallRinging, call => {
      console.log('Call is ringing:', call);
    });

    voice.on(Voice.Event.CallConnected, call => {
      console.log('Call connected:', call);
    });

    voice.on(Voice.Event.CallDisconnected, call => {
      console.log('Call disconnected:', call);
    });

    voice.on(Voice.Event.Error, error => {
      console.error('Twilio Voice SDK Error:', error);
    });
  } catch (error) {
    console.error('Error initializing Twilio Voice SDK:', error);
  }
};

// Function to make an outgoing call
export const makeCall = async (to, from, token) => {
  try {
    // Create a voice call
    const response = await postData(`${baseUrl}/calls/initiate-call`, {
      to,
      from,
    });

    if (response && response.call) {
      console.log('Outgoing call initiated via API:', response.call);

      const voice = new Voice();
      const callParams = {
        From: `client:${from}`,
        To: `client:${to}`,
      };
      const call = await voice.connect(token, callParams);
      // Listen for call events
      call.on(Call.Event.Connected, () => {
        console.log('Call connected');
      });
      console.log('disconnect_testing');
      call.on(Call.Event.Disconnected, () => {
        console.log('Call disconnected');
      });
      console.log('disconnect_testing1');
      call.on(Call.Event.FailedToConnect, error => {
        console.error('Failed to connect the call:', error);
      });
      console.log('disconnect_testing2');
      return call;
    } else {
      throw new Error('Error initiating call via API');
    }
  } catch (error) {
    console.error('Error making call12:', error);
    throw error;
  }
};

// End an active call
export const endCall = async call => {
  try {
    if (call) {
      await call.disconnect();
      console.log('Call ended');
    }
  } catch (error) {
    console.error('Error ending call:', error);
  }
};

// Handle incoming call via callback
export const handleIncomingCall = callback => {
  const voice = new Voice();
  console.log('incominTEst');
  voice.on(Voice.Event.CallInvite, callInvite => {
    console.log('Incoming Call Invite:', callInvite);
    callback(callInvite); // Execute the callback with the incoming call invite data
  });
};
