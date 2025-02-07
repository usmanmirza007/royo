  import React, { useEffect, useState } from 'react';
  import { View } from 'react-native';
  import globalStyles from '../../styles/GlobalStyles';
  import Food from '../Food';
  import Agriculture from '../Agriculture';
  import CustomTabView from '../../components/CustomTabView';
  import { SceneMap } from 'react-native-tab-view';

  const Bootstrap = ({ navigation }) => {

    const routes = [
      { key: 'food', title: 'Food' },
      { key: 'agriculture', title: 'Agriculture' },
    ];

    const scenes = {
      food: () => <Food navigation={navigation} />,
      agriculture: () => <Agriculture navigation={navigation} />,
    };

    return (
      <View style={globalStyles.container}>
        <CustomTabView routes={routes} scenes={SceneMap(scenes)} />
      </View>
    );
  };

  export default Bootstrap;