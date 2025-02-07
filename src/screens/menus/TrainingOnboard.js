import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import { typography } from '../../styles/TypoGraphy';

const TrainingOnboard = () => {
    const [expanded, setExpanded] = useState(null);

    const toggleExpand = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    const modules = [
        { title: 'MODULE 1: Volunteer Orientation at CULTIVATE Pie', content: 'This module introduces you to CULTIVATE Pie and your role as a volunteer.' },
        { title: 'MODULE 2: Mission, Vision, and Values at CULTIVATE Pie', content: 'In this module, you will receive a brief introduction to Vie CULTIVATE mission, vision, and values.' },
        { title: 'MODULE 3: CULTIVATE Pie  Today', content: 'This module provides an overview of the organizational structure of CULTIVATE Pie .' },
        { title: 'MODULE 4: Code of Ethics at CULTIVATE Pie ', content: 'The Code of Ethics is designed to help our volunteers maintain the highest quality and standards.' },
        { title: 'MODULE 5: Mentor Certification at CULTIVATE Pie ', content: 'This course enhances the skills of all volunteers and mentors.' },
        { title: 'MODULE 6: Introduction to Engage at CULTIVATE Pie ', content: 'This module helps you understand our agribusiness clients and track necessary information.' },
        { title: 'MODULE 7: Interview Training for Volunteers', content: 'Become familiar with the interview process for agribusiness entrepreneurs.' },
        { title: 'MODULE 8: Agribusiness Training for Volunteers', content: 'This module focuses on key aspects of agribusiness for our volunteers.' },
        { title: 'MODULE 9: Mentor Resources and Tool', content: 'Access valuable resources and tools to support your mentoring journey.' },
    ];

    return (
        <ScrollView style={styles.container}>
            {/* Header Image */}
            <Image
                source={{
                    uri: 'https://img.freepik.com/free-vector/employees-with-laptops-learning-professional-trainig_335657-3298.jpg',
                }}
                style={styles.image}
            />

            {/* Title Section */}
            <View style={styles.card}>
                <View style={styles.section}>
                    <Text style={styles.heading}>Training & Onboarding at CULTIVATE Pie </Text>
                    <Text style={styles.subtitle}>
                        CULTIVATE Pie 's Training is Comprehensive & Effective
                    </Text>
                    <Text style={styles.description}>
                        We offer an extensive onboarding and training program to get you started and support you throughout your journey as a volunteer.
                        Mentors are required to complete certification training, ensuring they are fully prepared to guide agribusiness entrepreneurs toward success.
                        Our ongoing training keeps you equipped with the latest resources and skills needed for impactful mentoring.
                        Start your journey with CULTIVATE Pie  and become a certified mentor today!
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading}>What to Expect When You Apply to Join CULTIVATE Pie </Text>
                    <Text style={styles.description}>
                        When you submit your application, a representative from CULTIVATE Pie will reach out to learn more about you and share details about our mentoring program.
                        Our goal is to ensure that this opportunity is a great fit for both you and CULTIVATE Pie .{'\n'}
                        <Text style={styles.heading}>
                            Here’s what to expect:{'\n'}{'\n'}
                        </Text>
                        A local representative from the closest CULTIVATE Pie  chapter will contact you via email to schedule a conversation.
                        During this discussion, they will answer any questions you have and provide additional information about the CULTIVATE Pie  volunteer experience.
                        They will help you decide which volunteer role aligns with your skills and interests.
                        Assist in determining whether or not to continue to the interview process.
                        If a good fit, guide you through the next steps in the training and onboarding process.{'\n'}

                        <Text style={styles.heading}>
                            At CULTIVATE Pie, we are:{'\n'}{'\n'}
                        </Text>
                        Value-oriented: We follow a values-based interview process, with two interviewers assessing all candidates.
                        Inclusive and welcoming of diverse perspectives.
                        Flexible and agile: We seek volunteers who are passionate about our mission.
                        Welcoming: Every new volunteer is matched with a coach who will guide you through the onboarding process.
                        Ready to make an impact? Apply today!
                    </Text>
                </View>
            </View>
            <View style={styles.card}>
                <View style={styles.section}>
                    <Text style={styles.heading}>The Onboarding Journey at CULTIVATE Pie </Text>
                    <Text style={styles.description}>
                        Once you’ve been accepted into CULTIVATE Pie, we’ll guide you through a structured onboarding process, featuring both self-paced and instructor-led training.
                        The onboarding can be completed in as little as 30 days or up to 90 days, depending on the time you can dedicate.
                        Throughout this journey, you’ll engage in various learning experiences to familiarize yourself with the organization and feel confident in your volunteer role.
                        Upon joining, you’ll receive a CULTIVATE Pie  email address and gain access to our training platform. Expect to complete 2-3 hours of online video training within the first two weeks,
                        depending on the role you’ve chosen.
                        Most of our training modules take just 7-8 minutes to complete, except for the comprehensive Mentor Certification Course, which includes 5 modules and takes about one hour to finish.
                        This thorough onboarding ensures you’re fully prepared to support and guide agribusiness entrepreneurs on their journey to success.
                    </Text>
                </View>

            </View>

            {/* Modules Section */}
            <View style={styles.card}>
            <View style={styles.section}>
                <Text style={styles.heading}>Training Modules</Text>
                {modules.map((module, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.moduleContainer}
                        onPress={() => toggleExpand(index)}
                    >
                        <Text style={styles.moduleTitle}>{module.title}</Text>
                        {expanded === index && <Text style={styles.moduleContent}>{module.content}</Text>}
                    </TouchableOpacity>
                ))}
            </View>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Thank you for considering to volunteer with CULTIVATE Pie !</Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        // marginTop: 20,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontFamily:Fonts.Bold,
        fontSize:16
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    section: {
        paddingVertical: 20,
    },
    heading: {
        fontSize: 16,
        ...typography.heading4,
        color: '#333',
        marginHorizontal: 20,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.primary,
        textAlign: 'center',
        marginVertical: 10,
        fontFamily: Fonts.Bold,
    },
    description: {
        fontSize: 14,
        color: '#666',
        ...typography.body,
        marginHorizontal: 20,

    },
    moduleContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 20,
        elevation: 2,
    },
    moduleTitle: {
        fontSize: 16,
        ...typography.heading6,
        color: Colors.primary,
    },
    moduleContent: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
        ...typography.smallbody
    },
});

export default TrainingOnboard;
