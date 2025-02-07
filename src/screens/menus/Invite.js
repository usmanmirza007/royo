import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';
import globalStyles from '../../styles/GlobalStyles';
import {typography} from '../../styles/TypoGraphy';
import Colors from '../../constants/Colors';
import CustomButton from '../../components/CustomButton';

const Invite = () => {
  const [copiedText, setCopiedText] = useState('ABC123');

  const handleCopyCode = async () => {
    await Clipboard.setString(copiedText);
    console.log('Coupon code copied!');
    // Optionally, you can verify the copied text
    const text = await Clipboard.getString();
    if (text === copiedText) {
      console.log('Verification success: Copied text matches!');
    } else {
      console.log('Verification failed: Copied text does not match.');
    }
  };

  const handleShareCode = async () => {
    const shareOptions = {
      title: 'Share Coupon Code',
      message: `Here is a coupon code for you: ${copiedText}`,
      url: '', // Optional, if you have any URL to share
    };
    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <View style={[globalStyles.container]}>
      <Text style={[typography.heading2, {color: Colors.danger}]}>
        Refer Your friend and get more 250 bonus points
      </Text>
      <View style={styles.couponContainer}>
        <Text style={styles.couponCode}>{copiedText}</Text>
        <TouchableOpacity onPress={handleCopyCode} style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy</Text>
        </TouchableOpacity>
      </View>
      <CustomButton
        title="Invite friends"
        onPress={handleShareCode}
        style={styles.customButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  customButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: Colors.white,
    padding: 10,
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
  },
  couponCode: {
    flex: 1,
    fontSize: 18,
    color: Colors.black,
  },
  copyButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  copyButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default Invite;