import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from 'react-native';
import { getWidthPercentage, getHeightPercentage } from '../utils/Dimention';
import Colors from '../constants/Colors';
import { typography } from '../styles/TypoGraphy';
import { Fonts } from '../constants/Fonts';
import CustomButton from './CustomButton';

const CourseCustomBox = ({ data, onPress }) => {
    const renderData = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
           
        >
            <ScrollView contentContainerStyle={styles.infoContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.duration}>Duration: {item.duration}</Text>
                <CustomButton title='Take the Course' style={styles.button}  onPress={() => onPress(item)} />
            </ScrollView>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={renderData}
            numColumns={1}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContainer}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        width: getWidthPercentage(90), 
        minHeight: getHeightPercentage(25), 
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginHorizontal: 10,
        elevation: 3,
        padding: 10,
        marginTop: 15,
    },
    button:{
        alignSelf:'center',
        marginTop:20
    },

    infoContainer: {
        flexGrow: 1,
        alignItems: 'flex-start',
    },
    title: {
        ...typography.smallbody,
        fontFamily: Fonts.Bold,
        marginBottom: 5,
        alignSelf:'center',
        color: Colors.primary,
        
    },
    duration: {
        ...typography.smallbody,
        fontFamily: Fonts.Bold,
        marginBottom: 3,
        textAlign: 'left',
        color: Colors.black
    },

    description: {
        marginTop: 5,
        textAlign: 'left',
        fontSize: 14,
        lineHeight: 20,
        ...typography.smallbody,
        fontFamily: Fonts.Regular
    },
    flatListContainer: {
        paddingBottom: 15,
        alignItems: 'center',
    },
});

export default CourseCustomBox;
