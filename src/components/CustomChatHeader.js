import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import {
  getHeightPercentage,
  getResponsiveFontSize,
  getResponsivePadding,
} from '../utils/Dimention';
import {typography} from '../styles/TypoGraphy';
import {
  generateToken,
  makeCall,
  TokenValidate,
} from '../apiservice/TwilioService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomChatHeader = ({navigation, userName, userImage, userId}) => {
  // Handle the call initiation when the call icon is pressed
  const handleMakeCall = async () => {
    try {
      const identity = await AsyncStorage.getItem('_id');
      const to = userId; // The identity or number you're calling
      const from = identity; // The identity of the user making the call
      const token = await generateToken(identity);
      const validation = await TokenValidate(token);
      const tokenToUse = validation.newToken || token;
      if (validation.valid == true || validation.newToken) {
        const activeCall = await makeCall(to, from, tokenToUse); // Make the call
        navigation.navigate('CallScreen', {to, from, activeCall}); // Navigate to CallScreen
      }
    } catch (error) {
      console.error('Error making call34:', error);
    }
  };

  return (
    <View style={[styles.headerContainer, {backgroundColor: Colors.primary}]}>
      {/* Back button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={Colors.white} />
      </TouchableOpacity>

      {/* User Image and Name */}
      <TouchableOpacity
        style={[styles.userInfo]}
        onPress={() => navigation.navigate('ChatProfile', {userId: userId})}>
        <Image source={userImage} style={styles.userImage} />
        <View style={styles.userDetails}>
          <Text style={[typography.heading5, {color: Colors.white}]}>
            {userName}
          </Text>
          <Text
            style={[
              typography.body,
              {fontSize: getResponsiveFontSize(12), color: Colors.white},
            ]}>
            Active now
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.usercall}>
        {/* Call Icon */}
        <TouchableOpacity onPress={handleMakeCall} style={{marginRight: 15}}>
          <Ionicons name="call" size={24} color={Colors.white} />
        </TouchableOpacity>

        {/* Video Call Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('VideoCall')}>
          <Ionicons name="videocam" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#000',
    height: getHeightPercentage(8),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: Colors.white,
  },
  userDetails: {
    justifyContent: 'center',
  },

  userStatus: {
    fontSize: 12,
    color: '#4CAF50', // Green color for "Active now"
  },
  usercall: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: getResponsivePadding(10),
  },
});

export default CustomChatHeader;
