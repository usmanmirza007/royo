import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../constants/Colors';
import {typography} from '../styles/TypoGraphy';
import {getResponsiveFontSize} from '../utils/Dimention';
import {Fonts} from '../constants/Fonts';

const CustomMultiDropdown = ({
  label,
  data,
  placeholder = 'Select items',
  onValueChange,
  icon = 'Safety', // Default icon name
  maxHeight = 300,
  style,
  labelStyle,
  dropdownStyle,
  placeholderStyle,
  selectedTextStyle,
  iconStyle,
  error,
  selectedValues,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const toggleItem = itemValue => {
    const newSelectedValues = selectedValues.includes(itemValue)
      ? selectedValues.filter(value => value !== itemValue)
      : [...selectedValues, itemValue];

    onValueChange(newSelectedValues);
  };

  // Filter data based on search text
  const filteredData = data.filter(item =>
    item.label.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={{marginTop: 20}}>
      {label && <Text style={[typography.heading5, labelStyle]}>{label}</Text>}
      <TouchableOpacity
        style={[styles.dropdown, dropdownStyle, style]}
        onPress={() => setIsOpen(!isOpen)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}>
        <Text style={[styles.placeholderStyle, placeholderStyle]}>
          {selectedValues.length > 0 ? selectedValues.join(', ') : placeholder}
        </Text>
        <Icon
          style={[styles.icon, iconStyle]}
          color={isFocus ? Colors.green : Colors.primary}
          name={icon}
          size={20}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={[styles.dropdownList, {maxHeight}]}>
          <TextInput
            style={styles.searchInput}
            placeholderTextColor={Colors.black}
            placeholder="Search..."
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
          <ScrollView>
            {filteredData.map(item => (
              <TouchableOpacity
                key={item.value}
                style={styles.itemContainer}
                onPress={() => toggleItem(item.value)}>
                <Text style={styles.itemText}>{item.label}</Text>
                {selectedValues.includes(item.value) && (
                  <Icon name="check" size={20} color={Colors.green} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {error && (
        <Text style={[typography.body, {color: Colors.danger}]}>{error}</Text>
      )}
    </View>
  );
};

export default CustomMultiDropdown;

const styles = StyleSheet.create({
  label: {
    fontSize: getResponsiveFontSize(16),
    color: Colors.black,
    fontFamily: Fonts.Bold,
    marginBottom: 10,
  },
  dropdown: {
    height: 40,
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: Fonts.SemiBold,
  },
  dropdownList: {
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 50,
    zIndex: 10,
    width: '100%',
  },
  itemContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: getResponsiveFontSize(16),
    color: Colors.black,
    fontFamily: Fonts.Regular,
  },
  searchInput: {
    padding: 10,
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
  },
});