import React from 'react';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from '../bottomNavigation/BottomNavigation';
import Consultant from '../../screens/Product_Services/Consultant';
import Chat from '../../screens/Chat';
import CustomChatHeader from '../../components/CustomChatHeader';
import Wallet from '../../screens/menus/Wallet';
import Invite from '../../screens/menus/Invite';
import TermsAndCondition from '../../screens/menus/TermsAndCondition';
import AboutUs from '../../screens/menus/AboutUs';
import ContactUs from '../../screens/menus/ContactUs';
import SignOut from '../../screens/menus/SignOut';
import StartUp from '../../screens/Product_Services/StartUp';
import Mentor from '../../screens/Product_Services/Mentor';
import IncubationSpace from '../../screens/menus/IncubationSpace';
const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomDash"
        component={BottomNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Consultant" component={Consultant} />
      <Stack.Screen name="StartUp" component={StartUp} />
      <Stack.Screen name="Mentor" component={Mentor} />

      {/* ----------------- Menus Screen ---------------- */}

      <Stack.Screen name="IncubationSpace" component={IncubationSpace} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="Invite" component={Invite} />
      <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="SignOut" component={SignOut} />
      {/* ------------------End----------------- */}
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={({navigation}) => ({
          header: () => (
            <CustomChatHeader
              navigation={navigation}
              userName="User Name" // You can pass the user name dynamically
              userImage={require('../../assets/images/Chat_student.png')} // Dynamic user image
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;