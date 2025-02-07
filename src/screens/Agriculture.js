import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CustomBootstrap from '../components/CustomBootstrap';
import { getAllCustomers } from '../apiservice/ApiService';
import { baseUrl, bootstrapCategory } from '../constants/ApiEndPoints';

const Agriculture = ({ navigation }) => {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await getAllCustomers(`${baseUrl}${bootstrapCategory}`);
                const filteredResponse = response.filter((d) => d.category === 'Agriculture');
                setCategory(filteredResponse || [])
            } catch (error) {
                console.log('Error:', error)
            }
        }
        getCategory();
    }, []);


    const handleUserPress = (item) => {
        navigation.navigate('Landing', { data: item });
    };

    return (
        <FlatList
            data={category}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <CustomBootstrap item={item} onPress={handleUserPress} />
            )}
        />
    );
};


const styles = StyleSheet.create({
    container: {
        // padding: 16,
        marginTop: 20
    },
});

export default Agriculture;