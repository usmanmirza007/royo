import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  getHeightPercentage,
  getResponsiveFontSize,
  getResponsivePadding,
} from '../utils/Dimention';
import {typography} from '../styles/TypoGraphy';
import {Fonts} from '../constants/Fonts';

const CustomTextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  style,
  labelStyle,
  inputStyle,
  placeholderStyle,
  error,
  imageSource, // New prop for image
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={styles.inputContainer}>
        {imageSource && (
          <Image
            source={imageSource}
            style={styles.image} // Image style
          />
        )}
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={Colors.black}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPasswordVisible}
          keyboardType={keyboardType}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={togglePasswordVisibility}>
            <Icon
              name={isPasswordVisible ? 'visibility-off' : 'visibility'}
              size={24}
              color={Colors.black}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={[typography.body, {color: Colors.danger}]}>{error}</Text>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    // marginBottom: 15,
  },
  label: {
    fontSize: getResponsiveFontSize(16),
    color: Colors.black,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Colors.white,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: getResponsivePadding(10),
    height: getHeightPercentage(5),
    fontSize: getResponsiveFontSize(16),
    color: Colors.black,
    fontFamily: Fonts.Regular,
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  image: {
    width: getHeightPercentage(3),
    height: getHeightPercentage(3),
    marginRight: 10, // Adjust margin as needed
  },
});