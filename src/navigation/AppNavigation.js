import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import IndroScreen from '../screens/IndroScreen';
import StackNavigation from './consultant/stackNavigation/ConsultantNavigation';
import ConsultantNavigation from './consultant/stackNavigation/ConsultantNavigation';
import MentorNavigation from './mentor/stackNavigation/MentorNavigation';
import StartUpNavigation from './startup/stackNavigation/StartUpNavigation';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState(null); // Local state for userType
  useEffect(() => {
    const checkUserType = async () => {
      const storedUserType = await AsyncStorage.getItem('userType'); // Retrieve user type from AsyncStorage
      setUserType(storedUserType || null); // Set the user type in state
      setIsLoading(false); // Stop loading after retrieving user type
    };

    checkUserType();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {!userType ? ( */}
        {/* <> */}
        <Stack.Screen
          name="IndroScreen"
          component={IndroScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.white,
          }}
        />
        {/* </> */}
        {/* ) : ( */}
        {/* <> */}
        {/* Conditional Navigation Based on User Type */}
        {userType === 'consultant' && (
          <Stack.Screen
            name="Dashboard"
            component={ConsultantNavigation}
            options={{headerShown: false}}
          />
        )}
        {userType === 'mentor' && (
          <Stack.Screen
            name="DashboardMentor"
            component={MentorNavigation}
            options={{headerShown: false}}
          />
        )}
        {userType === 'startup' && (
          <Stack.Screen
            name="DashboardStartup"
            component={StartUpNavigation}
            options={{headerShown: false}}
          />
        )}
        {/* </> */}
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
