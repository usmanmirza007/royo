// validation.js

export const ConsultantValidation = ({
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
}) => {
  const newErrors = {};

  if (!consultantName) newErrors.consultantName = 'consultantName is required';
  if (!role) newErrors.role = 'role is required';
  if (!specification) newErrors.specification = 'specification is required';
  if (!experience) newErrors.experience = 'experience is required';
  if (!language) newErrors.language = 'language is required';
  if (!phoneNumber) newErrors.phoneNumber = 'phoneNumber is required';
  if (!email) newErrors.email = 'email is required';
  if (!country) newErrors.country = 'Country is required';
  if (!state) newErrors.state = 'State is required';
  if (!district) newErrors.district = 'District is required';
  if (!city) newErrors.city = 'City is required';
  if (!pincode) newErrors.pincode = 'Pincode is required';
  if (!address) newErrors.address = 'Address is required';
  if (!about) newErrors.about = 'about is required';

  return newErrors;
};