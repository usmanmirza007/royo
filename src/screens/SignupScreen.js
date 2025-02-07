import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import globalStyles from '../styles/GlobalStyles';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import CustomDropdown from '../components/CustomDropdown';
import {
  signupUser,
  updateField,
  validateFields,
} from '../redux/slices/SignupSlice';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../constants/Colors';

const SignupScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    phoneNumber,
    emailID,
    password,
    confirmPassword,
    userType,
    errors,
    loading,
  } = useSelector(state => state.signup);

  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async () => {
    // Start validation
    setIsValidating(true);
    dispatch(validateFields());
  };

  useEffect(() => {
    if (isValidating && Object.keys(errors).length === 0) {
      const signup = async () => {
        const result = await dispatch(
          signupUser({
            firstName,
            lastName,
            phoneNumber,
            emailID,
            password,
            confirmPassword,
            userType,
          }),
        );
        if (signupUser.fulfilled.match(result)) {
          navigation.navigate('LoginScreen'); // Navigate to login screen after successful signup
        }
      };
      console.log("first",)
      signup();
    }
    setIsValidating(false);
  }, [errors]);

  const loginTypeData = [
    {label: 'startup', value: 'startup'},
    {label: 'consultant', value: 'consultant'},
    {label: 'mentor', value: 'mentor'},
  ];

  return (
    <View style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CustomDropdown
          label="Login Type"
          data={loginTypeData}
          placeholder="Select Login Type"
          placeholderStyle={Colors.black}
          onValueChange={
            values => {
              let value = values.value;
              dispatch(updateField({field: 'userType', value}));
            } // <-- Update field
          }
          error={errors.userType}
        />
        <CustomTextInput
          placeholder="(e.g)sathish"
          label="First Name"
          value={firstName}
          onChangeText={value =>
            dispatch(updateField({field: 'firstName', value}))
          }
          error={errors.firstName}
        />
        <CustomTextInput
          placeholder="(e.g)kumar"
          label="Last Name"
          value={lastName}
          onChangeText={value =>
            dispatch(updateField({field: 'lastName', value}))
          }
          error={errors.lastName}
        />
        <CustomTextInput
          placeholder="(e.g)8525825116"
          label="Phone Number"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={value =>
            dispatch(updateField({field: 'phoneNumber', value}))
          }
          error={errors.phoneNumber}
        />
        <CustomTextInput
          placeholder="(e.g)sathish@gmail.com"
          label="Email"
          value={emailID}
          onChangeText={value =>
            dispatch(updateField({field: 'emailID', value}))
          }
          error={errors.emailID}
        />
        <CustomTextInput
          placeholder="(e.g)*"
          label="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={value =>
            dispatch(updateField({field: 'password', value}))
          }
          error={errors.password}
        />
        <CustomTextInput
          placeholder="(e.g)*"
          label="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={value =>
            dispatch(updateField({field: 'confirmPassword', value}))
          }
          error={errors.confirmPassword}
        />
      </ScrollView>
      <CustomButton
        title="Submit"
        onPress={handleSubmit}
        style={styles.customButton}
      />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 80, // To prevent overlapping with the button
  },
  customButton: {
    position: 'absolute',
    bottom: 20, // Add some space from the bottom edge
    left: 20,
    right: 20,
  },
});