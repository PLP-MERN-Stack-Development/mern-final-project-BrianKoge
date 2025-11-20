import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/auth`;

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// Get user profile
const getProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`);
  return response.data;
};

// Update user profile
const updateProfile = async (userData) => {
  const response = await axios.put(`${API_URL}/profile`, userData);
  return response.data;
};

const authService = {
  register,
  login,
  getProfile,
  updateProfile
};

export default authService;