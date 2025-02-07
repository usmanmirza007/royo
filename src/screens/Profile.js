import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import StartUpSignUp from './SignUp/StartUpSignUp';
import MentorSignUp from './SignUp/MentorSignUp';
import ConsultantSignUp from './SignUp/ConsultantSignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [userType, setUserType] = useState(null);

  // Fetch the userType from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const type = await AsyncStorage.getItem('userType');
        setUserType(type); // Update the state with the fetched userType
      } catch (error) {
        console.error('Failed to fetch userType from AsyncStorage', error);
      }
    };

    fetchUserType();
  }, []); // Empty dependency array to run only on component mount

  // Render the appropriate component based on user type
  let ProfileComponent;
  if (userType === 'startup') {
    ProfileComponent = <StartUpSignUp />;
  } else if (userType === 'consultant') {
    ProfileComponent = <ConsultantSignUp />;
  } else if (userType === 'mentor') {
    ProfileComponent = <MentorSignUp />;
  } else {
    ProfileComponent = <Text>Loading...</Text>;
  }

  return <View>{ProfileComponent}</View>;
};

export default Profile;