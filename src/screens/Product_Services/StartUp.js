import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TextInput } from 'react-native';
import UserItem from '../../components/UserItem';
import globalStyles from '../../styles/GlobalStyles';
import { getAllUserType } from '../../constants/ApiEndPoints';
import { fetchData } from '../../apiservice/ApiService';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../../components/CustomTextInput';

const StartUp = ({ navigation, route }) => {
  const userTypes = route.params.type;

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title:
        userTypes.charAt(0).toUpperCase() + userTypes.slice(1).toLowerCase(),
    });

    const fetchDataFromAPI = async () => {
      try {
        const result = await fetchData(getAllUserType, {
          userType: userTypes,
        });
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Call the async function
    fetchDataFromAPI();
  }, [userTypes]);

  const handleUserPress = async user => {
    const auth = await AsyncStorage.getItem('auth');
    if (auth == 'denied') {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('Chat', {
        userId: user._id,
        userName: user.firstName,
        userImage: user.image,
      });
    }
  };

  const { userType } = useSelector(state => state.login);

  const handleSearch = text => {
    setSearchQuery(text);
    const filtered = data.filter(
      item =>
        item.firstName.toLowerCase().includes(text.toLowerCase()) ||
        (item.languages && item.languages.some(language =>
          language.toLowerCase().includes(text.toLowerCase())
        )),
    );
    setFilteredData(filtered);
  };

  return (
    <View style={globalStyles.container}>
      <CustomTextInput
        placeholder="Search by name or language"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <UserItem
            user={item}
            onPress={handleUserPress}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default StartUp;
