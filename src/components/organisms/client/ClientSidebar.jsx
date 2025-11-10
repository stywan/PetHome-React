import { NavLink } from 'react-router-dom';
import { Icon } from '../../atoms/Icon';
import { Avatar } from '../../atoms/Avatar';
import { useAuth } from '../../../context/AuthContext';

export function ClientSidebar({ collapsed = false }) {
    const { user, logout } = useAuth();

    const menuItems = [
        {
            path: '/dashboard',
            icon: 'home',
            label: 'Inicio'
        },
        {
            path: '/dashboard/appointments',
            icon: 'calendar-check',
            label: 'Mis Citas'
        },
        {
            path: '/dashboard/pets',
            icon: 'paw',
            label: 'Mis Mascotas'
        },
        {
            path: '/dashboard/profile',
            icon: 'user',
            label: 'Mi Perfil'
        }
    ];

    return (
        <div className={`client-sidebar ${collapsed ? 'collapsed' : ''}`}>
            {/* User Profile Section */}
            <div className="sidebar-header p-3 border-bottom">
                <div className="d-flex align-items-center gap-3">
                    <Avatar
                        src={user?.photo}
                        alt={user?.name}
                        size="md"
                        shape="circle"
                    />
                    {!collapsed && (
                        <div className="flex-grow-1">
                            <h6 className="mb-0">{user?.name}</h6>
                            <small className="text-muted">{user?.email}</small>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="sidebar-nav p-3">
                <ul className="nav flex-column gap-2">
                    {menuItems.map((item) => (
                        <li key={item.path} className="nav-item">
                            <NavLink
                                to={item.path}
                                end={item.path === '/dashboard'}
                                className={({ isActive }) =>
                                    `nav-link d-flex align-items-center gap-3 rounded ${isActive ? 'active' : ''}`
                                }
                            >
                                <Icon name={item.icon} />
                                {!collapsed && <span>{item.label}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout Button */}
            <div className="sidebar-footer p-3 border-top mt-auto">
                <button
                    className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={logout}
                >
                    <Icon name="sign-out-alt" />
                    {!collapsed && <span>Cerrar Sesión</span>}
                </button>
            </div>
        </div>
    );
}
