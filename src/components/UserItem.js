import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
  FlatList,
} from 'react-native';
import {typography} from '../styles/TypoGraphy';
import Colors from '../constants/Colors';
const defaultImage = require('../assets/images/profile.png');

const UserItemList = ({user, onPress, navigation}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => onPress(user)} style={styles.userItem}>
        <Image
          source={user.image ? {uri: user.image} : defaultImage}
          style={styles.userImage}
          onError={({nativeEvent: {error}}) => {
            console.log('Error loading image: ', error);
          }}
        />
        <View style={styles.itemContainer}>
          <Text style={styles.userName}>{user.firstName}</Text>
          {/* <Text style={styles.userType}>{user.userType}</Text> */}
          <Text style={styles.userType}>
            Experience : {user.yearofexperience}
          </Text>
          <Text style={styles.languages}>
            {Array.isArray(user.languages)
              ? user.languages.join(', ')
              : user.languages}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ChatProfile', {userId: user._id})
            }>
            <Text style={styles.viewProfile}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  userItem: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginRight: 15,
  },
  itemContainer: {
    marginBottom: 2,
  },
  userName: {
    ...typography.heading7,
    fontSize: 14,
    marginBottom: 5,
  },
  userType: {
    ...typography.body,
    fontSize: 13,
    marginBottom: 2,
  },
  languages: {
    ...typography.body,
    fontSize: 13,
    marginBottom: 5,
  },
  viewProfile: {
    ...typography.smallbody,
    color: Colors.primary,
    top: 5,
  },
});

export default UserItemList;