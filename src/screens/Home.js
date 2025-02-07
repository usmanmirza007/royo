import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import globalStyles from '../styles/GlobalStyles';
import {typography} from '../styles/TypoGraphy';
import Advertisement from '../components/Advertisement';
import SquareBox from '../components/SquareBox';
import Colors from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

const Home = ({navigation}) => {
  const advertisements = [
    {
      id: '1',
      title: 'Ad 2',
      imageUrl: require('../assets/images/Agri_1.png'),
      type: 'image',
    },
    {
      id: '2',
      title: 'Ad 3',
      imageUrl: require('../assets/images/food.png'),
      type: 'image',
    },
    {
      id: '3',
      title: 'Ad 3',
      imageUrl: require('../assets/images/Fund_1.png'),
      type: 'image',
    },
  ];

  const data = [
    // {
    //   id: '6',
    //   title: 'startup',
    //   imageUrl: require('../assets/images/Chat_employee.png'),
    //   nav: 'StartUp',
    // },

    {
      id: '1',
      title: 'One to one Support',
      imageUrl: require('../assets/images/one-one.png'),
      nav: 'OnetoOne',
    },
    
    {
      id: '2',
      title: 'Cultivation Capital',
      imageUrl: require('../assets/images/Funding.png'),
      nav: 'Bootstrap',
    },

    {
      id: '3',
      title: 'E - Tools & Resources',
      imageUrl: require('../assets/images/tools.png'),
      nav: 'ToolsAndResources',
    },

    {
      id: '4',
      title: 'Contractors',
      imageUrl: require('../assets/images/serviceprovider.png'),
      nav: 'Contractors',
    },

    {
      id: '5',
      title: 'Product Development support',
      imageUrl: require('../assets/images/agricommunity.png'),
      nav: 'ProductDevelopmentsupport',
    },
    {
      id: '13',
      title: 'Virtual Office',
      imageUrl: require('../assets/images/office.png'),
      nav: 'OfficeSpace',
    },
    {
      id: '14',
      title: 'Incubatee',
      imageUrl: require('../assets/images/incubatee.png'),
      nav: 'Incubatee',
    },
    {
      id: '15',
      title: 'Campaign',
      imageUrl: require('../assets/images/promotion.png'),
      nav: 'Campaign',
    },
    {
      id: '16',
      title: 'Workshops and Events',
      imageUrl: require('../assets/images/workshop.png'),
      nav: 'WorkshopsandEvents',
    },
    
  ];


  const handlePress = item => {
    console.log('item', item)
    navigation.navigate(item.nav, {type: item.title});
  };



  return (
    
    <View style={globalStyles.container}>
      
      {/* <Advertisement advertisements={advertisements} /> */}

      <Text style={styles.servicesContainer}>C U L T I V A T E  -  P I E </Text>

      <View>
        <SquareBox data={data} onPress={handlePress} />
      </View>

      
    </View>
  
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center', // Align items center for consistency
    backgroundColor: Colors.white,
    borderRadius: 10,
    margin: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    width: 160, // Fixed width
    height: 220, // Fixed height to keep all cards same size
  },
  cardImage: {
    width: 60,
    height: 60,
    marginBottom: 10, // Add spacing between image and text
  },
  cardTitle: {
    textAlign: 'center',
    marginVertical: 5,
    fontFamily:Fonts.SemiBold,
    ...typography.heading6
  },
  cardDescription: {
    textAlign: 'center',
    color: Colors.darkGrey,
    flex: 1, // Make description take available space
  },
  servicesContainer: {
    marginTop: 30,
    ...typography.heading5,
    textAlign: 'center', 
    alignSelf: 'center', 
  },

});

export default Home;