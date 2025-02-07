import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './slices/LoginSlice'; // Correct reducer import
import signupReducer from './slices/SignupSlice';

const store = configureStore({
  reducer: {
    login: loginReducer, // Correct reducer reference
    signup: signupReducer,
  },
});

export default store;