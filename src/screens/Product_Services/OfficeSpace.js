import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { typography } from '../../styles/TypoGraphy';
import { Fonts } from '../../constants/Fonts';
import Colors from '../../constants/Colors';

const OfficeSpace = () => {
    const navigation = useNavigation(); // Initialize useNavigation

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.heading}>C U L T I V A T E - P I E</Text>

            <Text style={styles.headingtext}>Virtual Office Services for Agribusinesses</Text>

            <Text style={styles.bodyText}>
                Looking for an affordable way to scale up your agribusiness?
            </Text>
            <Text style={styles.bodyText}>
                Our virtual office services provide you with a professional business address and access 
                to on-site meeting rooms, all without the costs associated with maintaining a physical office.
            </Text>
            <Text style={styles.bodyText}>
                This allows you to expand your business affordably while increasing your visibility to potential clients.
            </Text>

            <View style={styles.signupContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                    <Text style={styles.signup}>Sign up today!</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.heading}>What's Available?</Text>

            <Text style={styles.subHeading}>Business Address:</Text>
            <Text style={styles.bodyText}>
                Establish a professional presence without the hassle of renting an office.
            </Text>

            <Text style={styles.subHeading}>Personal Mailbox:</Text>
            <Text style={styles.bodyText}>
                Convenient access to your mail, with options for forwarding.
            </Text>

            <Text style={styles.subHeading}>Meeting Rooms:</Text>
            <Text style={styles.bodyText}>
                Rent professional meeting spaces for client interactions or team collaborations.
            </Text>

            <Text style={styles.subHeading}>Free WiFi On-Site:</Text>
            <Text style={styles.bodyText}>
                Stay connected and productive during your meetings.
            </Text>

            <Text style={styles.subHeading}>Flexible Agreements:</Text>
            <Text style={styles.bodyText}>
                Customize your virtual office package to fit your unique business needs.
            </Text>

            <Text style={styles.heading}>Benefits of a Virtual Office:</Text>
            <Text style={styles.bodyText}>
                1. Our virtual office packages are ideal for freelancers, self-employed individuals, and 
                contractors looking for a practical and flexible approach to modern work.
            </Text>
            <Text style={styles.bodyText}>
                2. With a virtual office, you can maintain a professional image without the complications 
                and costs associated with traditional office rentals. Our services come with flexible rates 
                and agreements tailored to your business needs.
            </Text>
            <Text style={styles.bodyText}>
                3. You can collect your mail or have it forwarded to another address. Plus, you can rent 
                meeting rooms and facilities whenever you need to make a positive impression on clients.
            </Text>
            <Text style={styles.bodyText}>
                4. Contact us today to see how a Virtual Office can enhance your agribusiness!
            </Text>

            <Text style={styles.subHeading}>Business Address:</Text>
            <Text style={styles.bodyText}>
                Avoid using your home address for business correspondence. A professional business address 
                through  CULTIVATE PIE  provides you with a polished image without the high costs of a physical location.
            </Text>

            <Text style={styles.subHeading}>Personal Mailboxes:</Text>
            <Text style={styles.bodyText}>
                Access your mail with ease! Our personal mailbox options offer flexibility and independence, 
                ensuring you never miss important correspondence. We provide various rates and packages tailored 
                to your business needs.
            </Text>

            <Text style={styles.subHeading}>Meeting Rooms:</Text>
            <Text style={styles.bodyText}>
                Need a place to meet with your team or clients? We offer a variety of private meeting spaces 
                equipped for online meetings, including superfast WiFi, HD screens, and plenty of power outlets.
            </Text>

            <Text style={styles.bodyTextlast}>
                Looking for more information? Get in touch with Vie CULTIVATE today!
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingBottom: 30, // Adding bottom padding to ensure content is not cut off
    },
    heading: {
        fontSize: 20,
        ...typography.heading4,
        marginVertical: 8,
        textAlign: 'center', 
        alignSelf: 'center', 
    },
    headingtext: {
        ...typography.heading5,
        marginVertical: 8,
    },
    subHeading: {
        fontSize: 18,
        ...typography.heading5,
        marginTop: 12,
        marginBottom: 4,
    },
    bodyText: {
        fontSize: 16,
        marginBottom: 8,
        ...typography.body,
        lineHeight: 24,
    },
    bodyTextlast: {
        fontFamily: Fonts.Medium,
        fontSize: 17,
        marginBottom: 30, // Add margin to bottom for visibility
    },
    signupContainer: {
        top: 5, 
        marginBottom: 15,
    },
    signup: {
        fontFamily: Fonts.Medium,
        fontSize: 19,
        color: Colors.primary,
    },
});

export default OfficeSpace;
