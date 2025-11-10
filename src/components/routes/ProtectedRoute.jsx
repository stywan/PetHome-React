import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function ProtectedRoute({ children }) {
    const { user, isLoading } = useAuth();

    // Mientras carga, mostrar nada o un loader
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    // Si no hay usuario autenticado, redirigir a login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Usuario autenticado, mostrar el contenido
    return children;
}
