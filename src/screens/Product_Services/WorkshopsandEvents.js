import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SquareBox from '../../components/SquareBox';
import { typography } from '../../styles/TypoGraphy';
import Colors from '../../constants/Colors';
import globalStyles from '../../styles/GlobalStyles';
import { Fonts } from '../../constants/Fonts';

const WorkshopsandEvents = ({ navigation }) => {

    const data = [
        {
            id: 1,
            title: 'Upcoming Events',
            imageUrl: require('../../assets/images/upcomingEvent.png'),
            nav: 'UpcomingEvents'
            
        },
        {
            id: 2,
            title: 'Recorded Webinars',
            imageUrl: require('../../assets/images/webinar.png'),
            nav: 'RecordWebinar'
        },
        {
            id: 3,
            title: 'Online Courses',
            imageUrl: require('../../assets/images/onlinecourse.png'),
            nav: 'OnlineCourses'
        },
        {
            id: 4,
            title: 'Startup Roadmap',
            imageUrl: require('../../assets/images/startup_road.png'),
            nav: 'StartupRoadmap'
        },
    ];

    const handlePress = (item) => {
        console.log('Clicked', item.title)
        navigation.navigate(item.nav)
    }
    return (
        <View style={globalStyles.container}>
            <View>
                <Text style={styles.title}>Workshops and Events</Text>
                <Text style={styles.desc}>Start your journey to financial empowerment and growth today!</Text>
            </View>
            <SquareBox data={data} onPress={handlePress} />
        </View>
    );
}

export default WorkshopsandEvents;
const styles = StyleSheet.create({
    title: {
        ...typography.heading2,
        color: Colors.primary,
        textAlign: 'center',
        marginBottom: 10
    },
    desc: {
        ...typography.heading5,
        fontFamily: Fonts.Regular,
        textAlign: 'center',
        marginBottom: 10
    }
})
