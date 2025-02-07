import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from '../../bottomNavigation/BottomNavigation';
import Home from '../../../screens/Home';
import Profile from '../../../screens/Profile';
import StartUp from '../../../screens/Product_Services/StartUp';
import Mentor from '../../../screens/Product_Services/Mentor';
import Wallet from '../../../screens/menus/Wallet';
import Invite from '../../../screens/menus/Invite';
import TermsAndCondition from '../../../screens/menus/TermsAndCondition';
import AboutUs from '../../../screens/menus/AboutUs';
import ContactUs from '../../../screens/menus/ContactUs';
import SignOut from '../../../screens/menus/SignOut';
import Chat from '../../../screens/Chat';
import MentorSignUp from '../../../screens/SignUp/MentorSignUp';
import Colors from '../../../constants/Colors';
import CustomChatHeader from '../../../components/CustomChatHeader';
import ChatProfile from '../../../screens/ChatProfile';
import CallScreen from '../../../screens/CallScreen';
import Bootstrap from '../../../screens/Product_Services/Bootstrap';
import Landing from '../../../screens/Landing';
import OnetoOne from '../../../screens/Product_Services/OnetoOne';
import ToolsAndResources from '../../../screens/Product_Services/ToolsAndResources';
import OfficeSpace from '../../../screens/Product_Services/OfficeSpace';
import WorkshopsandEvents from '../../../screens/Product_Services/WorkshopsandEvents';
import ProductDevelopmentsupport from '../../../screens/Product_Services/ProductDevelopmentsupport';
import Consultant from '../../../screens/Product_Services/Consultant';
import BecomeMentor from '../../../screens/menus/BecomeMentor';
import VolunteerOpportunities from '../../../screens/menus/VolunteerOpportunities';
import TrainingOnboard from '../../../screens/menus/TrainingOnboard';
import Incubatee from '../../../screens/Product_Services/Incubatee';
import Campaign from '../../../screens/Product_Services/Campaign';
import {Fonts} from '../../../constants/Fonts';
import Contractors from '../../../screens/Product_Services/Contractors';
import UpcomingEvents from '../../../screens/Product_Services/WorkshopEvents/UpcomingEvents';
import RecordWebinar from '../../../screens/Product_Services/WorkshopEvents/RecordWebinar';
import OnlineCourses from '../../../screens/Product_Services/WorkshopEvents/OnlineCourses';
import StartupRoadmap from '../../../screens/Product_Services/WorkshopEvents/StartupRoadmap';
import CourseLanding from '../../../screens/Product_Services/WorkshopEvents/CourseLanding';
import PaymentScreen from '../../../screens/PaymentScreen';

const Stack = createNativeStackNavigator();

const MentorNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomDash"
      screenOptions={{
        headerTitleStyle: {
          fontFamily: Fonts.Medium,
        },
      }}>
      <Stack.Screen
        name="BottomDash"
        component={BottomNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />

      <Stack.Screen
        name="StartUp"
        component={StartUp}
        options={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="Consultant"
        component={Consultant}
        options={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="Mentor"
        component={Mentor}
        options={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="MentorSignUp"
        component={MentorSignUp}
        options={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />

      {/* ----------------- Menus Screen ------------------ */}

      <Stack.Screen
        name="BecomeMentor"
        component={BecomeMentor}
        options={{
          title: 'Become Mentor',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />

      <Stack.Screen
        name="VolunteerOpportunities"
        component={VolunteerOpportunities}
        options={{
          title: 'Volunteer Opportunities',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />

      <Stack.Screen
        name="TrainingOnboard"
        component={TrainingOnboard}
        options={{
          title: 'Training & Onboarding',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />

      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="Invite"
        component={Invite}
        options={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="TermsAndCondition"
        component={TermsAndCondition}
        options={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="SignOut"
        component={SignOut}
        options={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="ChatProfile"
        component={ChatProfile}
        options={{
          title: 'Details',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="CallScreen"
        component={CallScreen}
        options={{
          title: 'CallScreen',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="Bootstrap"
        component={Bootstrap}
        options={{
          title: 'Cultivation Capital',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{
          title: 'Funding',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          title: 'PaymentScreen',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />

      {/* -----------------product services----------------- */}
      <Stack.Screen
        name="OnetoOne"
        component={OnetoOne}
        options={{
          title: 'One-One Support',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />

      <Stack.Screen
        name="ToolsAndResources"
        component={ToolsAndResources}
        options={{
          title: 'E - Tools & Resources',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />

      <Stack.Screen
        name="ProductDevelopmentsupport"
        component={ProductDevelopmentsupport}
        options={{
          title: 'Product Development support',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />

      <Stack.Screen
        name="OfficeSpace"
        component={OfficeSpace}
        options={{
          title: 'Virtual Office',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />

      <Stack.Screen
        name="Incubatee"
        component={Incubatee}
        options={{
          title: 'Incubatee',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />

      <Stack.Screen
        name="Campaign"
        component={Campaign}
        options={{
          title: 'Campaign',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />

      <Stack.Screen
        name="WorkshopsandEvents"
        component={WorkshopsandEvents}
        options={{
          title: 'Workshops and Events',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="UpcomingEvents"
        component={UpcomingEvents}
        options={{
          title: 'Upcoming Events',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="RecordWebinar"
        component={RecordWebinar}
        options={{
          title: 'Recorded Webinars',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="OnlineCourses"
        component={OnlineCourses}
        options={{
          title: 'Online Courses',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="CourseLanding"
        component={CourseLanding}
        options={{
          title: 'CourseLanding',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="StartupRoadmap"
        component={StartupRoadmap}
        options={{
          title: 'Startup Roadmap',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />

      <Stack.Screen
        name="Contractors"
        component={Contractors}
        options={{
          title: 'Contractors',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}
      />
      {/* ------------------End----------------- */}
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={({navigation, route}) => ({
          header: () => (
            <CustomChatHeader
              navigation={navigation}
              userName={route.params ? route.params.userName : 'User Name'} // You can pass the user name dynamically
              userImage={
                route.params && route.params.userImage
                  ? {uri: route.params.userImage}
                  : require('../../../assets/images/profile.png')
              }
              userId={route.params.userId}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MentorNavigation;
