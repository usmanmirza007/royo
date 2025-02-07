import {StyleSheet} from 'react-native';
import {getResponsiveFontSize, getResponsivePadding} from '../utils/Dimention';
import Colors from '../constants/Colors';
import {Fonts} from '../constants/Fonts';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    padding: getResponsivePadding(16),
    color: Colors.black,
  },
  text: {
    fontSize: getResponsiveFontSize(17),
    color: Colors.black,
    fontFamily: Fonts.Medium,
  },
});

export default globalStyles;