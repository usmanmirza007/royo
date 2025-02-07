import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../../../styles/GlobalStyles';
import { typography } from '../../../styles/TypoGraphy';
import Colors from '../../../constants/Colors';
import { Fonts } from '../../../constants/Fonts';
import RecordCustomBox from '../../../components/RecordCustomBox';

const RecordWebinar = () => {
    const webinars = [
        {
            id: 1,
            imageUrl: require('../../../assets/images/toolbox.png'),
            title: 'How to Increase Business Sales by Crafting a Compelling Sales Message',
            date: 'October 22, 2024, 1:00 PM EDT',
            format: 'Online Live Event',
            description: 'Learn how to craft a clear and persuasive sales message that excites prospects to engage with your business and take action.',
        },
        {
            id: 2,
            imageUrl: require('../../../assets/images/coins.png'),
            title: 'Mastering Shopify for Small Business Owners',
            date: 'October 24, 2024, 1:00 PM EDT',
            format: 'Online Live Event',
            description: 'Get a step-by-step guide on setting up your Shopify store to thrive in the e-commerce space.',
        },
        {
            id: 3,
            imageUrl: require('../../../assets/images/shop.png'),
            title: 'The 5 Best Pricing Methods – How to Choose a Pricing Strategy for Your Business',
            date: 'October 29, 2024, 1:00 PM EDT',
            format: 'Online Live Event',
            description: 'Discover five effective pricing methods and learn which strategy best suits your business model.',
        },
        {
            id: 4,
            imageUrl: require('../../../assets/images/business.png'),
            title: 'Business Branding 101 – How to Create Your Brand Strategy',
            date: 'October 24, 2024, 1:00 PM EDT',
            format: 'Online Live Event',
            description: 'Learn how to create your brand story, design your business logo, and build a brand strategy that resonates with your audience.',
        },
        {
            id: 5,
            imageUrl: require('../../../assets/images/management.png'),
            title: 'Time Management Strategies for Small Business Owners',
            date: 'October 24, 2024, 1:00 PM EDT',
            format: 'Online Live Event',
            description: 'Explore time management techniques that will help you efficiently handle business tasks and improve productivity.',
        },
        {
            id: 6,
            imageUrl: require('../../../assets/images/discount.png'),
            title: 'Year-End Tax Preparation for Your Business',
            date: 'October 24, 2024, 1:00 PM EDT',
            format: 'Online Live Event',
            description: 'GGet up-to-date information on tax laws and learn how to secure key tax breaks as you prepare for year-end filings.',
        },
    ];

    const handlePress = (item) => {
        console.log('Clicked Webinar:', item);
    };

    return (
        <View style={globalStyles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Recorded Webinars</Text>
                <Text style={styles.description}>
                    Recorded events allow you to record a live webinar, then replay that recording with attendee engagement.
                </Text>
            </View>
            <RecordCustomBox data={webinars} onPress={handlePress} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: 15,
    },
    title: {
        ...typography.heading2,
        color: Colors.primary,
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        ...typography.heading5,
        fontFamily: Fonts.Regular,
        textAlign: 'center',
    },
});

export default RecordWebinar;
