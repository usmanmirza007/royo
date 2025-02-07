// src/utils/responsive.js
import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

// Base width and height for scaling
const BASE_WIDTH = 375; // Reference width (e.g., iPhone X width)
const BASE_HEIGHT = 812; // Reference height (e.g., iPhone X height)

// Function to get percentage-based width
export const getWidthPercentage = percentage => {
  return (width * percentage) / 100;
};

// Function to get percentage-based height
export const getHeightPercentage = percentage => {
  return (height * percentage) / 100;
};

// Function to scale font size based on the screen width
export const getResponsiveFontSize = size => {
  const scaledSize = size * (width / BASE_WIDTH);
  return PixelRatio.roundToNearestPixel(scaledSize);
};

// Function to scale padding or margin
export const getResponsivePadding = size => {
  const scaledSize = size * (width / BASE_WIDTH);
  return PixelRatio.roundToNearestPixel(scaledSize);
};

// Optionally, a function for scaling font weight (based on custom logic)
export const getResponsiveFontWeight = weight => {
  if (width > 400) {
    return weight + 100; // Increase font weight slightly on larger screens
  }
  return weight;
};
