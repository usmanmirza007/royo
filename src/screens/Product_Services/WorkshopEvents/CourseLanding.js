import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalStyles from '../../../styles/GlobalStyles'
import { typography } from '../../../styles/TypoGraphy'
import { Fonts } from '../../../constants/Fonts'
import Colors from '../../../constants/Colors'

const CourseLanding = ({ route }) => {
    const { items } = route.params
    console.log('items', items)
    return (
        <ScrollView style={globalStyles.container}>

            <Text style={styles.title}>{items.title}</Text>
            <Text style={styles.description}>{items.description}</Text>
            <Text style={styles.duration}>Duration :{items.duration}</Text>
            <Text style={styles.title}>By the end of this module, you will be able to:</Text>
            <Text style={styles.subtitle}>{items.point1}</Text>
            <Text style={styles.subtitle}>{items.point2}</Text>
            <Text style={styles.subtitle}>{items.point3}</Text>
            <Text style={styles.subtitle}>{items.point4}</Text>
            {items.point5 && <Text style={styles.subtitle}>{items.point5}</Text>}
            {items.point6 && <Text style={styles.subtitle}>{items.point6}</Text>}
            <Text style={styles.description}>Continue to the next module to deepen your financial literacy skills!</Text>

        </ScrollView>
    )
}

export default CourseLanding

const styles = StyleSheet.create({
    title: {
        ...typography.heading5,
        fontFamily: Fonts.Bold,
        marginBottom: 5,
        textAlign: 'left',
        color: Colors.primary
    },
    subtitle: {
        color: Colors.primary,
        backgroundColor: Colors.white,
        ...typography.heading5,
        fontFamily: Fonts.Regular,
        borderRadius: 5,
        marginBottom: 10,
        padding: 16
    },
    description: {
        marginTop: 5,
        textAlign: 'left',
        fontSize: 14,
        lineHeight: 20,
        ...typography.smallbody,
        fontFamily: Fonts.Regular
    },
    duration: {
        ...typography.smallbody,
        fontFamily: Fonts.Bold,
        marginBottom: 3,
        textAlign: 'left',
        color: Colors.black
    },
})