import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import API_URL from '../../config/api';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Setup axios interceptor for 401 errors (only once on mount)
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle 401 Unauthorized errors globally
        if (error.response?.status === 401) {
          const token = localStorage.getItem('token');
          // Only logout if we have a token (avoid infinite loops)
          if (token) {
            localStorage.removeItem('token');
            setAuthToken(null);
            dispatch({ type: LOGOUT });
            
            // Redirect to login if not already there
            if (!window.location.pathname.includes('/login') && 
                !window.location.pathname.includes('/register')) {
              window.location.href = '/login';
            }
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []); // Empty dependency array - only set up once

  // Load user on mount if token exists
  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    } else {
      dispatch({ type: AUTH_ERROR });
    }
    // eslint-disable-next-line
  }, []); // Only run once on mount

  // Load User
  const loadUser = async () => {
    // Check for token and set headers
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      // No token, set authentication to false
      dispatch({ type: AUTH_ERROR });
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/auth/profile`);

      dispatch({
        type: USER_LOADED,
        payload: res.data.data
      });
    } catch (err) {
      // If 401, clear token and logout
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        setAuthToken(null);
        dispatch({ type: LOGOUT });
      } else {
        dispatch({ type: AUTH_ERROR });
      }
    }
  };

  // Register User
  const register = async formData => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, formData);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      // Set token in axios headers
      setAuthToken(res.data.token);
      
      loadUser();
    } catch (err) {
      let errorMessage = 'Registration failed';
      
      if (err.response) {
        // Server responded with error
        errorMessage = err.response.data?.error || err.response.data?.message || 'Registration failed';
      } else if (err.request) {
        // Request made but no response (network error)
        errorMessage = 'Unable to connect to server. Please check your internet connection.';
      } else {
        // Something else happened
        errorMessage = err.message || 'Registration failed';
      }
      
      dispatch({
        type: REGISTER_FAIL,
        payload: errorMessage
      });
    }
  };

  // Login User
  const login = async formData => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, formData);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      // Set token in axios headers
      setAuthToken(res.data.token);
      
      loadUser();
    } catch (err) {
      let errorMessage = 'Login failed';
      
      if (err.response) {
        // Server responded with error
        errorMessage = err.response.data?.error || err.response.data?.message || 'Login failed';
      } else if (err.request) {
        // Request made but no response (network error)
        errorMessage = 'Unable to connect to server. Please check your internet connection.';
      } else {
        // Something else happened
        errorMessage = err.message || 'Login failed';
      }
      
      dispatch({
        type: LOGIN_FAIL,
        payload: errorMessage
      });
    }
  };

  // Logout
  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Clear axios headers
    setAuthToken(null);
    // Dispatch logout action
    dispatch({ type: LOGOUT });
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;