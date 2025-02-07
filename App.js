import React, {useEffect, useState} from 'react';
import {Alert, PermissionsAndroid} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigation from './src/navigation/AppNavigation';
import store from './src/redux/store';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {Voice} from '@twilio/voice-react-native-sdk';
import {
  generateToken,
  initializeTwilio,
  handleIncomingCall,
  TokenValidate,
} from './src/apiservice/TwilioService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const voice = new Voice();
  const [incomingCallInvite, setIncomingCallInvite] = useState(null);
  console.log('render_test_app');

  /**
   * Fetches the identity from AsyncStorage and generates a token for Twilio.
   */
  const fetchIdentityAndToken = async () => {
    try {
      const identity = await AsyncStorage.getItem('_id');
      if (!identity) throw new Error('Identity not found in AsyncStorage');
      return identity;
    } catch (error) {
      console.error('Failed to fetch identity:', error);
      throw error;
    }
  };

  /**
   * Initializes Twilio Voice SDK and registers the device for incoming calls.
   */
  const initializeTwilioVoice = async () => {
    console.log('render_test');
    try {
      const identity = await fetchIdentityAndToken();
      const token = await generateToken(identity); // Fetch the token using the generateToken function from TwilioService
      console.log('token_app.js', token);
      const validation = await TokenValidate(token);
      console.log(
        'newtoken_app.js',
        validation.newToken,
        'validationa-app.js',
        validation,
      );
      const tokenToUse = validation.newToken || token;
      console.log('tokenToUse_app.js:', tokenToUse);
      if (validation.valid == true || validation.newToken) {
        const res = await initializeTwilio(tokenToUse); // Initialize Twilio using the function from TwilioService
        console.log('res', res);
      }
      // Handle incoming calls using the callback
      await handleIncomingCall(callInvite => {
        try {
          console.log('callInvite', callInvite);
          setIncomingCallInvite(callInvite); // Update the state with incoming call invite
          Alert.alert(
            'Incoming Call',
            `Call from: ${callInvite.from}`,
            [
              {
                text: 'Ignore',
                onPress: () => callInvite.reject(),
                style: 'cancel',
              },
              {
                text: 'Accept',
                onPress: () => callInvite.accept(), // Accept the incoming call
              },
            ],
            {cancelable: false},
          );
        } catch (error) {
          console.log('error', error);
        }
      });
    } catch (error) {
      console.error('Failed to initialize Twilio Voice SDK:', error);
    }
  };

  /**
   * Requests user permission for notifications and fetches FCM token.
   */
  const requestNotificationPermissions = async () => {
    console.log('render_test1');

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'This app needs access to your microphone to make calls.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Microphone permission granted');
      } else {
        console.log('Microphone permission denied');
      }
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }

      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } catch (error) {
      console.error('Permission request failed:', error);
    }
  };

  /**
   * Fetches the FCM token for push notifications.
   */
  const fetchFCMToken = async () => {
    console.log('render_test2');
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        // Send this token to your backend if necessary
      }
    } catch (error) {
      console.error('Error fetching FCM token:', error);
    }
  };

  /**
   * Displays a notification when a message is received.
   */
  const displayNotification = async remoteMessage => {
    try {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      console.log('remoteMessage', remoteMessage);
      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'Notification',
        body: remoteMessage.notification?.title || 'You have a new message',
        android: {
          channelId,
        },
        pressAction: {
          id: 'default',
        },
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  };

  /**
   * Sets up Firebase messaging handlers.
   */
  const setupFirebaseMessaging = () => {
    console.log('render_test3');

    messaging().onMessage(async remoteMessage => {
      console.log('Foreground message received:', remoteMessage);
      await displayNotification(remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification opened from background:', remoteMessage);
      Alert.alert('Notification opened', remoteMessage.notification?.title);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'App opened from quit state by notification:',
            remoteMessage,
          );
          Alert.alert(
            'App opened by notification',
            remoteMessage.notification?.title,
          );
        }
      });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  };

  /**
   * useEffect for Twilio Voice registration and setting log level
   */
  useEffect(() => {
    initializeTwilioVoice(); // Initialize Twilio Voice during component mount
  }, []);

  /**
   * useEffect for handling notification permissions and Firebase messaging setup
   */
  useEffect(() => {
    requestNotificationPermissions();
    fetchFCMToken();
    setupFirebaseMessaging();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
