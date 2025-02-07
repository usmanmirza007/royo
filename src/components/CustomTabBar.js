import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import {getResponsiveFontSize} from '../utils/Dimention';
import {Fonts} from '../constants/Fonts';

const ICON_NAMES = {
  Bottom: 'home',
  Menus: 'menu',
};

const CustomTabBar = ({state, descriptors, navigation}) => {
  const [selectedTab, setSelectedTab] = useState(state.index);

  // Filter the routes to include only "Bottom" and "Centers"
  const filteredRoutes = state.routes.filter(
    route => route.name === 'Bottom' || route.name === 'Menus',
  );

  return (
    <View style={styles.tabBar}>
      {filteredRoutes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            setSelectedTab(index);
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconName = ICON_NAMES[route.name] || 'home';

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
            key={route.key}>
            <View style={styles.iconContainer}>
              <Icon
                name={iconName}
                color={isFocused ? Colors.yellow : Colors.white}
                size={isFocused ? 27 : 22}
              />
            </View>
            <Text
              style={{
                color: isFocused ? Colors.yellow : Colors.white,
                fontSize: getResponsiveFontSize(15),
                fontFamily: Fonts.Medium,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: Colors.primary,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomTabBar;
