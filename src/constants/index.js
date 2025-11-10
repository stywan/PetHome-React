/**
 * Constantes globales de la aplicación PetHome
 */

// Imágenes por defecto
export const DEFAULT_USER_PHOTO = '/img/icon-user.png';
export const DEFAULT_PET_PHOTO = '/img/pets/default-pet.jpg';

// Configuración de la aplicación
export const APP_NAME = 'PetHome';
export const APP_VERSION = '1.0.0';

// Roles de usuario
export const USER_ROLES = {
    CLIENT: 'CLIENT',
    VET: 'VET',
    ADMIN: 'ADMIN'
};

// Estados de citas
export const APPOINTMENT_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
};

// Tipos de mascotas
export const PET_SPECIES = {
    DOG: 'dog',
    CAT: 'cat',
    BIRD: 'bird',
    RABBIT: 'rabbit',
    OTHER: 'other'
};

// Géneros de mascotas (deben coincidir con el backend)
export const PET_GENDER = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    UNKNOWN: 'UNKNOWN'
};
