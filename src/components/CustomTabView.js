import React, {useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import Colors from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

const CustomTabView = ({routes, scenes}) => {
  const [index, setIndex] = useState(0);


  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={scenes}
      onIndexChange={setIndex}
      initialLayout={{width: Dimensions.get('window').width}}
      renderTabBar={props => {
        return (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.label}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent', // No background for tab bar
    elevation: 0, // Remove shadow on Android
    shadowOpacity: 0, // Remove shadow on iOS
  },
  indicator: {
    backgroundColor: Colors.black, // Green indicator under active tab
    height: 2, // Slim indicator
  },
  label: {
    color: 'black', // Black text for tabs
    fontFamily: Fonts.Bold
  },
});

export default CustomTabView;