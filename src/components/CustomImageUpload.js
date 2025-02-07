// CustomImageUpload.js
import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  getHeightPercentage,
  getResponsivePadding,
  getWidthPercentage,
} from '../utils/Dimention';
import Colors from '../constants/Colors';
import globalStyles from '../styles/GlobalStyles';
import {typography} from '../styles/TypoGraphy';

const CustomImageUpload = ({currentImageUri, onImageUpload}) => {
  const [imageUri, setImageUri] = useState(currentImageUri);

  useEffect(() => {
    setImageUri(currentImageUri);
  }, [currentImageUri]);

  const uploadToCloudinary = async uri => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'image/jpeg',
      name: 'uploadedImage.jpg',
    });
    formData.append('upload_preset', 'darshan'); // Replace with your Cloudinary upload preset

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dzblzw7ll/image/upload',
        {
          method: 'POST',
          body: formData,
        },
      );
      const data = await response.json();
      console.log('data', data.secure_url);
      setImageUri(data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error('Cloudinary Upload Error:', error.message);
      return null;
    }
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);

        // Upload the image to Cloudinary and get the URL
        const imageUrl = await uploadToCloudinary(uri);

        // Pass the Cloudinary URL to the parent component
        if (imageUrl) {
          onImageUpload(imageUrl);
        }
      }
    });
  };

  return (
    <View style={[globalStyles, {alignItems: 'center'}]}>
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.profileImage} />
        ) : (
          <View style={styles.emptyImageBox}>
            <Text style={typography.body}>Upload Photo</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.editIconContainer}
          onPress={selectImage}>
          <Icon name="pencil" size={20} color={Colors.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: getWidthPercentage(36),
    height: getHeightPercentage(16.5),
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  emptyImageBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 60,
    borderWidth: 0.5,
    borderColor: Colors.black,
  },
  editIconContainer: {
    position: 'absolute',
    right: 3,
    bottom: 10,
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: getResponsivePadding(5),
    elevation: 3, // To give some shadow effect on Android
  },
});

export default CustomImageUpload;