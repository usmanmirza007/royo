import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../constants/Colors';
import {typography} from '../styles/TypoGraphy';
import { Fonts } from '../constants/Fonts';

const CustomDropdown = ({
  label,
  data,
  placeholder = 'Select item',
  onValueChange,
  icon = 'Safety', // Default icon name
  searchPlaceholder = 'Search...',
  maxHeight = 300,
  style,
  labelStyle,
  dropdownStyle,
  placeholderStyle,
  selectedTextStyle,
  iconStyle,
  inputSearchStyle,
  error,
  value,
  search = false,
}) => {
  const [values, setValues] = useState(value);
  const [isFocus, setIsFocus] = useState(false);
  const [searchText, setSearchText] = useState(''); // State for search text
  const [filteredData, setFilteredData] = useState(data); // State for filtered data

  useEffect(() => {
    // Filter data based on search text

    if (searchText) {
      const filtered = data.filter(item => {
        const label = item.label || ''; // Safeguard against undefined labels
        return label.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Reset to original data if search text is empty
    }
  }, [searchText, data]);

  return (
    <View style={{marginTop: 20}}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <Dropdown
        style={[styles.dropdown, dropdownStyle, style]}
        placeholderStyle={[styles.placeholderStyle, placeholderStyle]}
        selectedTextStyle={[styles.selectedTextStyle, selectedTextStyle]}
        inputSearchStyle={[styles.inputSearchStyle, inputSearchStyle]}
        iconStyle={[styles.iconStyle, iconStyle]}
        itemTextStyle={{fontFamily: 'Philosopher-Bold'}}
        data={filteredData}
        search={search}
        maxHeight={maxHeight}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        value={values}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValues(item.value);
          setIsFocus(false);
          onValueChange(item);
        }}
        onSearch={text => setSearchText(text)}
        renderLeftIcon={() => (
          <Icon
            style={[styles.icon, iconStyle]}
            color={isFocus ? Colors.green : Colors.primary}
            name={icon}
            size={20}
          />
        )}
      />
      {error && (
        <Text style={[typography.body, {color: Colors.danger}]}>{error}</Text>
      )}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: Colors.black,
  },
  dropdown: {
    height: 40,
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: Colors.white,
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: Fonts.SemiBold,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: Fonts.SemiBold,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 38,
    fontSize: 16,
    color: Colors.black,
    borderColor: Colors.black,
    borderRadius: 10,
    fontFamily: Fonts.SemiBold,
  
  },
});