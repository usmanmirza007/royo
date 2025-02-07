import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import globalStyles from '../styles/GlobalStyles';
import Colors from '../constants/Colors';
import {getHeightPercentage, getWidthPercentage} from '../utils/Dimention';

const ClickableItem = ({
  title,
  onPress,
  imageSource,
  textStyle,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.itemContainer, containerStyle]}>
      <View style={styles.contentContainer}>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
        <Text style={[globalStyles.text, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ClickableItem;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 8,
    // borderBottomWidth: 0.5,
    borderBottomColor: Colors.secondary,
    marginTop: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: getWidthPercentage(7),
    height: getHeightPercentage(5.5),
    marginRight: 20,
  },
});