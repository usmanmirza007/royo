import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { typography } from '../../styles/TypoGraphy';
import { Fonts } from '../../constants/Fonts';

const serviceProviders = [
  'All', 'Advertising', 'Branding', 'Business Support', 'Engineering', 'Exhibitions',
  'Financial', 'Funding', 'Insurance', 'Intellectual Property', 'IOT', 'ISO Standards',
  'Law', 'Legal', 'Manufacturing', 'Market Research', 'Marketing', 'PR',
  'Procurement', 'Product Development', 'Recruitment', 'Satellite', 'Strategy', 'Training', 'Websites'
];

const Contractors = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardText}>{item}</Text>
    </TouchableOpacity>
  );

  return (  
    <View style={styles.container}>
      {/* Header and Description */}
      <Text style={styles.header}>CULTIVATE - PIE  Contractors</Text>
      <Text style={styles.description}>
        Our partners offer a range of services to help our members grow their businesses.
      </Text>

      {/* Grid of Service Providers */}
      <FlatList
        data={serviceProviders}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={2} // 2 items per row
        columnWrapperStyle={styles.row} // To adjust the row styling
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 24,
    ...typography.heading3,
    textAlign: 'center',
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily:Fonts.Medium,
    marginBottom: 20
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15
  },
  card: {
    backgroundColor: Colors.inActive,
    padding: 15,
    borderRadius: 8,
    width: '45%', // Adjust width for 2 items per row
    alignItems: 'center'
  },
  cardText: {
    color: Colors.primary,
    fontSize: 18,
    textAlign: 'center',
    fontFamily:Fonts.Bold
  }
});

export default Contractors;
