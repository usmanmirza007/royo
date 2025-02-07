import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {getWidthPercentage} from '../utils/Dimention';
import Colors from '../constants/Colors';

const OtpInput = ({length, onOtpChange, containerStyle, inputStyle}) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleOtpChange = (text, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);
    onOtpChange(updatedOtp.join(''));

    // Move to the next input if the user enters a digit
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      // Clear the current input
      const updatedOtp = [...otp];
      updatedOtp[index] = '';
      setOtp(updatedOtp);
      onOtpChange(updatedOtp.join(''));

      // Move focus to the previous input and clear it
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const prevUpdatedOtp = [...updatedOtp];
        prevUpdatedOtp[index - 1] = '';
        setOtp(prevUpdatedOtp);
        onOtpChange(prevUpdatedOtp.join(''));
      }
    }
  };

  return (
    <View style={[styles.otpContainer, containerStyle]}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => (inputRefs.current[index] = ref)}
          style={[styles.otpInput, inputStyle]}
          value={digit}
          onChangeText={text => handleOtpChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          maxLength={1}
          keyboardType="numeric"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: getWidthPercentage(90),
  },
  otpInput: {
    width: getWidthPercentage(11),
    height: getWidthPercentage(11),
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default OtpInput;
