// validation.js

export const SignupValidation = ({
  companyName,
  founderName,
  phoneNumber,
  email,
  noOfEmployee,
  website,
  country,
  state,
  district,
  city,
  pincode,
  address,
}) => {
  const newErrors = {};

  if (!companyName) newErrors.companyName = 'Company Name is required';
  if (!founderName) newErrors.founderName = 'Founder Name is required';
  if (!phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
  if (!email) newErrors.email = 'Email is required';
  if (!noOfEmployee) newErrors.noOfEmployee = 'No of Employees is required';
  if (!website) newErrors.website = 'Website Name is required';
  if (!country) newErrors.country = 'Country is required';
  if (!state) newErrors.state = 'State is required';
  if (!district) newErrors.district = 'District is required';
  if (!city) newErrors.city = 'City is required';
  if (!pincode) newErrors.pincode = 'Pincode is required';
  if (!address) newErrors.address = 'Address is required';

  return newErrors;
};