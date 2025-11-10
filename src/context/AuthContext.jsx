import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../api/authService';
import * as userService from '../api/userService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null); // 'client' | 'veterinarian' | null
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Cargar usuario desde localStorage al iniciar
    useEffect(() => {
        const savedUser = authService.getCurrentUser();
        const isAuth = authService.isAuthenticated();

        if (savedUser && isAuth) {
            setUser(savedUser);
            // Mapear roles del backend a userType
            const userTypeMap = {
                'CLIENT': 'client',
                'VET': 'veterinarian',
                'ADMIN': 'admin'
            };
            setUserType(userTypeMap[savedUser.role] || 'client');
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    /**
     * Login principal - usa el backend
     */
    const login = async (email, password) => {
        try {
            setIsLoading(true);
            const response = await authService.login(email, password);

            // Mapear roles del backend a userType
            const userTypeMap = {
                'CLIENT': 'client',
                'VET': 'veterinarian',
                'ADMIN': 'admin'
            };

            const mappedUserType = userTypeMap[response.user.role] || 'client';

            setUser(response.user);
            setUserType(mappedUserType);
            setIsAuthenticated(true);

            return { success: true, user: response.user, token: response.token };
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Credenciales inválidas'
            };
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Login como cliente (mantener compatibilidad con código existente)
     */
    const loginAsClient = async (email, password) => {
        return await login(email, password);
    };

    /**
     * Login como veterinario (mantener compatibilidad con código existente)
     */
    const loginAsVet = async (email, password) => {
        return await login(email, password);
    };

    /**
     * Logout
     */
    const logout = () => {
        authService.logout();
        setUser(null);
        setUserType(null);
        setIsAuthenticated(false);
    };

    /**
     * Registro de nuevo usuario
     */
    const register = async (userData) => {
        try {
            setIsLoading(true);
            // Asegurar que el rol esté en el formato correcto del backend
            const registrationData = {
                ...userData,
                role: userData.role || 'CLIENT' // Default a CLIENT si no se especifica
            };

            const response = await authService.register(registrationData);

            // El registro no devuelve token, así que no logeamos automáticamente
            // El usuario deberá hacer login después del registro

            return { success: true, user: response };
        } catch (error) {
            console.error('Register error in AuthContext:', error);
            return {
                success: false,
                error: error.message || error.error || 'Error al registrar usuario'
            };
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Actualizar perfil de usuario
     */
    const updateProfile = async (updates) => {
        try {
            setIsLoading(true);
            const updatedUser = await userService.updateUser(user.id, updates);
            setUser(updatedUser);

            return { success: true, user: updatedUser };
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Error al actualizar perfil'
            };
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        user,
        userType,
        isAuthenticated,
        isLoading,
        login,
        loginAsClient,
        loginAsVet,
        logout,
        register,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
