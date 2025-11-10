import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Componente para proteger rutas basadas en roles
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componente a renderizar si tiene acceso
 * @param {string[]} props.allowedRoles - Array de roles permitidos (ej: ['CLIENT'], ['VET'], ['CLIENT', 'VET'])
 */
export function RoleBasedRoute({ children, allowedRoles = [] }) {
    const { user, isLoading } = useAuth();

    // Mientras carga, mostrar loader
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

    // Verificar si el rol del usuario está en los roles permitidos
    const hasAccess = allowedRoles.includes(user.role);

    if (!hasAccess) {
        // Redirigir al dashboard correcto según su rol
        if (user.role === 'VET') {
            return <Navigate to="/vet/dashboard" replace />;
        } else if (user.role === 'CLIENT') {
            return <Navigate to="/client/dashboard" replace />;
        } else if (user.role === 'ADMIN') {
            return <Navigate to="/admin/dashboard" replace />;
        } else {
            // Si el rol no es reconocido, redirigir a login
            return <Navigate to="/login" replace />;
        }
    }

    // Usuario autenticado y con el rol correcto, mostrar el contenido
    return children;
}
