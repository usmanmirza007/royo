import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Video from 'react-native-video';

import {getHeightPercentage, getWidthPercentage} from '../utils/Dimention';
import Colors from '../constants/Colors';

const CarouselItem = ({item}) => {
  return (
    <View style={[styles.itemContainer]}>
      {item.type === 'image' && (
        <Image
          source={
            typeof item.imageUrl === 'number'
              ? item.imageUrl
              : {uri: item.imageUrl}
          }
          style={styles.image}
          resizeMode="cover"
        />
      )}
      {item.type === 'video' && (
        <Video
          source={
            typeof item.videoUrl === 'undefined'
              ? item.videoUrl
              : {uri: item.videoUrl}
          }
          style={styles.image}
          resizeMode="cover"
          controls // Show video controls
          repeat // Loop video
        />
      )}
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
};

// Main Carousel component
const Advertisement = ({advertisements}) => {
  return (
    <View>
      <Carousel
        data={advertisements}
        renderItem={({item}) => <CarouselItem item={item} />}
        sliderWidth={getWidthPercentage(93)}
        itemWidth={getWidthPercentage(100)}
        loop
        autoplay
        autoplayDelay={15000}
        autoplayInterval={15000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: getWidthPercentage(100),
    height: getHeightPercentage(27),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    marginVertical: 10,
    fontSize: 18,
    color: Colors.black,
  },
});

export default Advertisement;