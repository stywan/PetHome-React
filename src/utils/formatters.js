/**
 * Utility functions for formatting data
 */

/**
 * Format price as Chilean pesos
 * @param {number} price - The price to format
 * @returns {string} Formatted price
 */
export function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    }).format(price);
}

/**
 * Format date for display
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString + "T00:00:00");
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    };

    return date.toLocaleDateString('es-ES', options);
}

/**
 * Format veterinarian name for display
 * @param {string} veterinarianId - Veterinarian ID
 * @returns {string} Formatted veterinarian name
 */
export function formatVeterinarianName(veterinarianId) {
    if (!veterinarianId) return "";
    return veterinarianId.replace("dr-", "Dr. ").replace("dra-", "Dra. ");
}