import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import { typography } from '../../styles/TypoGraphy';

const BecomeMentor = () => {
    return (
        <ScrollView style={styles.container}>
            {/* Top Image from a URL */}
            <Image
                source={{ uri: 'https://img.freepik.com/free-vector/internship-job-training-illustration_23-2148751280.jpg?t=st=1729508470~exp=1729512070~hmac=dac9651f39b66e5ed916f0669760154e5a64e7306f4f4194c89060ecd95c92a1&w=826'}} // Replace with your image URL
                style={styles.image}
            />

            {/* Help People Live Their Dreams Section */}
            <View style={styles.section}>
                <Text style={styles.heading}>Mentor at CULTIVATE PIE</Text>
                <Text style={styles.description}>
                As a mentor at  CULTIVATE PIE, you'll be trained and equipped to guide our diverse group of agribusiness clients through essential business fundamentals. Whether working with startups or established businesses, mentors receive comprehensive resources and training to support every client's journey.
                </Text>
            </View> 

            {/* Make a Meaningful Impact Section */}
            <View style={styles.section}>
                <Text style={styles.heading}>Make a Lasting Impact</Text>
                <Text style={styles.description}>
                Your role will involve assessing business needs, providing tailored guidance, and connecting clients to subject matter experts, templates, tools, and community resources to drive their success. Learn more about becoming a mentor and shaping the future of agribusiness.
                </Text>
            </View>

            {/* Button */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Become a Mentor Today !</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    heading: {
        fontSize: 16,
        ...typography.heading4,
        color: '#333',
        margin: 20,
    },
    description: {
        fontSize: 14,
        color: '#666',
        ...typography.body,
        marginHorizontal: 20,
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20,
        marginBottom: 40,
    },
    buttonText: {
        color: '#fff',
        fontFamily:Fonts.Bold,
        fontSize:16
    },
    section: {
        paddingVertical: 20,
    }
});

export default BecomeMentor;