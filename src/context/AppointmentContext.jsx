import { createContext, useContext, useState, useEffect } from 'react';
import * as appointmentService from '../api/appointmentService';
import * as userService from '../api/userService';
import * as petService from '../api/petService';
import * as veterinarianService from '../api/veterinarianService';
import { useAuth } from './AuthContext';
import { services } from '../data/servicesData';

const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [currentVeterinarianId, setCurrentVeterinarianId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cargar citas cuando el usuario cambia
    useEffect(() => {
        if (user?.id) {
            loadUserAppointments();
        } else {
            setAppointments([]);
        }
    }, [user]);

    /**
     * Enriquecer cita con datos completos de servicio, mascota y cliente
     */
    const enrichAppointment = async (appointment) => {
        try {
            // Obtener servicio (desde datos estáticos)
            const service = services.find(s => parseInt(s.id) === parseInt(appointment.serviceId));

            // Obtener mascota
            let pet = null;
            if (appointment.petId) {
                try {
                    pet = await petService.getPetById(appointment.petId);
                } catch (err) {
                    console.error(`Error loading pet ${appointment.petId}:`, err);
                }
            }

            // Obtener cliente
            let client = null;
            if (appointment.clientId) {
                try {
                    client = await userService.getUserById(appointment.clientId);
                } catch (err) {
                    console.error(`Error loading client ${appointment.clientId}:`, err);
                }
            }

            return {
                ...appointment,
                service,
                pet,
                client
            };
        } catch (err) {
            console.error('Error enriching appointment:', err);
            return appointment;
        }
    };

    /**
     * Cargar citas del usuario según su rol
     */
    const loadUserAppointments = async () => {
        setIsLoading(true);
        setError(null);
        try {
            let data;
            if (user.role === 'VET') {
                // Para veterinarios, primero obtener el veterinarianId desde la tabla veterinarians
                try {
                    const veterinarian = await veterinarianService.getVeterinarianByUserId(user.id);
                    setCurrentVeterinarianId(veterinarian.id); // Guardar veterinarianId
                    data = await appointmentService.getAppointmentsByVet(veterinarian.id);
                } catch (vetErr) {
                    console.error('Error loading veterinarian data:', vetErr);
                    // Si no se puede obtener el veterinario, retornar array vacío
                    setAppointments([]);
                    setCurrentVeterinarianId(null);
                    setIsLoading(false);
                    return;
                }
            } else if (user.role === 'CLIENT') {
                setCurrentVeterinarianId(null);
                data = await appointmentService.getAppointmentsByClient(user.id);
            } else {
                setCurrentVeterinarianId(null);
                data = await appointmentService.getAllAppointments();
            }

            // Enriquecer cada cita con datos completos
            const enrichedAppointments = await Promise.all(
                data.map(appointment => enrichAppointment(appointment))
            );

            setAppointments(enrichedAppointments);
        } catch (err) {
            console.error('Error loading appointments:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Crear nueva cita
     */
    const createAppointment = async (appointmentData) => {
        setIsLoading(true);
        setError(null);
        try {
            const newAppointment = await appointmentService.createAppointment(appointmentData);
            // Enriquecer la cita recién creada con datos completos
            const enrichedAppointment = await enrichAppointment(newAppointment);
            setAppointments(prev => [...prev, enrichedAppointment]);
            return { success: true, appointment: enrichedAppointment };
        } catch (err) {
            console.error('Error creating appointment:', err);
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Actualizar cita existente
     */
    const updateAppointment = async (appointmentId, updates) => {
        setIsLoading(true);
        setError(null);
        try {
            const updatedAppointment = await appointmentService.updateAppointment(appointmentId, updates);
            setAppointments(prev =>
                prev.map(apt => apt.id === appointmentId ? updatedAppointment : apt)
            );
            return { success: true };
        } catch (err) {
            console.error('Error updating appointment:', err);
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Cancelar cita
     */
    const cancelAppointment = async (appointmentId, reason) => {
        setIsLoading(true);
        setError(null);
        try {
            const cancelledAppointment = await appointmentService.cancelAppointment(appointmentId, reason);
            // Enriquecer la cita actualizada con datos completos
            const enrichedAppointment = await enrichAppointment(cancelledAppointment);
            setAppointments(prev =>
                prev.map(apt => apt.id === appointmentId ? enrichedAppointment : apt)
            );
            return { success: true };
        } catch (err) {
            console.error('Error cancelling appointment:', err);
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Confirmar cita
     */
    const confirmAppointment = async (appointmentId) => {
        setIsLoading(true);
        setError(null);
        try {
            const confirmedAppointment = await appointmentService.confirmAppointment(appointmentId);
            // Enriquecer la cita actualizada con datos completos
            const enrichedAppointment = await enrichAppointment(confirmedAppointment);
            setAppointments(prev =>
                prev.map(apt => apt.id === appointmentId ? enrichedAppointment : apt)
            );
            return { success: true };
        } catch (err) {
            console.error('Error confirming appointment:', err);
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Completar cita (solo veterinarios)
     */
    const completeAppointment = async (appointmentId, medicalData) => {
        setIsLoading(true);
        setError(null);
        try {
            const completedAppointment = await appointmentService.completeAppointment(appointmentId, medicalData);
            // Enriquecer la cita actualizada con datos completos
            const enrichedAppointment = await enrichAppointment(completedAppointment);
            setAppointments(prev =>
                prev.map(apt => apt.id === appointmentId ? enrichedAppointment : apt)
            );
            return { success: true };
        } catch (err) {
            console.error('Error completing appointment:', err);
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Obtener citas por cliente
     */
    const getAppointmentsByClient = (clientId) => {
        return appointments.filter(apt => apt.clientId === clientId);
    };

    /**
     * Obtener citas por veterinario
     * Si no se proporciona vetId, usa currentVeterinarianId (para veterinarios logueados)
     */
    const getAppointmentsByVet = (vetId = null) => {
        const targetVetId = vetId || currentVeterinarianId;
        if (!targetVetId) return [];
        return appointments.filter(apt => apt.veterinarianId === targetVetId);
    };

    /**
     * Obtener citas por fecha
     */
    const getAppointmentsByDate = (date) => {
        return appointments.filter(apt => apt.date === date);
    };

    /**
     * Obtener próximas citas
     */
    const getUpcomingAppointments = (clientId) => {
        const today = new Date().toISOString().split('T')[0];
        return appointments
            .filter(apt =>
                apt.clientId === clientId &&
                apt.date >= today &&
                apt.status !== 'cancelled'
            )
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    /**
     * Obtener historial de citas
     */
    const getAppointmentHistory = (clientId) => {
        const today = new Date().toISOString().split('T')[0];
        return appointments
            .filter(apt =>
                apt.clientId === clientId &&
                (apt.date < today || apt.status === 'completed')
            )
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    /**
     * Obtener cita con detalles completos (servicio, mascota, veterinario)
     * NOTA: Los datos de service, pet, veterinarian, client, address
     * deben venir ya incluidos en el objeto appointment desde el backend
     */
    const getAppointmentDetails = (appointmentId) => {
        const appointment = appointments.find(apt => apt.id === parseInt(appointmentId));
        return appointment || null;
    };

    /**
     * Obtener citas del día (para veterinarios)
     * Si no se proporciona vetId, usa currentVeterinarianId (para veterinarios logueados)
     */
    const getTodayAppointments = (vetId = null) => {
        const targetVetId = vetId || currentVeterinarianId;
        if (!targetVetId) return [];
        const today = new Date().toISOString().split('T')[0];
        return appointments
            .filter(apt =>
                apt.veterinarianId === targetVetId &&
                apt.date === today &&
                apt.status !== 'cancelled'
            )
            .sort((a, b) => a.time.localeCompare(b.time));
    };

    /**
     * Verificar disponibilidad de horario
     */
    const checkAvailability = async (vetId, date, time) => {
        try {
            return await appointmentService.checkAvailability(vetId, date, time);
        } catch (err) {
            console.error('Error checking availability:', err);
            return false;
        }
    };

    const value = {
        appointments,
        currentVeterinarianId,
        isLoading,
        error,
        loadUserAppointments,
        createAppointment,
        updateAppointment,
        cancelAppointment,
        confirmAppointment,
        completeAppointment,
        getAppointmentsByClient,
        getAppointmentsByVet,
        getAppointmentsByDate,
        getUpcomingAppointments,
        getAppointmentHistory,
        getAppointmentDetails,
        getTodayAppointments,
        checkAvailability
    };

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    );
}

export function useAppointments() {
    const context = useContext(AppointmentContext);
    if (!context) {
        throw new Error('useAppointments must be used within an AppointmentProvider');
    }
    return context;
}
