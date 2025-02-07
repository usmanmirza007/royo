import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { typography } from '../styles/TypoGraphy'
import Colors from '../constants/Colors'


const CustomBootstrap = ({ item, onPress }) => {

  const imageUrl = item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150';

    return (
      <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={[typography.heading3, { marginBottom: 10 }]}>{item.title}</Text>
          <Text style={[typography.smallbody, { marginBottom: 10 ,}]}
          numberOfLines={1}
          ellipsizeMode="tail"
          >{item.subtitle}</Text>
          <View style={styles.statsContainer}>
            <Text style={[typography.smallbody, { color: Colors.green }]}>{item.fundingAmount} funded</Text>
            <Text style={[typography.smallbody, { color: Colors.green }]}>{item.backers} backers</Text>
            <Text style={[typography.smallbody, { color: Colors.green }]}>{item.daysLeft} days to go</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  

export default CustomBootstrap

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 4,

    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover'
    },
    cardContent: {
        padding: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})