import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import UserItem from '../../components/UserItem';
import globalStyles from '../../styles/GlobalStyles';
import {fetchData} from '../../apiservice/ApiService';
import {getAllUserType} from '../../constants/ApiEndPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Mentor = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const result = await fetchData(getAllUserType, {
          userType: 'mentor',
        });
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Call the async function
    fetchDataFromAPI();
  }, []);

  const handleUserPress = async user => {
    const auth = await AsyncStorage.getItem('auth');
    if (auth == 'denied') {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('Chat', {userId: user._id});
    }
  };

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <UserItem user={item} onPress={handleUserPress} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Mentor;