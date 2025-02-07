import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import { Fonts } from '../../constants/Fonts';

const AboutUs = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Image at the top */}
      <Image 
        source={{ uri: 'https://www.firststepimmigration.com/wp-content/uploads/2023/02/Pilot-Program.jpg.webp' }} // Replace with your image URL or local image
        style={styles.image}
      />

      {/* About Us Text */}
      <Text style={styles.aboutText}>
        We empower small businesses and entrepreneurs in India with tailored mentorship, focusing on agribusiness startups. Our mission is to foster vibrant communities through personalized education and ongoing resources. Connect with a mentor to receive one-on-one support, guidance, and tools to help your business succeed. CULTIVATE PIE is committed to positively impacting local communities and supporting entrepreneurs in their business journey.
      </Text>

      {/* Custom Button */}
      <CustomButton
        title="Chat with StartUp"
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200, 
    marginBottom: 20, 
  },
  aboutText: {
    marginBottom: 20,
    textAlign: 'justify',
    fontSize: 18,
    fontFamily: Fonts.Medium,
  },
});

export default AboutUs;