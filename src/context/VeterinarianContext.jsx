import { createContext, useContext, useState, useEffect } from 'react';
import * as veterinarianService from '../api/veterinarianService';
import * as userService from '../api/userService';

const VeterinarianContext = createContext();

export function VeterinarianProvider({ children }) {
    const [veterinarians, setVeterinarians] = useState([]);
    const [availableVeterinarians, setAvailableVeterinarians] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cargar veterinarios al montar el componente
    useEffect(() => {
        loadVeterinarians();
    }, []);

    /**
     * Cargar todos los veterinarios con sus datos de usuario
     */
    const loadVeterinarians = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Obtener todos los veterinarios
            const vetsData = await veterinarianService.getAllVeterinarians();

            // Para cada veterinario, obtener los datos del usuario asociado
            const veterinariansWithUserData = await Promise.all(
                vetsData.map(async (vet) => {
                    try {
                        const userData = await userService.getUserById(vet.userId);
                        return {
                            ...vet,
                            userName: userData.name,
                            userEmail: userData.email,
                            userPhone: userData.phone,
                            userPhoto: userData.photo
                        };
                    } catch (err) {
                        console.error(`Error loading user data for veterinarian ${vet.id}:`, err);
                        // Si falla la carga del usuario, devolver el veterinario sin datos de usuario
                        return {
                            ...vet,
                            userName: 'Nombre no disponible',
                            userEmail: null,
                            userPhone: null,
                            userPhoto: null
                        };
                    }
                })
            );

            setVeterinarians(veterinariansWithUserData);
        } catch (err) {
            console.error('Error loading veterinarians:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Cargar veterinarios disponibles
     */
    const loadAvailableVeterinarians = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await veterinarianService.getAvailableVeterinarians();
            setAvailableVeterinarians(data);
        } catch (err) {
            console.error('Error loading available veterinarians:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Obtener veterinario por ID
     */
    const getVeterinarianById = async (id) => {
        try {
            return await veterinarianService.getVeterinarianById(id);
        } catch (err) {
            console.error('Error getting veterinarian:', err);
            throw err;
        }
    };

    /**
     * Crear nuevo veterinario
     */
    const createVeterinarian = async (veterinarianData) => {
        setIsLoading(true);
        setError(null);
        try {
            const newVet = await veterinarianService.createVeterinarian(veterinarianData);
            setVeterinarians(prev => [...prev, newVet]);
            return { success: true, veterinarian: newVet };
        } catch (err) {
            console.error('Error creating veterinarian:', err);
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Actualizar veterinario
     */
    const updateVeterinarian = async (id, updates) => {
        setIsLoading(true);
        setError(null);
        try {
            const updated = await veterinarianService.updateVeterinarian(id, updates);
            setVeterinarians(prev =>
                prev.map(vet => vet.id === id ? updated : vet)
            );
            return { success: true };
        } catch (err) {
            console.error('Error updating veterinarian:', err);
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Eliminar veterinario
     */
    const deleteVeterinarian = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            await veterinarianService.deleteVeterinarian(id);
            setVeterinarians(prev => prev.filter(vet => vet.id !== id));
            return { success: true };
        } catch (err) {
            console.error('Error deleting veterinarian:', err);
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Buscar veterinarios
     */
    const searchVeterinarians = async (criteria) => {
        setIsLoading(true);
        setError(null);
        try {
            const results = await veterinarianService.searchVeterinarians(criteria);
            return results;
        } catch (err) {
            console.error('Error searching veterinarians:', err);
            setError(err.message);
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        veterinarians,
        availableVeterinarians,
        isLoading,
        error,
        loadVeterinarians,
        loadAvailableVeterinarians,
        getVeterinarianById,
        createVeterinarian,
        updateVeterinarian,
        deleteVeterinarian,
        searchVeterinarians
    };

    return (
        <VeterinarianContext.Provider value={value}>
            {children}
        </VeterinarianContext.Provider>
    );
}

export function useVeterinarians() {
    const context = useContext(VeterinarianContext);
    if (!context) {
        throw new Error('useVeterinarians must be used within a VeterinarianProvider');
    }
    return context;
}
