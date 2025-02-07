import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Uncommented for icon support
import Colors from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

const CustomButton = ({
  title,
  onPress,
  disabled = false, // Disabled prop
  color = Colors.primary,
  style,
  textStyle,
  iconName,
  iconColor = Colors.black,
  iconSize = 20,
}) => {
  return (
    <TouchableOpacity
      onPress={!disabled ? onPress : null} // Prevent action if disabled
      activeOpacity={disabled ? 1 : 0.7} // No opacity effect if disabled
      style={[
        styles.button,
        {backgroundColor: disabled ? Colors.gray : color}, // Gray out if disabled
        style,
      ]}
      disabled={disabled} // Ensures disabled behavior is native to TouchableOpacity
    >
      <View style={styles.content}>
        <Text
          style={[
            styles.buttonText,
            textStyle,
            {color: disabled ? Colors.lightGray : Colors.white}, // Change text color if disabled
          ]}>
          {title}
        </Text>
        {iconName && (
          <Icon
            name={iconName}
            size={iconSize}
            color={disabled ? Colors.lightGray : iconColor} // Gray out icon if disabled
            style={styles.icon}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily:Fonts.Bold
  },
  icon: {
    marginLeft: 10, // Adjust icon spacing
  },
});

export default CustomButton;