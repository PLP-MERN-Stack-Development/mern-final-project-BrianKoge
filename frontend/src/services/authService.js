import axios from 'axios';
import API_URL from '../config/api';

const AUTH_API_URL = `${API_URL}/api/auth`;

// Register user
const register = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: error.message || 'Registration failed' };
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: error.message || 'Login failed' };
  }
};

// Get user profile
const getProfile = async () => {
  try {
    const response = await axios.get(`${AUTH_API_URL}/profile`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: error.message || 'Failed to get profile' };
  }
};

// Update user profile
const updateProfile = async (userData) => {
  try {
    const response = await axios.put(`${AUTH_API_URL}/profile`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: error.message || 'Failed to update profile' };
  }
};

const authService = {
  register,
  login,
  getProfile,
  updateProfile
};

export default authService;