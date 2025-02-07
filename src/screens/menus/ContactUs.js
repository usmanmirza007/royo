import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import CustomButton from '../../components/CustomButton';
import { typography } from '../../styles/TypoGraphy';
import { Fonts } from '../../constants/Fonts';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (name && email && message) {
      Alert.alert('Thank you!', 'Your message has been sent.');
      // Here, you can handle form submission, like sending data to your backend
      setName('');
      setEmail('');
      setMessage('');
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Contact Us</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor={Colors.black}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Your Email"
        placeholderTextColor={Colors.black}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.textArea}
        placeholder="Your Message"
        placeholderTextColor={Colors.black}
        value={message}
        onChangeText={setMessage}
        multiline={true}
        numberOfLines={4}
      />

      {/* <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Ionicons name="send" size={20} color="#fff" />
        <Text style={styles.submitButtonText}>Send Message</Text>
      </TouchableOpacity> */}
      <CustomButton
        title="Send Message"
        onPress={handleSubmit}
        style={styles.customButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  headerText: {
    fontSize: 24,
    ...typography.heading3,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    fontFamily:Fonts.Regular,
    color: Colors.black,
  },
  textArea: {
    backgroundColor: '#fff',
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    color: Colors.black,
  },

  customButton: {
    position: 'absolute',
    bottom: 20, // Add some space from the bottom edge
    left: 20,
    right: 20,
  },
});

export default ContactUs;