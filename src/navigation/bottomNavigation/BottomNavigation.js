import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import CustomTabBar from '../../components/CustomTabBar';
import Menus from '../../screens/Menus';
import Colors from '../../constants/Colors';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Bottom"
        component={Home}
        options={{headerShown: false, title: 'Home'}}
      />
      <Tab.Screen
        name="Menus"
        component={Menus}
        options={{
          title: 'Menus',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
