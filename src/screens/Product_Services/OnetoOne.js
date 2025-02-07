import { View, Text } from 'react-native'
import React from 'react'
import SquareBox from '../../components/SquareBox';

export default function OnetoOne({navigation}) {

    const data = [
        // {
        //   id: '6',
        //   title: 'startup',
        //   imageUrl: require('../assets/images/Chat_employee.png'),
        //   nav: 'StartUp',
        // },
        {
            id: '7',
            title: 'consultant',
            imageUrl: require('../../assets/images/Chat_trainer.png'),
            nav: 'StartUp',
        },
        {
            id: '8',
            title: 'mentor',
            imageUrl: require('../../assets/images/Chat_consultant.png'),
            nav: 'StartUp',
        },

    ];

    const handlePress = item => {
        navigation.navigate(item.nav, { type: item.title });
    };

    return (
        <View>
            <SquareBox data={data} onPress={handlePress} />
        </View>
    )
}