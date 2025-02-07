import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Animated } from 'react-native';
import Colors from '../../constants/Colors';
import { typography } from '../../styles/TypoGraphy';
import { Fonts } from '../../constants/Fonts';

const ToolsAndResources = () => {
    const blinkAnim = useRef(new Animated.Value(1)).current;

    // Blinking animation for the link
    useEffect(() => {
        const startBlinking = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(blinkAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(blinkAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        startBlinking();
    }, [blinkAnim]);

    const openWebsite = () => {
        Linking.openURL('https://cultivatepie.com/'); 
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>For tools and resources, please use the website.</Text>

            {/* Blinking website link */}
            <Animated.View style={[styles.linkContainer, { opacity: blinkAnim }]}>
                <TouchableOpacity onPress={openWebsite}>
                    <Text style={styles.linkText}>Visit Website</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20
    },
    headerText: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily:Fonts.Regular
    },
    linkContainer: {
        marginTop: 10,
    },
    linkText: {
        fontSize: 20,
        color: Colors.primary,
        textDecorationLine: 'underline',
        fontFamily:Fonts.Medium
    },
});

export default ToolsAndResources;
