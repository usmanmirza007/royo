import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {getWidthPercentage, getHeightPercentage} from '../utils/Dimention';
import globalStyles from '../styles/GlobalStyles';
import Colors from '../constants/Colors';


const OthersBox = ({data, onPress}) => {
  const renderData = ({item}) => (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <Image
        source={item.imageUrl}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={[styles.title, globalStyles.text]}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderData}
      keyExtractor={item => item.id}
      numColumns={2} // Display two items per row
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: getWidthPercentage(30),
    height: getHeightPercentage(15),
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    padding: 5,
  },
  image: {
    width: '100%',
    height: '50%',
    borderRadius: 10,
  },
  title: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 10,
  },
  flatListContainer: {
    alignItems: 'center',
  },
});

export default OthersBox;
