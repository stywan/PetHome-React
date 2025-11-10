import { petServiceClient } from './config';

/**
 * Pet Service
 * Handles pet-related API operations including medical records
 */

// ============================================
// Pet CRUD Operations
// ============================================

/**
 * Create a new pet
 * @param {Object} petData - Pet data
 * @param {string} petData.name - Pet name
 * @param {string} petData.species - Pet species
 * @param {string} petData.breed - Pet breed
 * @param {string} petData.dateOfBirth - Date of birth (YYYY-MM-DD)
 * @param {number} petData.ownerId - Owner ID
 * @param {string} petData.color - Pet color (optional)
 * @param {number} petData.weight - Pet weight (optional)
 * @param {string} petData.microchipNumber - Microchip number (optional)
 * @param {string} petData.allergies - Allergies (optional)
 * @param {string} petData.specialNeeds - Special needs (optional)
 * @returns {Promise<Object>}
 */
export const createPet = async (petData) => {
  try {
    const response = await petServiceClient.post('/pets', petData);
    return response.data;
  } catch (error) {
    console.error('Create pet error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al crear mascota' };
  }
};

/**
 * Get all pets
 * @returns {Promise<Array>}
 */
export const getAllPets = async () => {
  try {
    const response = await petServiceClient.get('/pets');
    return response.data;
  } catch (error) {
    console.error('Get all pets error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener mascotas' };
  }
};

/**
 * Get pet by ID
 * @param {number} id - Pet ID
 * @returns {Promise<Object>}
 */
export const getPetById = async (id) => {
  try {
    const response = await petServiceClient.get(`/pets/${id}`);
    return response.data;
  } catch (error) {
    console.error('Get pet by ID error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener mascota' };
  }
};

/**
 * Get pets by owner ID
 * @param {number} ownerId - Owner ID
 * @returns {Promise<Array>}
 */
export const getPetsByOwnerId = async (ownerId) => {
  try {
    const response = await petServiceClient.get(`/pets/owner/${ownerId}`);
    return response.data;
  } catch (error) {
    console.error('Get pets by owner error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener mascotas del dueño' };
  }
};

/**
 * Get active pets by owner ID
 * @param {number} ownerId - Owner ID
 * @returns {Promise<Array>}
 */
export const getActivePetsByOwnerId = async (ownerId) => {
  try {
    const response = await petServiceClient.get(`/pets/owner/${ownerId}/active`);
    return response.data;
  } catch (error) {
    console.error('Get active pets error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener mascotas activas' };
  }
};

/**
 * Get pets by species
 * @param {string} species - Species name
 * @returns {Promise<Array>}
 */
export const getPetsBySpecies = async (species) => {
  try {
    const response = await petServiceClient.get(`/pets/species/${species}`);
    return response.data;
  } catch (error) {
    console.error('Get pets by species error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener mascotas por especie' };
  }
};

/**
 * Search pets by name
 * @param {string} name - Name search term
 * @returns {Promise<Array>}
 */
export const searchPetsByName = async (name) => {
  try {
    const response = await petServiceClient.get('/pets/search', {
      params: { name }
    });
    return response.data;
  } catch (error) {
    console.error('Search pets error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al buscar mascotas' };
  }
};

/**
 * Update pet
 * @param {number} id - Pet ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>}
 */
export const updatePet = async (id, updateData) => {
  try {
    const response = await petServiceClient.put(`/pets/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Update pet error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al actualizar mascota' };
  }
};

/**
 * Delete pet
 * @param {number} id - Pet ID
 * @returns {Promise<void>}
 */
export const deletePet = async (id) => {
  try {
    await petServiceClient.delete(`/pets/${id}`);
  } catch (error) {
    console.error('Delete pet error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al eliminar mascota' };
  }
};

// ============================================
// Medical Records Operations
// ============================================

/**
 * Add medical record for a pet
 * @param {Object} recordData - Medical record data
 * @param {number} recordData.petId - Pet ID
 * @param {number} recordData.veterinarianId - Veterinarian ID
 * @param {string} recordData.date - Date (YYYY-MM-DD)
 * @param {string} recordData.diagnosis - Diagnosis
 * @param {string} recordData.treatment - Treatment
 * @param {string} recordData.notes - Additional notes (optional)
 * @param {Array<string>} recordData.prescriptions - Prescriptions (optional)
 * @returns {Promise<Object>}
 */
export const addMedicalRecord = async (recordData) => {
  try {
    const response = await petServiceClient.post('/pets/medical-records', recordData);
    return response.data;
  } catch (error) {
    console.error('Add medical record error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al agregar historial médico' };
  }
};

/**
 * Get medical records by pet ID
 * @param {number} petId - Pet ID
 * @returns {Promise<Array>}
 */
export const getMedicalRecordsByPetId = async (petId) => {
  try {
    const response = await petServiceClient.get(`/pets/${petId}/medical-records`);
    return response.data;
  } catch (error) {
    console.error('Get medical records error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener historial médico' };
  }
};

/**
 * Get medical record by ID
 * @param {number} id - Medical record ID
 * @returns {Promise<Object>}
 */
export const getMedicalRecordById = async (id) => {
  try {
    const response = await petServiceClient.get(`/pets/medical-records/${id}`);
    return response.data;
  } catch (error) {
    console.error('Get medical record error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener registro médico' };
  }
};

/**
 * Get medical records by veterinarian ID
 * @param {number} veterinarianId - Veterinarian ID
 * @returns {Promise<Array>}
 */
export const getMedicalRecordsByVeterinarianId = async (veterinarianId) => {
  try {
    const response = await petServiceClient.get(`/pets/medical-records/veterinarian/${veterinarianId}`);
    return response.data;
  } catch (error) {
    console.error('Get medical records by vet error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al obtener registros del veterinario' };
  }
};

/**
 * Delete medical record
 * @param {number} id - Medical record ID
 * @returns {Promise<void>}
 */
export const deleteMedicalRecord = async (id) => {
  try {
    await petServiceClient.delete(`/pets/medical-records/${id}`);
  } catch (error) {
    console.error('Delete medical record error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Error al eliminar registro médico' };
  }
};

export default {
  createPet,
  getAllPets,
  getPetById,
  getPetsByOwnerId,
  getActivePetsByOwnerId,
  getPetsBySpecies,
  searchPetsByName,
  updatePet,
  deletePet,
  addMedicalRecord,
  getMedicalRecordsByPetId,
  getMedicalRecordById,
  getMedicalRecordsByVeterinarianId,
  deleteMedicalRecord,
};
