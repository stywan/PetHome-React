import { authServiceClient } from './config';

/**
 * Authentication Service
 * Handles login, register, and token management
 */

/**
 * Login with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{token: string, user: Object}>}
 */
export const login = async (email, password) => {
  try {
    const response = await authServiceClient.post('/auth/login', {
      email,
      password,
    });

    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al iniciar sesión' };
  }
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.name - Full name
 * @param {string} userData.email - Email address
 * @param {string} userData.password - Password
 * @param {string} userData.phone - Phone number
 * @param {string} userData.role - User role (CLIENT, VET, ADMIN)
 * @param {string} userData.photo - User photo (optional)
 * @returns {Promise<Object>}
 */
export const register = async (userData) => {
  try {
    const response = await authServiceClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Register error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al registrar usuario' };
  }
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

/**
 * Get current user from localStorage
 * @returns {Object|null}
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Get auth token
 * @returns {string|null}
 */
export const getToken = () => {
  return localStorage.getItem('authToken');
};

export default {
  login,
  register,
  logout,
  isAuthenticated,
  getCurrentUser,
  getToken,
};
