/**
 * API Services Index
 * Centralized export for all API services
 */

// Export all services
export * as authService from './authService';
export * as userService from './userService';
export * as petService from './petService';
export * as veterinarianService from './veterinarianService';

// Export API clients for advanced usage
export {
  apiClient,
  authServiceClient,
  userServiceClient,
  petServiceClient,
  vetServiceClient
} from './config';
