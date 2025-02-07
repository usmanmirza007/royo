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
import {MentorValidation} from '../../utils/MentorValidation';
import CustomMultiDropdown from '../../components/CustomMultiDropdown';

const LANGUAGES = [
  {label: 'Tamil', value: 'Tamil'},
  {label: 'English', value: 'English'},
  {label: 'Malayalam', value: 'Malayalam'},
  {label: 'Telugu', value: 'Telugu'},
  {label: 'Hindi', value: 'Hindi'},
];

const GENDER = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
  {label: 'Others', value: 'Others'},
];

const CALLING = [
  {label: 'Yes', value: 'Yes'},
  {label: 'No', value: 'No'},
];

const MentorSignUp = () => {
  const [mentorName, setMentorName] = useState('');
  const [role, setRole] = useState('');
  const [gender, setGender] = useState('');
  const [specification, setSpecification] = useState('');
  const [experience, setExperience] = useState('');
  const [language, setLanguage] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState('');
  const [offerprice, setOfferPrice] = useState('');
  const [ordercount, setOrderCount] = useState('');
  const [freecalling, setFreecalling] = useState({value: '', id: ''});
  const [country, setCountry] = useState({value: '', id: ''});
  const [state, setState] = useState({value: '', id: ''});
  const [district, setDistrict] = useState({value: '', id: ''});
  const [city, setCity] = useState({value: '', id: ''});
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState(null);
  const [errors, setErrors] = useState({});
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, [countryList]);

  useEffect(() => {
    fetchMentorData();
  }, []);

  const fetchMentorData = async () => {
    try {
      const id = await AsyncStorage.getItem('_id');
      if (!id) {
        throw new Error('Consultant ID not found in AsyncStorage');
      }

      const response = await fetchData(`${getById}${id}`);
      // Set the state variables with the fetched data
      setMentorName(response.name || '');
      setRole(response.role || '');
      setGender(response.gender || '');
      setSpecification(response.specialization || '');
      setExperience(
        response.yearofexperience ? String(response.yearofexperience) : '',
      );
      // const languages = Array.isArray(response.languages) ? response.languages.join(', ') : '';
      // setLanguage(languages);
      const languages = Array.isArray(response.languages)
        ? response.languages
        : [];
      setLanguage(languages); // Set the languages state as an array
      setFreecalling(response.freecalling || '');
      setEmail(response.emailID || '');
      setPrice(response.price || '');
      setOfferPrice(response.offerprice || '');
      setOrderCount(response.ordercount || '');
      setPhoneNumber(response.phoneNumber ? String(response.phoneNumber) : '');
      setCountry({value: response.country || '', id: response.countryId || ''});
      setState({value: response.state || '', id: response.stateId || ''});
      setDistrict({
        value: response.district || '',
        id: response.districtId || '',
      });
      setCity({value: response.city || '', id: response.cityId || ''});

      setPincode(response.pincode || '');
      setAddress(response.address || '');
      setAbout(response.aboutyouself || '');
      setImageUri(response.image || null);
    } catch (error) {
      console.error('Failed to fetch trainer data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await fetchData(getallcountry);
      const countries = response.data.map(country => ({
        label: country.name || '',
        value: country.name || '',
        id: country.id || '',
      }));
      setCountryList(countries);

      // Set pre-filled country value if exists
      if (country.value) {
        const selectedCountry = countries.find(
          item => item.label === country.value,
        );
        if (selectedCountry) {
          setCountry(selectedCountry);
          fetchStatesByCountryId(selectedCountry.id); // Fetch states for the pre-filled country
        }
      }
    } catch (error) {
      console.error('Failed to fetch countries:', error.message);
    }
  };

  const fetchStatesByCountryId = async countryId => {
    try {
      const response = await fetchData(`${getByStateByCountryId}${countryId}`);
      const states = response.data.map(state => ({
        label: state.name || '',
        value: state.name || '',
        id: state.id || '',
      }));
      setStateList(states);

      // Set pre-filled state value if exists
      if (state.value) {
        const selectedState = states.find(item => item.label === state.value);
        if (selectedState) {
          setState(selectedState);
          fetchDistrictsByStateId(selectedState.id); // Fetch districts for the pre-filled state
        }
      }
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

      // Set pre-filled district value if exists
      if (district.value) {
        const selectedDistrict = districts.find(
          item => item.label === district.value,
        );
        if (selectedDistrict) {
          setDistrict(selectedDistrict);
          fetchCitiesByDistrictId(selectedDistrict.id); // Fetch cities for the pre-filled district
        }
      }
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
      }));
      setCityList(cities);

      // Set pre-filled city value if exists
      if (city.value) {
        const selectedCity = cities.find(item => item.label === city.value);
        if (selectedCity) {
          setCity(selectedCity);
        }
      }
    } catch (error) {
      console.error('Failed to fetch cities:', error.message);
    }
  };

  const handleImageUpload = url => {
    setImageUri(url);
  };

  const handleUpdate = async () => {
    const newErrors = MentorValidation({
      mentorName,
      role,
      gender,
      specification,
      experience,
      language,
      freecalling,
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

      let imageUrl = null;

      //Upload the image only if imageUri is set
      if (imageUri) {
        const formData = new FormData();
        formData.append('file', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'uploadedImage.jpg',
        });
        formData.append('upload_preset', 'darshan'); // replace with your Cloudinary upload preset

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dzblzw7ll/image/upload',
          {
            method: 'POST',
            body: formData,
          },
        );

        const cloudinaryData = await response.json();
        imageUrl = cloudinaryData.secure_url; // get the uploaded image URL
      }

      const updateDatas = {
        name: mentorName,
        role: role,
        gender: gender,
        specialization: specification,
        yearofexperience: experience,
        languages: language,
        phoneNumber: phoneNumber,
        emailID: email,
        price: price,
        ordercount: ordercount,
        offerprice: offerprice,
        freecalling: freecalling,
        country: country.value,
        state: state.value,
        district: district.value,
        city: city.value,
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
          label="Mentor Name"
          placeholder="Enter Name"
          value={mentorName}
          onChangeText={setMentorName}
          labelStyle={typography.heading5}
          error={errors.mentorName}
        />

        <CustomDropdown
          label="Gender"
          data={GENDER}
          placeholder="Select Gender"
          value={gender}
          onValueChange={setGender}
          labelStyle={typography.heading5}
          error={errors.gender}
        />
        <CustomTextInput
          label="Role"
          placeholder="Enter Role"
          value={role} // This binds the role state
          onChangeText={setRole} // This updates the role state as the user types
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

        <CustomMultiDropdown
          label="Languages"
          data={LANGUAGES}
          placeholder="Select Languages"
          selectedValues={language}
          onValueChange={setLanguage}
          icon="down"
        />
        <CustomDropdown
          label="Free Calling"
          data={CALLING}
          placeholder="Select Calling"
          value={freecalling}
          onValueChange={(value, index) => {
            setFreecalling(value);
          }}
          labelStyle={typography.heading5}
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
        <CustomTextInput
          label="Price"
          placeholder="Enter Price"
          value={price}
          onChangeText={setPrice}
          labelStyle={typography.heading5}
        />

        <CustomTextInput
          label="Offer Price"
          placeholder="Enter Offer Price"
          value={offerprice}
          onChangeText={setOfferPrice}
          labelStyle={typography.heading5}
        />

        <CustomTextInput
          label="Order Count"
          placeholder="Enter Order Count"
          value={ordercount}
          onChangeText={setOrderCount}
          labelStyle={typography.heading5}
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

export default MentorSignUp;

const styles = StyleSheet.create({
  ButtonContainer: {
    marginBottom: 10,
    padding: getResponsivePadding(20),
  },
});