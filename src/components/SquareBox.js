import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { getWidthPercentage, getHeightPercentage, getResponsiveFontSize } from '../utils/Dimention';

import Colors from '../constants/Colors';
import { typography } from '../styles/TypoGraphy';
import { Fonts } from '../constants/Fonts';

const SquareBox = ({ data, onPress }) => {
  const renderData = ({ item }) => (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <Image source={item.imageUrl} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderData}
      numColumns={2}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: getWidthPercentage(40),
    height: getHeightPercentage(14),
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    padding: 5,
    marginTop: 15,
  },
  image: {
    width: '60%',
    height: '50%',
    borderRadius: 10,
    marginBottom: 5
  },
  title: {
    textAlign: 'center',
    bottom: 2,
    // fontSize:getResponsiveFontSize(18),
    ...typography.smallbody,
    fontFamily: Fonts.Bold
  },
  flatListContainer: {
    alignItems: 'center',
    gap: 5,
  },
});

export default SquareBox;