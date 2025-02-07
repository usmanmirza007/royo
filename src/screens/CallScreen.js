import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {endCall} from '../apiservice/TwilioService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';
import {Fonts} from '../constants/Fonts';
import {typography} from '../styles/TypoGraphy';

const CallScreen = ({route}) => {
  const {to, from, activeCall} = route.params;
  const [callStatus, setCallStatus] = useState('Calling...');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    let interval;

    if (activeCall) {
      activeCall.on('connected', () => {
        console.log('callconnect_testing');
        setCallStatus('Call connected');
        interval = setInterval(() => {
          setCallDuration(prev => prev + 1);
        }, 1000);
      });

      activeCall.on('disconnected', () => {
        console.log('calldisconnect_testing');
        setCallStatus('Call disconnected');
        if (interval) clearInterval(interval);
      });

      return () => {
        if (interval) clearInterval(interval);
        activeCall.off('connected', () => {});
        activeCall.off('disconnected', () => {});
      };
    }
  }, [activeCall]);

  const formatDuration = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleEndCall = async () => {
    try {
      if (activeCall) {
        activeCall.off('connected', () => {});
        activeCall.off('disconnected', () => {});
        await endCall(activeCall);
      }
      setCallStatus('Call ended');
      navigation.goBack();
    } catch (error) {
      console.error('Error ending call:', error);
    }
  };

  const toggleMute = () => {
    if (activeCall) {
      activeCall.mute(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const toggleSpeaker = () => {
    if (activeCall) {
      activeCall.setSpeaker(!isSpeakerOn); // Hypothetical API
      setIsSpeakerOn(!isSpeakerOn);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: Colors.primary}}>
        <View style={styles.topBar}>
          <TouchableOpacity>
            <Icon name="person-add" size={30} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.contactContainer}>
          <Text style={[styles.contactName, {color: Colors.white}]}>
            {to || 'Unknown'}
          </Text>
          <Text style={[styles.callTimer, {color: Colors.white}]}>
            {formatDuration(callDuration)}
          </Text>
        </View>
      </View>

      <View style={styles.avatarPlaceholder}>
        <Icon name="person" size={350} color="#9e9e9e" />
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={toggleMute}>
          <Icon name={isMuted ? 'mic-off' : 'mic'} size={30} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
          <Icon name="call-end" size={30} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={toggleSpeaker}>
          <Icon
            name={isSpeakerOn ? 'volume-up' : 'volume-off'}
            size={30}
            color="#ffffff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 40,
    alignItems: 'center',
  },
  contactContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  contactName: {
    color: Colors.white,
    fontFamily: Fonts.Medium,
    ...typography.heading2,
  },
  callTimer: {
    color: Colors.white,
    fontFamily: Fonts.Regular,
    ...typography.heading5,
  },
  avatarPlaceholder: {
    alignItems: 'center',
    backgroundColor: 'gray',
    paddingVertical: 40,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 35,
    backgroundColor: Colors.primary,
  },
  controlButton: {
    backgroundColor: '#128C7E',
    padding: 15,
    borderRadius: 50,
  },
  endCallButton: {
    backgroundColor: Colors.red,
    padding: 15,
    borderRadius: 50,
  },
});

export default CallScreen;
