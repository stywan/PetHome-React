import { useEffect, useRef } from 'react';
import { useNotification } from '../../context/NotificationContext';

export function ToastContainer() {
    const { notifications, removeNotification } = useNotification();

    return (
        <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
            {notifications.map(notification => (
                <Toast
                    key={notification.id}
                    notification={notification}
                    onClose={() => removeNotification(notification.id)}
                />
            ))}
        </div>
    );
}

function Toast({ notification, onClose }) {
    const toastRef = useRef(null);

    useEffect(() => {
        if (toastRef.current && notification.show) {
            const bsToast = new window.bootstrap.Toast(toastRef.current, {
                autohide: false // We handle auto-hide in the context
            });
            bsToast.show();

            return () => {
                bsToast.dispose();
            };
        }
    }, [notification.show]);

    // Determine icon and colors based on type
    const getToastConfig = (type) => {
        switch (type) {
            case 'success':
                return {
                    icon: 'fa-check-circle',
                    iconColor: 'text-success',
                    bgHeader: 'bg-success',
                    title: 'Éxito'
                };
            case 'error':
                return {
                    icon: 'fa-exclamation-circle',
                    iconColor: 'text-danger',
                    bgHeader: 'bg-danger',
                    title: 'Error'
                };
            case 'warning':
                return {
                    icon: 'fa-exclamation-triangle',
                    iconColor: 'text-warning',
                    bgHeader: 'bg-warning',
                    title: 'Advertencia'
                };
            case 'info':
                return {
                    icon: 'fa-info-circle',
                    iconColor: 'text-info',
                    bgHeader: 'bg-info',
                    title: 'Información'
                };
            default:
                return {
                    icon: 'fa-bell',
                    iconColor: 'text-primary',
                    bgHeader: 'bg-primary',
                    title: 'Notificación'
                };
        }
    };

    const config = getToastConfig(notification.type);

    return (
        <div
            ref={toastRef}
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className={`toast-header ${config.bgHeader} text-white`}>
                <i className={`fas ${config.icon} me-2`}></i>
                <strong className="me-auto">{config.title}</strong>
                <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={onClose}
                    aria-label="Close"
                ></button>
            </div>
            <div className="toast-body">
                {notification.message}
            </div>
        </div>
    );
}
