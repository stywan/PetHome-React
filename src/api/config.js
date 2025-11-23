import axios from 'axios';

// Base URLs from environment variables
const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8080';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000');

// Create axios instances for each service through API Gateway
export const apiClient = axios.create({
  baseURL: API_GATEWAY_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User Service client (auth routes)
export const authServiceClient = axios.create({
  baseURL: `${API_GATEWAY_URL}/api`,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User Service client
export const userServiceClient = axios.create({
  baseURL: `${API_GATEWAY_URL}/api`,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Pet Service client
export const petServiceClient = axios.create({
  baseURL: `${API_GATEWAY_URL}/api`,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Veterinarian Service client
export const vetServiceClient = axios.create({
  baseURL: `${API_GATEWAY_URL}/api`,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
const addAuthInterceptor = (client) => {
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

// Response interceptor for error handling
const addResponseInterceptor = (client) => {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;

        switch (status) {
          case 401:
            // Unauthorized - clear token silently
            // NO redirigir aquí para evitar loops infinitos
            // El AuthContext y RoleBasedRoute manejarán la redirección
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            console.warn('Token inválido o expirado. Por favor inicia sesión nuevamente.');
            break;
          case 403:
            console.error('Access forbidden:', data.message || 'Insufficient permissions');
            break;
          case 404:
            console.error('Resource not found:', data.message || 'The requested resource does not exist');
            break;
          case 500:
            console.error('Server error:', data.message || 'Internal server error');
            break;
          default:
            console.error('API error:', data.message || 'An error occurred');
        }
      } else if (error.request) {
        // Request made but no response received
        console.error('No response from server. Please check your connection.');
      } else {
        // Error in request setup
        console.error('Error setting up request:', error.message);
      }

      return Promise.reject(error);
    }
  );
};

// Apply interceptors to all clients
[apiClient, authServiceClient, userServiceClient, petServiceClient, vetServiceClient].forEach(client => {
  addAuthInterceptor(client);
  addResponseInterceptor(client);
});

export default apiClient;
