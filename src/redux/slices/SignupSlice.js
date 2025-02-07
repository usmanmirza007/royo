import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import validateSignup from '../../utils/validateSignup';
import {baseUrl, login} from '../../constants/ApiEndPoints';

// Async Thunk for Signup API Call
export const signupUser = createAsyncThunk(
  'signup/signupUser',
  async (formData, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${baseUrl}${login}`, formData);
      const {userType} = response.data; // Make sure the API returns userType
      console.log("first",response)
      return {data: response?.data, userType};
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailID: '',
    password: '',
    confirmPassword: '',
    userType: '',
    errors: {},
    loading: false,
    success: false,
  },
  reducers: {
    updateField: (state, action) => {
      const {field, value} = action.payload;
      state[field] = value;
    },
    validateFields: state => {
      const errors = validateSignup(
        state.firstName,
        state.lastName,
        state.phoneNumber,
        state.emailID,
        state.password,
        state.confirmPassword,
        state.userType,
      );
      state.errors = errors;
      // return errors; // return errors for additional logic if needed
    },
    clearErrors: state => {
      state.errors = {};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signupUser.pending, state => {
        state.loading = true;
        state.errors = {};
      })
      .addCase(signupUser.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload || {api: 'Signup failed'};
      });
  },
});

export const {updateField, validateFields, clearErrors} = signupSlice.actions;
export default signupSlice.reducer;