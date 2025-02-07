import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomTabView from '../../components/CustomTabView';
import Colors from '../../constants/Colors';
import { SceneMap } from 'react-native-tab-view';
import { typography } from '../../styles/TypoGraphy';
import { Fonts } from '../../constants/Fonts';

const Card = ({ heading, content }) => (
  <View style={styles.card}>
    <Text style={styles.boldText}>{heading}</Text>
    <Text style={styles.listText}>{content}</Text>
  </View>
);

const AgribusinessAndFoodProcessing = () => (
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <Card
      heading="Agricultural Management Software"
      content="Tools like FarmLogs or AgriWebb to track crop performance, manage resources, and optimize yields."
    />
    <Card
      heading="Food Safety Compliance Tools"
      content="HACCP Management Software to help implement Hazard Analysis Critical Control Points (HACCP) and ensure food safety."
    />
    <Card
      heading="Recipe Development Software"
      content="Nutritional analysis tools like Food Processor or NutraCoster for optimizing recipes for nutritional content."
    />
    <Card
      heading="Supply Chain Management Solutions"
      content="Cold chain monitoring systems to track temperature-sensitive products throughout the supply chain."
    />
    <Card
      heading="Market Research Platforms"
      content="Consumer insight tools like Mintel or Nielsen for accessing market trends and food preferences."
    />
    <Card
      heading="Processing Equipment Simulation Software"
      content="Tools for simulating food processing operations to optimize efficiency and product quality."
    />
    <Card
      heading="Quality Control Tools"
      content="Partnerships with laboratories for testing food products to meet safety standards."
    />
    <Card
      heading="Sustainability Assessment Tools"
      content="Life Cycle Assessment (LCA) software to evaluate the environmental impact of food products."
    />
    <Card
      heading="Product Packaging Design Software"
      content="Tools like Esko or Packly to create and test innovative packaging solutions."
    />
    <Card
      heading="E-commerce Platforms"
      content="Online marketplace solutions like Shopify or WooCommerce for selling agricultural products and processed foods online."
    />
  </ScrollView>
);

const AgriTechSector = () => (
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <Card
      heading="Precision Agriculture Software"
      content="Field Mapping Tools: Software like Ag Leader or Cropio for mapping fields and analyzing soil data to optimize crop management."
    />
    <Card
      heading="IoT Sensors and Monitoring Systems"
      content="Smart Sensors: Devices for monitoring soil moisture, temperature, and nutrient levels to provide real-time data for decision-making."
    />
    <Card
      heading="Drone Technology"
      content="Agricultural Drones: Tools for aerial imaging, crop monitoring, and precision spraying to enhance field management."
    />
    <Card
      heading="Data Analytics Platforms"
      content="Agricultural Data Analytics Tools: Platforms like Granular or FarmLogs that analyze data for insights on crop performance and resource allocation."
    />
    <Card
      heading="Farm Automation Solutions"
      content="Robotic Harvesters: Automated systems for harvesting crops, reducing labor costs, and increasing efficiency."
    />
    <Card
      heading="Climate and Weather Forecasting Tools"
      content="Weather Monitoring Systems: Tools that provide localized weather forecasts to help farmers make informed planting and harvesting decisions."
    />
    <Card
      heading="Agricultural Marketplace Platforms"
      content="B2B Marketplaces: Online platforms like AgroMarketplace for connecting farmers with suppliers and buyers for easier transactions."
    />
    <Card
      heading="Crop Simulation Software"
      content="Growth Modeling Tools: Software like APSIM for simulating crop growth under various conditions to optimize planting strategies."
    />
    <Card
      heading="Blockchain for Traceability"
      content="Blockchain Solutions: Tools for ensuring transparency and traceability in the supply chain, enhancing food safety and consumer trust."
    />
    <Card
      heading="Sustainability Assessment Tools"
      content="Carbon Footprint Calculators: Tools to measure and reduce the environmental impact of agricultural practices."
    />
  </ScrollView>
);

const Incubatee = () => {
  const routes = [
    { key: 'agribusiness', title: 'Agribusiness & Food Processing' },
    { key: 'agritech', title: 'AgriTech Sector' },
  ];

  const scenes = {
    agribusiness: AgribusinessAndFoodProcessing,
    agritech: AgriTechSector,
  };

  return (
    <CustomTabView routes={routes} scenes={SceneMap(scenes)} />
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 3, // For Android shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 }, // For iOS shadow
  },
  boldText: {
    fontFamily: Fonts.Bold,
    fontSize: 16,
    color: Colors.black,
    marginBottom: 8,
  },
  listText: {
    fontSize: 14,
    color: Colors.black,
    lineHeight: 22,
    ...typography.body
  },
});

export default Incubatee;
