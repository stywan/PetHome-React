import { vetServiceClient } from './config';

/**
 * Veterinarian Service
 * Handles veterinarian-related API operations
 */

/**
 * Create a new veterinarian
 * @param {Object} vetData - Veterinarian data
 * @param {number} vetData.userId - User ID
 * @param {string} vetData.specialty - Specialty
 * @param {string} vetData.licenseNumber - License number
 * @param {number} vetData.yearsOfExperience - Years of experience
 * @param {boolean} vetData.available - Availability status
 * @param {number} vetData.rating - Rating (optional)
 * @returns {Promise<Object>}
 */
export const createVeterinarian = async (vetData) => {
  try {
    const response = await vetServiceClient.post('/veterinarians', vetData);
    return response.data;
  } catch (error) {
    console.error('Create veterinarian error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al crear veterinario' };
  }
};

/**
 * Get all veterinarians
 * @returns {Promise<Array>}
 */
export const getAllVeterinarians = async () => {
  try {
    const response = await vetServiceClient.get('/veterinarians');
    return response.data;
  } catch (error) {
    console.error('Get all veterinarians error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener veterinarios' };
  }
};

/**
 * Get veterinarian by ID
 * @param {number} id - Veterinarian ID
 * @returns {Promise<Object>}
 */
export const getVeterinarianById = async (id) => {
  try {
    const response = await vetServiceClient.get(`/veterinarians/${id}`);
    return response.data;
  } catch (error) {
    console.error('Get veterinarian by ID error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener veterinario' };
  }
};

/**
 * Get veterinarian by user ID
 * @param {number} userId - User ID
 * @returns {Promise<Object>}
 */
export const getVeterinarianByUserId = async (userId) => {
  try {
    const response = await vetServiceClient.get(`/veterinarians/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Get veterinarian by user ID error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener veterinario por usuario' };
  }
};

/**
 * Get available veterinarians
 * @returns {Promise<Array>}
 */
export const getAvailableVeterinarians = async () => {
  try {
    const response = await vetServiceClient.get('/veterinarians/available');
    return response.data;
  } catch (error) {
    console.error('Get available veterinarians error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener veterinarios disponibles' };
  }
};

/**
 * Search veterinarians with criteria
 * @param {Object} searchCriteria - Search criteria
 * @param {string} searchCriteria.specialty - Specialty (optional)
 * @param {boolean} searchCriteria.available - Availability (optional)
 * @param {number} searchCriteria.minRating - Minimum rating (optional)
 * @returns {Promise<Array>}
 */
export const searchVeterinarians = async (searchCriteria) => {
  try {
    const response = await vetServiceClient.post('/veterinarians/search', searchCriteria);
    return response.data;
  } catch (error) {
    console.error('Search veterinarians error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al buscar veterinarios' };
  }
};

/**
 * Update veterinarian
 * @param {number} id - Veterinarian ID
 * @param {Object} updateData - Data to update
 * @param {string} updateData.specialty - Specialty (optional)
 * @param {number} updateData.yearsOfExperience - Years of experience (optional)
 * @param {boolean} updateData.available - Availability (optional)
 * @param {number} updateData.rating - Rating (optional)
 * @returns {Promise<Object>}
 */
export const updateVeterinarian = async (id, updateData) => {
  try {
    const response = await vetServiceClient.put(`/veterinarians/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Update veterinarian error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al actualizar veterinario' };
  }
};

/**
 * Delete veterinarian
 * @param {number} id - Veterinarian ID
 * @returns {Promise<void>}
 */
export const deleteVeterinarian = async (id) => {
  try {
    await vetServiceClient.delete(`/veterinarians/${id}`);
  } catch (error) {
    console.error('Delete veterinarian error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al eliminar veterinario' };
  }
};

export default {
  createVeterinarian,
  getAllVeterinarians,
  getVeterinarianById,
  getVeterinarianByUserId,
  getAvailableVeterinarians,
  searchVeterinarians,
  updateVeterinarian,
  deleteVeterinarian,
};
