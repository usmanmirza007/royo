// import React, {useState} from 'react';
// import {View, TextInput, Button} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {generateToken, makeCall} from '../apiservice/twilioService';
// import CustomButton from '../components/CustomButton';

// const DialPad = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const navigation = useNavigation();

//   const handleCall = async () => {
//     if (phoneNumber) {
//       try {
//         const identity = 'user_id'; // Replace with the actual user identity
//         const token = await generateToken(identity); // Generate Twilio token
//         await makeCall(phoneNumber, identity); // Make the call

//         navigation.navigate('CallScreen', {phoneNumber}); // Navigate to call screen
//       } catch (error) {
//         console.error('Error during the call process:', error);
//       }
//     }
//   };

//   return (
//     <View>
//       <TextInput
//         style={{borderWidth: 1, padding: 10}}
//         placeholder="Enter phone number"
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//         keyboardType="phone-pad"
//       />
//       <CustomButton label="Call" onPress={handleCall} />
//     </View>
//   );
// };

// export default DialPad;
