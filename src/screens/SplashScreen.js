import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import globalStyles from '../styles/GlobalStyles';
import {getHeightPercentage, getWidthPercentage} from '../utils/Dimention';
import {typography} from '../styles/TypoGraphy';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('IndroScreen');
    }, 7000); // 7 seconds delay
    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigation]);
  return (
    <View
      style={[
        globalStyles.container,
        {justifyContent: 'center', alignItems: 'center'},
      ]}>
      <View>
        <Image
          source={require('../assets/images/Cultivate_logo.png')}
          style={styles.logo}
          // resizeMode="contain"
        />
        <Text style={[typography.heading3,styles.text]}>
          {'  Welcome to CULTIVATE - PIE!'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: getWidthPercentage(90),
    height: getHeightPercentage(20),
  },
  text:{
    marginLeft:40
  }
});

export default SplashScreen;