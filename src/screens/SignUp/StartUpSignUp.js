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
import {
  getallcountry,
  getByCityByDistrictId,
  getByDistrictByStateId,
  getById,
  getByStateByCountryId,
  updateById,
  updateTrainerById,
} from '../../constants/ApiEndPoints';
import {typography} from '../../styles/TypoGraphy';
import {SignupValidation} from '../../utils/SignupValidation';

const StartUpSignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [founderName, setFounderName] = useState('');
  const [noOfEmployee, setNoOfEmployee] = useState('');
  const [website, setWebsite] = useState('');
  const [country, setCountry] = useState({value: '', id: ''});
  const [state, setState] = useState({value: '', id: ''});
  const [district, setDistrict] = useState({value: '', id: ''});
  const [city, setCity] = useState({value: '', id: ''});
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState(null);
  const [errors, setErrors] = useState({});
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    // Fetch trainer data on component mount
    fetchTrainerData();
    // Fetch country data on component mount
    fetchCountries();
  }, []);

  const fetchTrainerData = async () => {
    try {
      const id = await AsyncStorage.getItem('_id');

      if (!id) {
        throw new Error('Trainer ID not found in AsyncStorage');
      }

      const response = await fetchData(`${getById}${id}`);

      // Set the state variables with the fetched data
      setEmail(response.emailID || '');
      setPhoneNumber(response.phoneNumber ? String(response.phoneNumber) : '');
      setCompanyName(response.name || '');
      setFounderName(response.founderName || '');
      setNoOfEmployee(
        response.noofemployee ? String(response.noofemployee) : '',
      );
      setWebsite(response.website || '');
      setCountry({value: response.country || ''});
      setState({value: response.state || ''});
      setDistrict({value: response.district || ''});
      setCity({value: response.city || ''});
      setPincode(response.pincode || '');
      setAddress(response.address || '');
      setImageUri(response.image || null);
    } catch (error) {
      console.error('Failed to fetch trainer data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await fetchData(getallcountry); // Use your endpoint here

      const countries = response.data.map(country => ({
        label: country.name || '',
        value: country.name || '',
        id: country.id || '',
      }));
      setCountryList(countries); // Update countryList state
    } catch (error) {
      console.error('Failed to fetch countries:', error.message);
    }
  };

  const fetchStatesByCountryId = async countryId => {
    try {
      const response = await fetchData(`${getByStateByCountryId}${countryId}`); // Use your endpoint for fetching states by country ID
      const states = response.data.map(state => ({
        label: state.name || '',
        value: state.name || '',
        id: state.id || '', // Use the appropriate field for state ID
      }));
      setStateList(states); // Update state list
    } catch (error) {
      console.error('Failed to fetch states:', error.message);
    }
  };

  const fetchDistrictsByStateId = async stateId => {
    try {
      const response = await fetchData(`${getByDistrictByStateId}${stateId}`);
      const districts = response.data.map(district => ({
        label: district.name || '',
        value: district.name || '',
        id: district.id || '',
      }));
      setDistrictList(districts);
    } catch (error) {
      console.error('Failed to fetch districts:', error.message);
    }
  };

  const fetchCitiesByDistrictId = async districtId => {
    try {
      const response = await fetchData(`${getByCityByDistrictId}${districtId}`);

      const cities = response.data.map(city => ({
        label: city.cityName || '',
        value: city.cityName || '',
        // id: city.id || '',
      }));
      setCityList(cities);
    } catch (error) {
      console.error('Failed to fetch cities:', error.message);
    }
  };

  const handleImageUpload = url => {
    setImageUri(url);
  };
  const handleUpdate = async () => {
    const newErrors = SignupValidation({
      companyName,
      founderName,
      phoneNumber,
      website,
      email,
      noOfEmployee,
      country,
      state,
      district,
      city,
      pincode,
      address,
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
        throw new Error('Trainer ID not found in AsyncStorage');
      }

      // let imageUrl = null;

      // Upload the image only if imageUri is set
      // if (imageUri) {
      //   const formData = new FormData();
      //   formData.append('file', {
      //     uri: imageUri,
      //     type: 'image/jpeg',
      //     name: 'uploadedImage.jpg',
      //   });
      //   formData.append('upload_preset', 'darshan'); // replace with your Cloudinary upload preset

      //   const response = await fetch(
      //     'https://api.cloudinary.com/v1_1/dzblzw7ll/image/upload',
      //     {
      //       method: 'POST',
      //       body: formData,
      //     },
      //   );

      //   const cloudinaryData = await response.json();
      //   imageUrl = cloudinaryData.secure_url; // get the uploaded image URL
      // }

      const updateDatas = {
        phone: phoneNumber,
        email: email,
        name: companyName,
        founderName: founderName,
        noofemployee: noOfEmployee,
        website: website,
        country: country.value,
        state: state.value,
        district: district.value,
        city: city.value,
        pincode: pincode,
        address: address,
        image: imageUri, // Use the uploaded image URL
        auth: 'success',
      };

      const updateResponse = await updateData(
        `${updateById}${id}`,
        updateDatas,
      );

      await AsyncStorage.setItem('auth', updateResponse.data.auth);
      navigation.navigate('StartUp');
    } catch (error) {
      console.log('Failed to update trainer data:', error.message);
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
          label="Company Name"
          placeholder="Enter Name"
          value={companyName}
          onChangeText={setCompanyName}
          labelStyle={typography.heading5}
          error={errors.companyName}
        />
        <CustomTextInput
          label="Founder Name"
          placeholder="Enter Name"
          value={founderName}
          onChangeText={setFounderName}
          labelStyle={typography.heading5}
          error={errors.founderName}
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
          label="No Of Employee"
          placeholder="Enter Employee"
          value={noOfEmployee}
          onChangeText={setNoOfEmployee}
          keyboardType="numeric"
          labelStyle={typography.heading5}
          error={errors.noOfEmployee}
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
        <CustomTextInput
          label="Website"
          placeholder="Enter Website"
          value={website}
          onChangeText={setWebsite}
          labelStyle={typography.heading5}
          error={errors.website}
        />
        <CustomDropdown
          label="Country"
          data={countryList}
          placeholder="Select Country"
          value={country.value}
          onValueChange={(value, index) => {
            setCountry({value: value.label, id: value.id});
            fetchStatesByCountryId(value.id);
          }}
          search={true}
          labelStyle={typography.heading5}
          error={errors.country}
        />
        <CustomDropdown
          label="State"
          data={stateList}
          placeholder="Select State"
          value={state.value}
          onValueChange={(value, index) => {
            setState({value: value.label, id: value.id});
            fetchDistrictsByStateId(value.id);
          }}
          search={true}
          labelStyle={typography.heading5}
          error={errors.state}
        />
        <CustomDropdown
          label="District"
          data={districtList}
          placeholder="Select District"
          value={district.value}
          onValueChange={(value, index) => {
            setDistrict({value: value.label, id: value.id});
            fetchCitiesByDistrictId(value.id);
          }}
          search={true}
          labelStyle={typography.heading5}
          error={errors.district}
        />
        <CustomDropdown
          label="City"
          data={cityList}
          placeholder="Select City"
          value={city.value}
          onValueChange={(value, index) => {
            setCity({value: value.label, id: value.id});
          }}
          search={true}
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
      </View>
      <View style={styles.ButtonContainer}>
        <CustomButton title="Submit" onPress={handleUpdate} />
      </View>
    </ScrollView>
  );
};

export default StartUpSignUp;

const styles = StyleSheet.create({
  ButtonContainer: {
    marginBottom: 10,
    padding: getResponsivePadding(20),
  },
});