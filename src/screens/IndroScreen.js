import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import {
  getHeightPercentage,
  getResponsivePadding,
  getWidthPercentage,
} from '../utils/Dimention';
import CustomButton from '../components/CustomButton';
import globalStyles from '../styles/GlobalStyles';
import {typography} from '../styles/TypoGraphy';
import Colors from '../constants/Colors';

const {width} = Dimensions.get('window'); // Get the width of the screen

const slides = [
  {
    title: 'Startup',
    text: 'First Call is a smart task management app designed to streamline your workflow and boost productivity. Achieve more with less effort—let TaskPro handle your tasks, so you can focus on what matters most.',
    image: require('../assets/images/Startup.png'), // Correctly load the local image
  },
  {
    title: 'Mentor',
    text: 'First Call is a smart task management app designed to streamline your workflow and boost productivity. Achieve more with less effort—let TaskPro handle your tasks, so you can focus on what matters most.',
    image: require('../assets/images/Mentor.png'), // Correctly load the local image
  },
  {
    title: 'Consultant',
    text: 'First Call is a smart task management app designed to streamline your workflow and boost productivity. Achieve more with less effort—let TaskPro handle your tasks, so you can focus on what matters most.',
    image: require('../assets/images/Consultant.png'), // Correctly load the local image
  },
];

const IndroScreen = ({navigation}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef();

  // Function to handle scroll event and update active slide
  const onScroll = event => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(slideIndex);
  };

  // Function to handle 'Next' button press
  const goToNextSlide = () => {
    if (activeSlide < slides.length - 1) {
      scrollRef.current.scrollTo({
        x: width * (activeSlide + 1),
        animated: true,
      });
    } else {
      navigation.navigate('LoginScreen'); // Navigate to Dashboard after last slide
    }
  };

  const handleSkip = () => {
    navigation.navigate('LoginScreen');
  };

  const btnText = activeSlide === slides.length - 1 ? 'Start' : 'Next';

  return (
    <View style={[globalStyles.container, {padding: 0}]}>
      <CustomButton
        title="Skip"
        onPress={handleSkip}
        style={styles.customButton}
      />

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        ref={scrollRef}>
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <Image source={slide.image} style={styles.image} />
            <Text style={typography.heading5}>{slide.title}</Text>
            <Text style={typography.body}>{slide.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeSlide === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      <CustomButton
        title={btnText}
        onPress={goToNextSlide}
        style={styles.btnText}
      />
    </View>
  );
};

export default IndroScreen;

const styles = StyleSheet.create({
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: getResponsivePadding(16),
  },
  image: {
    width: getWidthPercentage(50),
    height: getHeightPercentage(23),
    borderRadius: 100,
    marginBottom: 20,
  },

  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  dot: {
    height: getHeightPercentage(1),
    width: getWidthPercentage(4),
    borderRadius: 4,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: Colors.black,
  },
  inactiveDot: {
    backgroundColor: Colors.inActive,
  },

  customButton: {
    width: getWidthPercentage(20),
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  btnText: {
    width: getWidthPercentage(25),
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
});