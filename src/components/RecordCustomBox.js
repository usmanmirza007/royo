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

const RecordCustomBox = ({ data, onPress }) => {
    const renderData = ({ item }) => (
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => onPress(item)}
        >
            <Image 
                source={item.imageUrl} 
                style={styles.image} 
                resizeMode="contain" 
            />
            <ScrollView contentContainerStyle={styles.infoContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>Date: {item.date}</Text>
                <Text style={styles.subtitle}>Format: {item.format}</Text>
                <Text style={styles.description}>{item.description}</Text>
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
        width: getWidthPercentage(90), // Slightly increase width for better spacing
        minHeight: getHeightPercentage(25), // Adjust to fit more content
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginHorizontal: 10,
        elevation: 3,
        padding: 10,
        marginTop: 15,
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    infoContainer: {
        flexGrow: 1,
        alignItems: 'flex-start',
    },
    title: {
        ...typography.smallbody,
        fontFamily: Fonts.Bold,
        marginBottom: 5,
        textAlign: 'left',
        color:Colors.primary
    },
    subtitle: {
        ...typography.smallbody,
        fontFamily:Fonts.Bold,
        marginBottom: 3,
        textAlign: 'left',
        color:Colors.black
    },
    description: {
        marginTop: 5,
        textAlign: 'left',
        fontSize: 14,
        lineHeight: 20,
        ...typography.smallbody,
        fontFamily:Fonts.Regular
    },
    flatListContainer: {
        paddingBottom: 15,
        alignItems: 'center',
    },
});

export default RecordCustomBox;
