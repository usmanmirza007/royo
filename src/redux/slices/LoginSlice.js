import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import validateLogin from '../../utils/validation';
import {baseUrl, signup} from '../../constants/ApiEndPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import the validation function

// Async Thunk for Login API Call
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (formData, {rejectWithValue}) => {
    try {
      
      const response = await axios.post(`${baseUrl}${signup}`, formData);
      
      const {userType} = response.data.data; // Make sure the API returns userType
      return {data: response.data, userType};
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    email: '',
    password: '',
    userType: null,
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
      const errors = validateLogin(state.email, state.password);
      state.errors = errors;

      // return errors; // return the errors object for further handling if needed
    },
    clearErrors: state => {
      state.errors = {};
    },
    logout: state => {
      state.password = '';
      state.email = '';
      state.success = false;
      state.errors = {};
      state.userType = null; // Clear any user-specific data
      AsyncStorage.removeItem('userType');
      AsyncStorage.removeItem('_id');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.errors = {};
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userType = action.payload.userType;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload || {api: 'Login failed'};
      });
  },
});

export const {updateField, validateFields, clearErrors, logout} =
  loginSlice.actions;
export default loginSlice.reducer;