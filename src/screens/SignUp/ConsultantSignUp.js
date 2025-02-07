import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../styles/GlobalStyles';
import CustomImageUpload from '../../components/CustomImageUpload';
import CustomTextInput from '../../components/CustomTextInput';
import CustomDropdown from '../../components/CustomDropdown';
import CustomButton from '../../components/CustomButton';
import {getResponsivePadding} from '../../utils/Dimention';
import {fetchData, updateData} from '../../apiservice/ApiService';
import {getById, updateById} from '../../constants/ApiEndPoints';
import {typography} from '../../styles/TypoGraphy';
import {ConsultantValidation} from '../../utils/ConsultantValidation';

const LANGUAGES = [
  {label: 'English', value: 'English'},
  {label: 'Spanish', value: 'Spanish'},
  {label: 'French', value: 'French'},
  {label: 'German', value: 'German'},
];

const COUNTRIES = [
  {label: 'India', value: 'India'},
  {label: 'Oman', value: 'Oman'},
];

const STATES = [
  {label: 'Tamilnadu', value: 'Tamilnadu'},
  {label: 'Kerala', value: 'Kerala'},
];

const DISTRICTS = [
  {label: 'Coimbatore', value: 'Coimbatore'},
  {label: 'Chennai', value: 'Chennai'},
];

const CITIES = [
  {label: 'Pollachi', value: 'Pollachi'},
  {label: 'Tambaram', value: 'Tambaram'},
];

const ConsultantSignUp = () => {
  const [consultantName, setConsultantName] = useState('');
  const [role, setRole] = useState('');
  const [specification, setSpecification] = useState('');
  const [experience, setExperience] = useState('');
  const [language, setLanguage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState(null);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchConsultantData = async () => {
      try {
        const id = await AsyncStorage.getItem('_id');
        if (!id) {
          throw new Error('Consultant ID not found in AsyncStorage');
        }

        const response = await fetchData(`${getById}${id}`);
        console.log('response', response.languages);
        // Set the state variables with the fetched data
        setConsultantName(response.name || '');
        setRole(response.role || '');
        setSpecification(response.specialization || '');
        setExperience(
          response.yearofexperience ? String(response.yearofexperience) : '',
        );
        const languages = Array.isArray(response.languages)
          ? response.languages.join(', ')
          : '';
        setLanguage(languages);
        setEmail(response.emailID || '');
        setPhoneNumber(
          response.phoneNumber ? String(response.phoneNumber) : '',
        );
        setCountry(response.country || '');
        setState(response.state || '');
        setDistrict(response.district || '');
        setCity(response.city || '');
        setPincode(response.pincode || '');
        setAddress(response.address || '');
        setAbout(response.aboutyouself || '');
        setImageUri(response.image || null);
      } catch (error) {
        console.error('Failed to fetch consultant data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultantData();
  }, []);

  const handleImageUpload = url => {
    setImageUri(url);
  };

  const handleUpdate = async () => {
    const newErrors = ConsultantValidation({
      consultantName,
      role,
      specification,
      experience,
      language,
      phoneNumber,
      email,
      country,
      state,
      district,
      city,
      pincode,
      address,
      about,
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log('Validation Failed', 'Please fill all the required fields.');
      return;
    }

    try {
      setLoading(true);
      const id = await AsyncStorage.getItem('_id');
      if (!id) {
        throw new Error('Consultant ID not found in AsyncStorage');
      }

      const updateDatas = {
        name: consultantName,
        role: role,
        specialization: specification,
        yearofexperience: experience,
        languages: language,
        phoneNumber: phoneNumber,
        emailID: email,
        country: country,
        state: state,
        district: district,
        city: city,
        pincode: pincode,
        address: address,
        aboutyouself: about,
        image: imageUri, // Use the uploaded image URL
        auth: 'success',
      };

      const updateResponse = await updateData(
        `${updateById}${id}`,
        updateDatas,
      );
      console.log('Update response:', updateResponse.data.auth);
      await AsyncStorage.setItem('auth', updateResponse.data.auth);
    } catch (error) {
      console.error('Failed to update consultant data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <Text style={typography.heading5}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <CustomImageUpload
          currentImageUri={imageUri}
          onImageUpload={handleImageUpload}
        />
        <CustomTextInput
          label="Consultant Name"
          placeholder="Enter Name"
          value={consultantName}
          onChangeText={setConsultantName}
          labelStyle={typography.heading5}
          error={errors.consultantName}
        />
        <CustomTextInput
          label="Role"
          placeholder="Enter Role"
          value={role}
          onChangeText={setRole}
          labelStyle={typography.heading5}
          error={errors.role}
        />
        <CustomTextInput
          label="Specification"
          placeholder="Enter Specification"
          value={specification}
          onChangeText={setSpecification}
          labelStyle={typography.heading5}
          error={errors.specification}
        />
        <CustomTextInput
          label="Experience"
          placeholder="Enter Experience"
          value={experience}
          onChangeText={setExperience}
          keyboardType="numeric"
          labelStyle={typography.heading5}
          error={errors.experience}
        />
        <CustomDropdown
          label="Language"
          data={LANGUAGES}
          placeholder="Select Language"
          value={language}
          onValueChange={setLanguage}
          labelStyle={typography.heading5}
          error={errors.language}
        />
        <CustomTextInput
          label="Phone Number"
          placeholder="Enter Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
          labelStyle={typography.heading5}
          error={errors.phoneNumber}
        />
        <CustomTextInput
          label="Email Id"
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          labelStyle={typography.heading5}
          error={errors.email}
        />
        <CustomDropdown
          label="Country"
          data={COUNTRIES}
          placeholder="Select Country"
          value={country}
          onValueChange={setCountry}
          labelStyle={typography.heading5}
          error={errors.country}
        />
        <CustomDropdown
          label="State"
          data={STATES}
          placeholder="Select State"
          value={state}
          onValueChange={setState}
          labelStyle={typography.heading5}
          error={errors.state}
        />
        <CustomDropdown
          label="District"
          data={DISTRICTS}
          placeholder="Select District"
          value={district}
          onValueChange={setDistrict}
          labelStyle={typography.heading5}
          error={errors.district}
        />
        <CustomDropdown
          label="City"
          data={CITIES}
          placeholder="Select City"
          value={city}
          onValueChange={setCity}
          labelStyle={typography.heading5}
          error={errors.city}
        />
        <CustomTextInput
          label="Pincode"
          placeholder="Enter Pincode"
          value={pincode}
          onChangeText={setPincode}
          keyboardType="numeric"
          labelStyle={typography.heading5}
          error={errors.pincode}
        />
        <CustomTextInput
          label="Address"
          placeholder="Enter Address"
          value={address}
          onChangeText={setAddress}
          labelStyle={typography.heading5}
          error={errors.address}
        />
        <CustomTextInput
          label="About yourself"
          placeholder="Enter About Yourself"
          value={about}
          onChangeText={setAbout}
          labelStyle={typography.heading5}
          error={errors.about}
        />
      </View>
      <View style={styles.ButtonContainer}>
        <CustomButton title="Submit" onPress={handleUpdate} />
      </View>
    </ScrollView>
  );
};

export default ConsultantSignUp;

const styles = StyleSheet.create({
  ButtonContainer: {
    marginBottom: 10,
    padding: getResponsivePadding(20),
  },
});