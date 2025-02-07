import {StyleSheet} from 'react-native';
import {getResponsiveFontSize} from '../utils/Dimention';
import {Fonts} from '../constants/Fonts';
import Colors from '../constants/Colors';

export const typography = StyleSheet.create({
  heading1: {
    fontSize: getResponsiveFontSize(32), // H1: Typically 32px
    fontFamily: Fonts.Medium,
    color: Colors.black,
    // fontWeight: 'bold',
  },
  heading2: {
    fontSize: getResponsiveFontSize(28), // H2: Typically 28px
    // fontWeight: 'bold',
    fontFamily: Fonts.Bold,
    color: Colors.black,
  },
  heading3: {
    fontSize: getResponsiveFontSize(24), // H3: Typically 24px
    // fontWeight: 'bold',
    fontFamily: Fonts.Bold,
    color: Colors.black,
  },
  heading4: {
    fontSize: getResponsiveFontSize(22), // H4: Typically 20px
    // fontWeight: 'bold',
    fontFamily: Fonts.Bold,
    color: Colors.black,
  },
  heading5: {
    fontSize: getResponsiveFontSize(20), // H5: Typically 18px
    // fontWeight: 'bold',
    fontFamily: Fonts.Bold,
    color: Colors.black,
  },
  heading6: {
    fontSize: getResponsiveFontSize(18), // H6: Typically 16px
    // fontWeight: 'bold',
    fontFamily: Fonts.Bold,
    color: Colors.black,
  },
  heading7: {
    fontSize: getResponsiveFontSize(16), // H7: Typically 14px
    // fontWeight: 'bold',
    fontFamily: Fonts.Bold,
    color: Colors.black,
  },
  body: {
    fontSize: getResponsiveFontSize(18),
    // fontWeight: 'normal',
    fontFamily: Fonts.Regular,
    color: Colors.black,
  },
  smallbody: {
    fontSize: getResponsiveFontSize(16),
    // fontWeight: 'normal',
    fontFamily: Fonts.Regular,
    color: Colors.black,
  },
});