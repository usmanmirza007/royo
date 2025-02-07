import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import globalStyles from '../styles/GlobalStyles';
import {typography} from '../styles/TypoGraphy';
import Colors from '../constants/Colors';
import {getHeightPercentage, getWidthPercentage} from '../utils/Dimention';
import {fetchData} from '../apiservice/ApiService';
import {getByUserList} from '../constants/ApiEndPoints';

const defaultImage = require('../assets/images/profile.png');

const ChatProfile = ({route}) => {
  const [expanded, setExpanded] = useState(false);
  const [datalist, setDataList] = useState([]);

  const toggleExpanded = index => {
    setExpanded(expanded === index ? null : index);
  };

  const Userid = route.params.userId;

  const fetchById = async () => {
    try {
      const response = await fetchData(`${getByUserList}${Userid}`);
      console.log('response', response);
      await setDataList(response);
      console.log('datalist', datalist);
    } catch {
      console.log('error');
    }
  };

  useEffect(() => {
    fetchById();
  }, []);

  return (
    <View style={globalStyles.container}>
      <View style={styles.profileSection}>
        <Image
          source={datalist.image ? {uri: datalist.image} : defaultImage}
          style={styles.userImage}
        />

        <View style={styles.profileInfo}>
          <Text style={typography.heading4}>{datalist.firstName}</Text>
          <Text style={typography.smallbody}>{datalist.languages}</Text>
          <Text style={typography.smallbody}>
            {datalist.yearofexperience} Years of Experience
          </Text>

          <View style={{flexDirection: 'row', right: 5}}>
            <Image
              source={require('../assets/images/Rupees.png')}
              style={styles.imageprfo}
            />
            <Text style={typography.smallbody}>{datalist.offerprice}</Text>
            <Text
              style={[
                typography.smallbody,
                {textDecorationLine: 'line-through', left: 20},
              ]}>
              {datalist.price}/min
            </Text>
          </View>

          <View style={{flexDirection: 'row', bottom: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/images/Chat.png')}
                style={styles.imageprfo}
              />
              <Text style={typography.smallbody}>
                {datalist.offerprice}/mins
              </Text>
            </View>
            <View style={{flexDirection: 'row', left: 5}}>
              <Image
                source={require('../assets/images/Call.png')}
                style={styles.imageprfo}
              />
              <Text style={typography.smallbody}>
                {datalist.ordercount}/mins
              </Text>
            </View>
          </View>

          <View style={styles.followRow}>
            <TouchableOpacity style={styles.followButton}>
              <Text
                style={[
                  typography.smallbody,
                  {color: Colors.white, textAlign: 'center'},
                ]}>
                Follow
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.aboutSection}>
        <Text style={typography.heading6}>About Me</Text>
        <Text style={styles.bodyText} numberOfLines={expanded ? undefined : 3}>
          {datalist.aboutyouself}
        </Text>

        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={[typography.smallbody, {color: '#ff6f00'}]}>
            {expanded ? 'Show Less' : 'Read More'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageprfo: {
    width: getWidthPercentage(5),
    height: getHeightPercentage(5),
    resizeMode: 'contain',
    bottom: 10,
  },
  bodyText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  userImage: {
    width: getWidthPercentage(35),
    height: getHeightPercentage(16),
    borderRadius: 25,
    marginRight: 15,
  },
  profileSection: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  profileInfo: {
    marginLeft: 20,
  },
  followRow: {
    bottom: 30,
  },
  followButton: {
    backgroundColor: '#ff6f00',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  aboutSection: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

export default ChatProfile;