import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import globalStyles from '../styles/GlobalStyles';
import CustomButton from '../components/CustomButton';
import {getHeightPercentage, getWidthPercentage} from '../utils/Dimention';
import Colors from '../constants/Colors';
import CustomTextInput from '../components/CustomTextInput';
import {useDispatch, useSelector} from 'react-redux';
import {
  loginUser,
  updateField,
  validateFields,
} from '../redux/slices/LoginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {email, password, errors, loading, success} = useSelector(
    state => state.login,
  );
  const [isValidating, setIsValidating] = useState(false);

  const handleLogin = async () => {
    setIsValidating(true);
    if (Object.keys(errors).length === 0) {
      // Dispatch the login action only if there are no validation errors
      dispatch(loginUser({email, password}));
    }
  };
  // console.log('errors', errors)
  // useEffect to monitor changes in errors and trigger login if validation passes
  useEffect(() => {
    if (success) {
      if (isValidating && Object.keys(errors).length === 0) {
        const login = async () => {
          try {
            const result = await dispatch(loginUser({email, password}));
            console.log('Login result:', result);

            if (loginUser.fulfilled.match(result)) {
              const res = result.payload;
              const userType = res.data.data.userType;
              const auth = res.data.data.auth;
              const userId = res.data.data._id;

              // Store userType, auth, and userId in AsyncStorage
              await AsyncStorage.multiSet([
                ['userType', userType],
                ['auth', auth],
                ['_id', userId],
              ]);

              // Define a mapping for userType to dashboard
              const routeMap = {
                consultant: 'Dashboard',
                mentor: 'DashboardMentor',
                startup: 'DashboardStartup',
              };
              const routeName = routeMap[userType] || 'LoginScreen';

              // Navigate to the corresponding dashboard and reset navigation stack
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: routeName, params: {screen: 'BottomDash'}}],
                }),
              );
            }
          } catch (error) {
            console.error('Login error:', error);
          } finally {
            setIsValidating(false);
          }
        };

        login();
      }
    }
  }, [success]);

  return (
    <View
      style={[
        globalStyles.container,
        {justifyContent: 'space-evenly', alignItems: 'center'},
      ]}>
      <View>
        <Image
          source={require('../assets/images/Cultivate_logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.customInputStyle}>
        <CustomTextInput
          placeholder="you@example.com"
          label="Email"
          value={email}
          onChangeText={value => dispatch(updateField({field: 'email', value}))}
          error={errors.email}
        />
        <CustomTextInput
          placeholder="Enter your password"
          label="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={value =>
            dispatch(updateField({field: 'password', value}))
          }
          error={errors.password}
        />
        <CustomButton
          title={loading ? 'Loading...' : 'Submit'}
          onPress={handleLogin}
          style={styles.customButton}
          disabled={loading}
        />
        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
          <Text
            style={[
              globalStyles.text,
              {color: Colors.link, marginTop: 5, textAlign: 'center'},
            ]}>
            If you don't have an account, Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 40,
  },
  customInputStyle: {
    width: getWidthPercentage(90),
    height: getHeightPercentage(40),
  },
  customButton: {
    marginTop: 40,
  },
  logo: {
    width: getWidthPercentage(90),
    height: getHeightPercentage(20),
  },
});
