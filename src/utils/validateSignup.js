const validateSignup = (
  firstName,
  lastName,
  phoneNumber,
  emailID,
  password,
  confirmPassword,
  userType,
) => {

  const errors = {};

  // First Name Validation
  if (!firstName) {
    errors.firstName = 'First name is required';
  }

  // Last Name Validation
  if (!lastName) {
    errors.lastName = 'Last name is required';
  }

  // Phone Number Validation
  if (!phoneNumber) {
    errors.phoneNumber = 'Phone number is required';
  } else if (!/^\d{10}$/.test(phoneNumber)) {
    errors.phoneNumber = 'Phone number must be 10 digits';
  }

  // Email Validation
  if (!emailID) {
    errors.emailID = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(emailID)) {
    errors.emailID = 'Email format is invalid';
  }

  // Password Validation
  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  // Confirm Password Validation
  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm password is required';
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!userType) {
    errors.userType = 'Login Type is required';
  }

  return errors;
};

export default validateSignup;