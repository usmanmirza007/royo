import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Colors from '../../constants/Colors';
import globalStyles from '../../styles/GlobalStyles';

const TermsAndCondition = () => {
  return (
    <ScrollView style={[globalStyles.container, styles.container]}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.section}>
        Welcome to our application. By using our services, you agree to the
        following terms...
      </Text>
      {/* Add more sections as needed */}
      <Text style={styles.section}>
        1. Acceptance of Terms: You agree to abide by all applicable laws and
        regulations...
      </Text>
      <Text style={styles.section}>
        2. User Responsibilities: You are responsible for maintaining the
        confidentiality of your account...
      </Text>
      <Text style={styles.section}>
        3. Limitation of Liability: Our application is provided "as is" without
        any warranties...
      </Text>
      {/* Continue adding more terms and conditions as needed */}
      <Text style={styles.footer}>
        For any questions regarding these terms, please contact us.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.black,
  },
  section: {
    fontSize: 16,
    marginVertical: 10,
    color: Colors.black,
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: Colors.gray,
  },
});

export default TermsAndCondition;