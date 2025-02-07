// import React, {useEffect} from 'react';
// import {View, Text, Button} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import TwilioVoice from 'react-native-twilio-programmable-voice';
// import {endCall, initializeTwilio} from '../apiservice/twilioService';

// const IncomingCallScreen = ({route}) => {
//   const {callerId, token} = route.params; // Get caller ID and token from route parameters
//   const navigation = useNavigation();

//   // Initialize Twilio when the screen is focused
//   useEffect(() => {
//     const initialize = async () => {
//       await initializeTwilio(token);
//     };

//     initialize();

//     return () => {
//       // Clean up listeners when component unmounts
//       TwilioVoice.removeEventListener('IncomingCall');
//       TwilioVoice.removeEventListener('IncomingCallAccepted');
//       TwilioVoice.removeEventListener('IncomingCallRejected');
//     };
//   }, [token]);

//   const handleAnswer = async () => {
//     try {
//       // Accept the incoming call
//       await TwilioVoice.accept();
//       navigation.navigate('CallScreen', {phoneNumber: callerId});
//     } catch (error) {
//       console.error('Error accepting call:', error);
//     }
//   };

//   const handleDecline = () => {
//     endCall();
//     navigation.goBack();
//   };

//   return (
//     <View>
//       <Text>Incoming call from {callerId}</Text>
//       <Button title="Answer" onPress={handleAnswer} />
//       <Button title="Decline" onPress={handleDecline} />
//     </View>
//   );
// };

// export default IncomingCallScreen;
