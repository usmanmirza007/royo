import axios from 'axios';
import {baseUrl} from '../constants/ApiEndPoints';

// Set your API base URL

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000, // Timeout after 10 seconds
});

export const getAllCustomers = async endpoint => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);

    throw error; // Re-throw the error so components can handle it
  }
};

export const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await axiosInstance.get(endpoint, {params});
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);

    throw error; // Re-throw the error so components can handle it
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);

    throw error; // Re-throw the error so components can handle it
  }
};

export const updateData = async (endpoint, data) => {
  try {
    const response = await axiosInstance.put(endpoint, data);

    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);

    throw error;
  }
};

export const deleteData = async (endpoint, params) => {
  try {
    const response = await axiosInstance.delete(endpoint, {params});

    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);

    throw error;
  }
};