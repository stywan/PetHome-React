import axios from 'axios';

const API_URL = 'http://localhost:8080/api/appointments';

// Configurar axios para incluir el token en todas las peticiones
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Crear nueva cita
 * @param {Object} appointmentData - Datos de la cita
 * @returns {Promise}
 */
export const createAppointment = async (appointmentData) => {
    try {
        const response = await axios.post(API_URL, appointmentData, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw error;
    }
};

/**
 * Obtener todas las citas
 * @returns {Promise}
 */
export const getAllAppointments = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
};

/**
 * Obtener cita por ID
 * @param {number} id - ID de la cita
 * @returns {Promise}
 */
export const getAppointmentById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching appointment:', error);
        throw error;
    }
};

/**
 * Actualizar cita
 * @param {number} id - ID de la cita
 * @param {Object} appointmentData - Datos actualizados
 * @returns {Promise}
 */
export const updateAppointment = async (id, appointmentData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, appointmentData, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
};

/**
 * Eliminar cita
 * @param {number} id - ID de la cita
 * @returns {Promise}
 */
export const deleteAppointment = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`, {
            headers: getAuthHeader()
        });
        return { success: true };
    } catch (error) {
        console.error('Error deleting appointment:', error);
        throw error;
    }
};

/**
 * Obtener citas por cliente
 * @param {number} clientId - ID del cliente
 * @returns {Promise}
 */
export const getAppointmentsByClient = async (clientId) => {
    try {
        const response = await axios.get(`${API_URL}/client/${clientId}`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching client appointments:', error);
        throw error;
    }
};

/**
 * Obtener citas por veterinario
 * @param {number} veterinarianId - ID del veterinario
 * @returns {Promise}
 */
export const getAppointmentsByVet = async (veterinarianId) => {
    try {
        const response = await axios.get(`${API_URL}/vet/${veterinarianId}`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching vet appointments:', error);
        throw error;
    }
};

/**
 * Obtener citas por mascota
 * @param {number} petId - ID de la mascota
 * @returns {Promise}
 */
export const getAppointmentsByPet = async (petId) => {
    try {
        const response = await axios.get(`${API_URL}/pet/${petId}`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching pet appointments:', error);
        throw error;
    }
};

/**
 * Obtener citas por fecha
 * @param {string} date - Fecha (formato: YYYY-MM-DD)
 * @returns {Promise}
 */
export const getAppointmentsByDate = async (date) => {
    try {
        const response = await axios.get(`${API_URL}/date/${date}`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching appointments by date:', error);
        throw error;
    }
};

/**
 * Obtener citas por estado
 * @param {string} status - Estado (pending, confirmed, completed, cancelled)
 * @returns {Promise}
 */
export const getAppointmentsByStatus = async (status) => {
    try {
        const response = await axios.get(`${API_URL}/status/${status}`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching appointments by status:', error);
        throw error;
    }
};

/**
 * Obtener próximas citas del cliente
 * @param {number} clientId - ID del cliente
 * @returns {Promise}
 */
export const getUpcomingAppointments = async (clientId) => {
    try {
        const response = await axios.get(`${API_URL}/client/${clientId}/upcoming`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching upcoming appointments:', error);
        throw error;
    }
};

/**
 * Obtener historial de citas del cliente
 * @param {number} clientId - ID del cliente
 * @returns {Promise}
 */
export const getAppointmentHistory = async (clientId) => {
    try {
        const response = await axios.get(`${API_URL}/client/${clientId}/history`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching appointment history:', error);
        throw error;
    }
};

/**
 * Obtener citas de hoy del veterinario
 * @param {number} veterinarianId - ID del veterinario
 * @returns {Promise}
 */
export const getTodayAppointments = async (veterinarianId) => {
    try {
        const response = await axios.get(`${API_URL}/vet/${veterinarianId}/today`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching today appointments:', error);
        throw error;
    }
};

/**
 * Confirmar cita
 * @param {number} id - ID de la cita
 * @returns {Promise}
 */
export const confirmAppointment = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/${id}/confirm`, {}, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error confirming appointment:', error);
        throw error;
    }
};

/**
 * Completar cita con datos médicos
 * @param {number} id - ID de la cita
 * @param {Object} medicalData - Datos médicos (diagnosis, prescription, notes)
 * @returns {Promise}
 */
export const completeAppointment = async (id, medicalData) => {
    try {
        const response = await axios.post(`${API_URL}/${id}/complete`, medicalData, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error completing appointment:', error);
        throw error;
    }
};

/**
 * Cancelar cita
 * @param {number} id - ID de la cita
 * @param {string} reason - Motivo de cancelación
 * @returns {Promise}
 */
export const cancelAppointment = async (id, reason) => {
    try {
        const response = await axios.post(`${API_URL}/${id}/cancel`, { reason }, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error cancelling appointment:', error);
        throw error;
    }
};

/**
 * Verificar disponibilidad de horario
 * @param {number} veterinarianId - ID del veterinario
 * @param {string} date - Fecha (YYYY-MM-DD)
 * @param {string} time - Hora (HH:MM)
 * @returns {Promise<boolean>}
 */
export const checkAvailability = async (veterinarianId, date, time) => {
    try {
        const response = await axios.get(`${API_URL}/availability`, {
            params: { veterinarianId, date, time },
            headers: getAuthHeader()
        });
        return response.data.available;
    } catch (error) {
        console.error('Error checking availability:', error);
        throw error;
    }
};
