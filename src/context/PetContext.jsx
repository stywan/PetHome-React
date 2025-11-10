import { createContext, useContext, useState, useEffect } from 'react';
import * as petService from '../api/petService';
import { useAuth } from './AuthContext';

const PetContext = createContext();

export function PetProvider({ children }) {
    const { user } = useAuth();
    const [pets, setPets] = useState([]);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cargar mascotas del usuario cuando cambia
    useEffect(() => {
        if (user?.id) {
            loadPetsByOwner(user.id);
        }
    }, [user]);

    /**
     * Cargar mascotas por dueño desde el backend
     */
    const loadPetsByOwner = async (ownerId) => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await petService.getPetsByOwnerId(ownerId);
            setPets(data);
        } catch (err) {
            setError(err.message || 'Error al cargar mascotas');
            console.error('Error loading pets:', err);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Agregar nueva mascota
     */
    const addPet = async (petData) => {
        try {
            setIsLoading(true);
            setError(null);
            const newPet = await petService.createPet(petData);
            setPets(prev => [...prev, newPet]);
            return { success: true, pet: newPet };
        } catch (err) {
            setError(err.message || 'Error al agregar mascota');
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Actualizar información de mascota
     */
    const updatePet = async (petId, updates) => {
        try {
            setIsLoading(true);
            setError(null);
            const updatedPet = await petService.updatePet(petId, updates);
            setPets(prev =>
                prev.map(pet =>
                    pet.id === petId ? updatedPet : pet
                )
            );
            return { success: true, pet: updatedPet };
        } catch (err) {
            setError(err.message || 'Error al actualizar mascota');
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Eliminar mascota
     */
    const deletePet = async (petId) => {
        try {
            setIsLoading(true);
            setError(null);
            await petService.deletePet(petId);
            setPets(prev => prev.filter(pet => pet.id !== petId));
            return { success: true };
        } catch (err) {
            setError(err.message || 'Error al eliminar mascota');
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Obtener mascotas por dueño
     */
    const getPetsByOwner = (ownerId) => {
        return pets.filter(pet => pet.ownerId === ownerId);
    };

    /**
     * Obtener mascota por ID
     */
    const getPetById = (petId) => {
        return pets.find(pet => pet.id === petId);
    };

    /**
     * Calcular edad de mascota en años
     */
    const calculatePetAge = (birthDate) => {
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

    /**
     * Agregar registro médico
     */
    const addMedicalRecord = async (recordData) => {
        try {
            setIsLoading(true);
            setError(null);
            const newRecord = await petService.addMedicalRecord(recordData);
            setMedicalRecords(prev => [...prev, newRecord]);
            return { success: true, record: newRecord };
        } catch (err) {
            setError(err.message || 'Error al agregar registro médico');
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Cargar historial médico de una mascota
     */
    const loadMedicalHistory = async (petId) => {
        try {
            setIsLoading(true);
            setError(null);
            const records = await petService.getMedicalRecordsByPetId(petId);
            setMedicalRecords(records);
            return records;
        } catch (err) {
            setError(err.message || 'Error al cargar historial médico');
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Obtener historial médico de una mascota (desde el estado)
     */
    const getMedicalHistory = (petId) => {
        return medicalRecords
            .filter(record => record.petId === petId)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    /**
     * Obtener último registro médico
     */
    const getLatestMedicalRecord = (petId) => {
        const history = getMedicalHistory(petId);
        return history[0] || null;
    };

    /**
     * Obtener historial de vacunación
     */
    const getVaccinationHistory = (petId) => {
        return medicalRecords
            .filter(record => record.petId === petId && record.type === 'vaccination')
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    /**
     * Verificar si la mascota tiene vacunas al día
     * (simplificado - en producción sería más complejo)
     */
    const hasUpdatedVaccinations = (petId) => {
        const vaccinations = getVaccinationHistory(petId);
        if (vaccinations.length === 0) return false;

        const lastVaccination = vaccinations[0];
        const lastVaccinationDate = new Date(lastVaccination.date);
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        return lastVaccinationDate > oneYearAgo;
    };

    /**
     * Obtener resumen de salud de mascota
     */
    const getPetHealthSummary = (petId) => {
        const pet = getPetById(petId);
        if (!pet) return null;

        const history = getMedicalHistory(petId);
        const lastRecord = getLatestMedicalRecord(petId);
        const vaccinations = getVaccinationHistory(petId);

        return {
            pet,
            age: calculatePetAge(pet.birthDate),
            totalRecords: history.length,
            lastVisit: lastRecord?.date || null,
            lastWeight: lastRecord?.weight || pet.weight,
            vaccinationsUpToDate: hasUpdatedVaccinations(petId),
            totalVaccinations: vaccinations.length
        };
    };

    const value = {
        pets,
        medicalRecords,
        isLoading,
        error,
        addPet,
        updatePet,
        deletePet,
        getPetsByOwner,
        getPetById,
        calculatePetAge,
        addMedicalRecord,
        loadMedicalHistory,
        getMedicalHistory,
        getLatestMedicalRecord,
        getVaccinationHistory,
        hasUpdatedVaccinations,
        getPetHealthSummary,
        loadPetsByOwner
    };

    return (
        <PetContext.Provider value={value}>
            {children}
        </PetContext.Provider>
    );
}

export function usePets() {
    const context = useContext(PetContext);
    if (!context) {
        throw new Error('usePets must be used within a PetProvider');
    }
    return context;
}
