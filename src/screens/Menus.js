import {ScrollView, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import ClickableItem from '../components/ClickableItem';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/slices/LoginSlice';
import Colors from '../constants/Colors';
import {deleteData} from '../apiservice/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {accountDelete} from '../constants/ApiEndPoints';

const Menus = ({navigation}) => {
  const [isVolunteerDropdownOpen, setIsVolunteerDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const handlePress = item => {
    navigation.navigate(item);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('LoginScreen');
  };

  const handleAccountDelete = async () => {
    try {
      const id = await AsyncStorage.getItem('_id');

      const res = await deleteData(`${accountDelete}${id}`);
      console.log('res', res);
      // Show success alert
      Alert.alert(
        'Success',
        'Your account has been successfully deleted.',
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch(logout());
              navigation.navigate('LoginScreen');
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  // Toggles the visibility of the dropdown menu for "Volunteer"
  const toggleVolunteerDropdown = () => {
    setIsVolunteerDropdownOpen(!isVolunteerDropdownOpen);
  };

  return (
    <ScrollView style={styles.container}>
      <ClickableItem
        title="Profile"
        onPress={() => handlePress('Profile')}
        imageSource={require('../assets/images/m_profile.png')}
      />

      <ClickableItem
        onPress={toggleVolunteerDropdown}
        title="Volunteer"
        imageSource={require('../assets/images/volunteer.png')}
      />

      {/* Child Fields for Volunteer */}
      {isVolunteerDropdownOpen && (
        <View style={styles.dropdown}>
          <ClickableItem
            title="Become a Mentor"
            onPress={() => handlePress('BecomeMentor')}
            imageSource={require('../assets/images/m_mentor.png')}
          />
          <ClickableItem
            title="Volunteer Opportunities"
            onPress={() => handlePress('VolunteerOpportunities')}
            imageSource={require('../assets/images/opportunities.png')}
          />
          <ClickableItem
            title="Training & Onboard"
            onPress={() => handlePress('TrainingOnboard')}
            imageSource={require('../assets/images/m_onboard.png')}
          />
        </View>
      )}

      <ClickableItem
        title="Wallet"
        onPress={() => handlePress('Wallet')}
        imageSource={require('../assets/images/m_wallet.png')}
      />

      <ClickableItem
        title="Invite"
        onPress={() => handlePress('Invite')}
        imageSource={require('../assets/images/m_invite.png')}
      />

      <ClickableItem
        title="Terms and Condition"
        onPress={() => handlePress('TermsAndCondition')}
        imageSource={require('../assets/images/m_tandc.png')}
      />

      <ClickableItem
        title="About us"
        onPress={() => handlePress('AboutUs')}
        imageSource={require('../assets/images/m_aboutus.png')}
      />

      <ClickableItem
        title="Contact us"
        onPress={() => handlePress('ContactUs')}
        imageSource={require('../assets/images/m_contactus.png')}
      />

      <ClickableItem
        title="Delete Account"
        onPress={handleAccountDelete}
        imageSource={require('../assets/images/Account_deletion.png')}
      />
      <ClickableItem
        title="Logout"
        onPress={handleLogout}
        imageSource={require('../assets/images/m_logout.png')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.ghostwhite,
  },
  volunteerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', // Ensure it spans the full width
  },
  dropdown: {
    paddingLeft: 20, // Add padding to visually indent child fields
    backgroundColor: Colors.ghostwhite,
  },
});

export default Menus;
