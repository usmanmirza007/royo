import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView } from 'react-native';
import Video from 'react-native-video';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { typography } from '../styles/TypoGraphy';
import Colors from '../constants/Colors';
import CustomButton from '../components/CustomButton';
import { Fonts } from '../constants/Fonts';

const initialLayout = { width: Dimensions.get('window').width };

const CampaignRoute = ({ data }) => (
  <ScrollView contentContainerStyle={styles.scrollContent}>
    <View style={styles.textContainer}>
      <Text style={typography.heading4}>Story</Text>
      <Text style={typography.body}>{data.story}</Text>
    </View>
  </ScrollView>
);

const RisksRoute = ({ data }) => (
  <ScrollView contentContainerStyle={styles.scrollContent}>
    <View style={styles.textContainer}>
      <Text style={[typography.heading4]}>Risk and Challenges</Text>
      
        <Text style={styles.riskcontent}>• {data.risksAndChallenges}</Text>
    
    </View>
  </ScrollView>
);

const formatCurrency = (amount) => {
  // Check if the amount is valid (not undefined or null)
  if (amount !== undefined && amount !== null && !isNaN(amount)) {
    `₹${amount.toLocaleString('en-IN')}`
  } else {
    return '₹15000';  
  }
};

const OverviewRoute = ({ data }) => (
  <ScrollView contentContainerStyle={styles.scrollContent}>
  <View style={styles.tabContent}>

    <Text style={typography.heading4}>{data.title}</Text>

    <View style={styles.logoContainer}>

    {data.logo[0]  ? (
        <Image source={{ uri: data.logo[0] }} style={styles.logo} />
      ) : (

        <Image source={require('../assets/images/app_logo.png')} style={styles.logo} />
      )}

      <View style={styles.creatorInfo}>
        <Text style={typography.smallbody}>Created by</Text>
        <Text style={[typography.heading7, { color: Colors.primary }]}>{data.ownerName}</Text>
      </View>

    </View>

    {/* Title and Description */}
    <Text style={styles.description}>{data.subtitle}</Text>

    {/* Funding Information */}
    <View style={styles.fundingInfo}>
      <Text style={styles.pledgeamount}>{formatCurrency(data.amountPledged)}</Text>

      <Text style={{borderBottomWidth:2,borderColor:Colors.primary,marginBottom:10}}></Text>
      <Text style={styles.goal}>pledged of {(data.fundingAmount)} goal</Text>
    </View>

    {/* Backers and Days Remaining */}
    <View style={styles.statsRow}>
      <Text style={styles.stat}>{data.backers} backers</Text>
      <Text style={styles.stat}>{data.daysLeft} days to go</Text>
    </View>
  </View>
  </ScrollView>
);


const Landing = ({ route, navigation }) => {
  const { data } = route.params || {};
  console.log('data', data)
  console.log('datacheck', data.fundingAmount)
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'overview', title: 'Overview' },
    { key: 'campaign', title: 'Campaign' },
    { key: 'risks', title: 'Risks' },
  ]);

  const renderScene = SceneMap({
    overview: () => <OverviewRoute data={data} />,
    campaign: () => <CampaignRoute data={data} />,
    risks: () => <RisksRoute data={data} />
  });

  return (
    <View style={styles.container}>
      {/* Video Section */}
      <Video
        source={{ uri: data.video || 'https://www.w3schools.com/html/mov_bbb.mp4' }}
        style={styles.video}
        controls={true}
        resizeMode="cover"
      />

      {/* Tab Views */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={(props) => (
          <TabBar {...props} indicatorStyle={styles.indicator} style={styles.tabBar} />
        )}
      />

      {/* Back this Project Button */}
      <View style={styles.buttonContainer}>
        <CustomButton title="Back this Project" 
        onPress={() => navigation.navigate('PaymentScreen', { amount: data.amountPledged, merchantUserId: 'MUID123' })} 
        style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 1,
  },
  textContainer: {
    width: '100%',
    alignItems: 'flex-start',
    padding:10
  },
  video: {
    width: '100%',
    height: 200,
    backgroundColor: 'black',
  },
  tabContent: {
    padding: 20,
  },
  tabBar: {
    backgroundColor: Colors.primary,
  },
  indicator: {
    backgroundColor: Colors.black,
  },
  buttonContainer: {
    padding: 16,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  button: {
    borderRadius: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'flex-start',
    marginTop: 10
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  creatorInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',

  },
  fundingInfo: {
    flexDirection: 'column', 
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 20,
    marginTop:10
},
  description:{

    ...typography.heading6,
    fontFamily:Fonts.Regular
  },
  pledgeamount:{
    ...typography.heading6,
    color:Colors.primary,
    fontFamily:Fonts.ExtraBold,
    top:10,

  },
  goal:{
    fontFamily:Fonts.Medium,
    ...typography.body
  },
  stat:{
    fontFamily:Fonts.Medium,
    ...typography.body

  },
  riskcontent:{

    ...typography.body,
    top:10
  }
});


export default Landing;