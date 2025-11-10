import { userServiceClient } from './config';

/**
 * User Service
 * Handles user-related API operations
 */

/**
 * Get all users
 * @returns {Promise<Array>}
 */
export const getAllUsers = async () => {
  try {
    const response = await userServiceClient.get('/users');
    return response.data;
  } catch (error) {
    console.error('Get all users error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener usuarios' };
  }
};

/**
 * Get user by ID
 * @param {number} id - User ID
 * @returns {Promise<Object>}
 */
export const getUserById = async (id) => {
  try {
    const response = await userServiceClient.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Get user by ID error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener usuario' };
  }
};

/**
 * Get user by email
 * @param {string} email - User email
 * @returns {Promise<Object>}
 */
export const getUserByEmail = async (email) => {
  try {
    const response = await userServiceClient.get(`/users/email/${email}`);
    return response.data;
  } catch (error) {
    console.error('Get user by email error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener usuario por email' };
  }
};

/**
 * Get users by role
 * @param {string} role - User role (CLIENT, VET, ADMIN)
 * @returns {Promise<Array>}
 */
export const getUsersByRole = async (role) => {
  try {
    const response = await userServiceClient.get(`/users/role/${role}`);
    return response.data;
  } catch (error) {
    console.error('Get users by role error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener usuarios por rol' };
  }
};

/**
 * Update user
 * @param {number} id - User ID
 * @param {Object} updateData - Data to update
 * @param {string} updateData.name - Full name (optional)
 * @param {string} updateData.email - Email (optional)
 * @param {string} updateData.phone - Phone (optional)
 * @param {string} updateData.address - Address (optional)
 * @param {string} updateData.password - New password (optional)
 * @returns {Promise<Object>}
 */
export const updateUser = async (id, updateData) => {
  try {
    const response = await userServiceClient.put(`/users/${id}`, updateData);

    // Update localStorage if updating current user
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (currentUser.id === id) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error('Update user error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al actualizar usuario' };
  }
};

/**
 * Delete user
 * @param {number} id - User ID
 * @returns {Promise<void>}
 */
export const deleteUser = async (id) => {
  try {
    await userServiceClient.delete(`/users/${id}`);
  } catch (error) {
    console.error('Delete user error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al eliminar usuario' };
  }
};

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUsersByRole,
  updateUser,
  deleteUser,
};
