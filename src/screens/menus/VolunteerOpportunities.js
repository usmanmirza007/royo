
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import Colors from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import { typography } from '../../styles/TypoGraphy';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icon from MaterialCommunityIcons

const VolunteerOpportunities = () => {
    const [flipAnim1] = useState(new Animated.Value(0));
    const [flipAnim2] = useState(new Animated.Value(0));
    const [flipAnim3] = useState(new Animated.Value(0));
    const [flipAnim4] = useState(new Animated.Value(0));

    const [isFlipped1, setIsFlipped1] = useState(false);
    const [isFlipped2, setIsFlipped2] = useState(false);
    const [isFlipped3, setIsFlipped3] = useState(false);
    const [isFlipped4, setIsFlipped4] = useState(false);

    const flipCard = (flipAnim, isFlipped, setIsFlipped) => {
        Animated.timing(flipAnim, {
            toValue: isFlipped ? 0 : 1,
            duration: 800,
            useNativeDriver: true,
        }).start(() => {
            setIsFlipped(!isFlipped);
        });
    };

    const frontInterpolate = (flipAnim) => {
        return flipAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
        });
    };

    const backInterpolate = (flipAnim) => {
        return flipAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['180deg', '360deg'],
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: 'https://img.freepik.com/free-photo/helping-hands-volunteer-support-community-service-graphic_53876-64955.jpg?t=st=1729501185~exp=1729504785~hmac=75bb47136734a1e52049125a488dcf2ce1f3739ba080a22014a83eb591a4eeb8&w=996' }}
                style={styles.image}
            />

            <View style={styles.section}>
                <Text style={styles.heading}>Help People Live Their Dreams with CULTIVATE PIE</Text>
                <Text style={styles.description}>
                    At CULTIVATE PIE, our volunteers are successful business owners, executives, and experts
                    with real-world experience in agribusiness and food sectors. Each of them knows the
                    incredible feeling of helping others achieve their dreams. By offering their guidance
                    and expertise, they help entrepreneurs navigate the path to success and innovation in agritech.
                </Text>
            </View>

            <View style={styles.cardContainer}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => flipCard(flipAnim1, isFlipped1, setIsFlipped1)}>
                        <View>
                            <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate(flipAnim1) }] }]}>
                                <Icon name="account-tie" size={50} marginBottom={20} color="#fff" />
                                <Text style={styles.cardText}>MENTOR</Text>
                            </Animated.View>
                            <Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateY: backInterpolate(flipAnim1) }] }]}>
                                <Text style={styles.cardDetailText}>Mentors are trained and proficient in guiding our diverse client base on business basics. They are given the training and resources to mentor any client, including existing businesses and start-ups.</Text>
                            </Animated.View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => flipCard(flipAnim2, isFlipped2, setIsFlipped2)}>
                        <View>
                            <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate(flipAnim2) }] }]}>
                                <Icon name="book-open-page-variant" size={50} marginBottom={20} color="#fff" />
                                <Text style={styles.cardText}>SUBJECT MATTER EXPERT</Text>
                            </Animated.View>
                            <Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateY: backInterpolate(flipAnim2) }] }]}>
                                <Text style={styles.cardDetailText}>Subject Matter Experts (SMEs) provide specialized knowledge in areas such as finance, marketing, and technology. Help entrepreneurs solve specific problems within your field of expertise.</Text>
                            </Animated.View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity onPress={() => flipCard(flipAnim3, isFlipped3, setIsFlipped3)}>
                        <View>
                            <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate(flipAnim3) }] }]}>
                                <Icon name="hand-heart" size={50} marginBottom={20} color="#fff" />
                                <Text style={styles.cardText}>VOLUNTEER</Text>
                            </Animated.View>
                            <Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateY: backInterpolate(flipAnim3) }] }]}>
                                <Text style={styles.cardDetailText}>Volunteers assist in a variety of ways, from event organization to community outreach, helping support the infrastructure needed to help entrepreneurs succeed.</Text>
                            </Animated.View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => flipCard(flipAnim4, isFlipped4, setIsFlipped4)}>
                        <View>
                            <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate(flipAnim4) }] }]}>
                                <Icon name="cash-multiple" size={50} marginBottom={20} color="#fff" />
                                <Text style={styles.cardText}>WORKSHOP PRESENTER</Text>
                            </Animated.View>
                            <Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateY: backInterpolate(flipAnim4) }] }]}>
                                <Text style={styles.cardDetailText}>Workshop Presenters lead educational sessions on topics related to business development, innovation, and best practices, offering hands-on learning opportunities to entrepreneurs.</Text>
                            </Animated.View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Join Us and Help Shape the Future of Agribusiness!</Text>
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
        fontFamily: Fonts.Bold,
        fontSize: 16,
    },
    section: {
        paddingVertical: 20,
    },
    cardContainer: {
        marginHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        flex: 1,
        height: 200,
        width: 150,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backfaceVisibility: 'hidden',
        
        // elevation: 5,
    },
    cardBack: {
        position: 'absolute',
        top: 0,
        backfaceVisibility: 'hidden',
    },
    cardText: {
        color: '#fff',
        fontFamily: Fonts.Bold,
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    cardDetailText: {
        color: '#fff',
        fontFamily: Fonts.Regular,
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
});

export default VolunteerOpportunities;


