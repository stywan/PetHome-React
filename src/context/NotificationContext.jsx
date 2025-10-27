import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export function useNotification() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    
    const showNotification = useCallback((message, type = 'success', duration = 3000) => {
        const id = Date.now() + Math.random();
        const notification = {
            id,
            message,
            type,
            show: true
        };

        setNotifications(prev => [...prev, notification]);

        // Auto-remove notification after duration
        setTimeout(() => {
            removeNotification(id);
        }, duration);

        return id;
    }, []);

    /**
     * Remove a notification by ID
     */
    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, []);

    /**
     * Convenience methods for different notification types
     */
    const showSuccess = useCallback((message, duration) => {
        return showNotification(message, 'success', duration);
    }, [showNotification]);

    const showError = useCallback((message, duration) => {
        return showNotification(message, 'error', duration);
    }, [showNotification]);

    const showWarning = useCallback((message, duration) => {
        return showNotification(message, 'warning', duration);
    }, [showNotification]);

    const showInfo = useCallback((message, duration) => {
        return showNotification(message, 'info', duration);
    }, [showNotification]);

    const value = {
        notifications,
        showNotification,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        removeNotification
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}
