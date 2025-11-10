import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Logo } from '../atoms/Logo';
import { Button } from '../atoms/Button';
import { Avatar } from '../atoms/Avatar';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export function Navbar({ onCartToggle }) {
    const { getCartTotals } = useCart();
    const { totalItems } = getCartTotals();
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate('/');
    };

    const handleGoToDashboard = () => {
        setShowUserMenu(false);
        if (user?.role === 'VET') {
            navigate('/vet/dashboard');
        } else if (user?.role === 'CLIENT') {
            navigate('/client/dashboard');
        } else if (user?.role === 'ADMIN') {
            navigate('/admin/dashboard');
        }
    };

    const handleSettings = () => {
        setShowUserMenu(false);
        if (user?.role === 'VET') {
            navigate('/vet/profile');
        } else if (user?.role === 'CLIENT') {
            navigate('/client/profile');
        }
    };

    return (
        <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container">
                <Logo />

                <div className="d-flex align-items-center ms-auto d-lg-none gap-2">
                    {isAuthenticated && (
                        <div className="dropdown position-relative">
                            <button
                                className="btn btn-link p-0 border-0"
                                onClick={() => setShowUserMenu(!showUserMenu)}
                            >
                                <Avatar src={user?.photo} alt={user?.name} size="sm" />
                            </button>

                            {showUserMenu && (
                                <div
                                    className="position-absolute bg-white rounded shadow-lg border"
                                    style={{
                                        right: 0,
                                        top: 'calc(100% + 8px)',
                                        minWidth: '220px',
                                        zIndex: 1050
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="p-3 border-bottom bg-light rounded-top">
                                        <div className="fw-semibold text-dark">{user?.name}</div>
                                        <small className="text-muted">{user?.email}</small>
                                    </div>
                                    <div className="py-2">
                                        <button
                                            className="btn btn-link text-decoration-none text-dark w-100 text-start px-3 py-2"
                                            onClick={handleGoToDashboard}
                                        >
                                            Dashboard
                                        </button>
                                        <button
                                            className="btn btn-link text-decoration-none text-dark w-100 text-start px-3 py-2"
                                            onClick={handleSettings}
                                        >
                                            Configuración
                                        </button>
                                        <hr className="my-1" />
                                        <button
                                            className="btn btn-link text-decoration-none text-danger w-100 text-start px-3 py-2"
                                            onClick={handleLogout}
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <button
                        className="btn btn-outline-primary position-relative"
                        onClick={onCartToggle}
                    >
                        <i className="fa-solid fa-cart-shopping"></i>
                        {totalItems > 0 && (
                            <span className="badge bg-primary position-absolute top-0 start-100 translate-middle rounded-pill">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#menuNav"
                        aria-controls="menuNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className="collapse navbar-collapse justify-content-lg-end" id="menuNav">
                    <ul className="navbar-nav mx-auto text-center">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/services">Servicios</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Nosotros</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Contacto</Link>
                        </li>
                    </ul>

                    <div className="d-flex justify-content-center align-items-center gap-2 mt-3 mt-lg-0">
                        {!isAuthenticated ? (
                            <>
                                <Button
                                    variant="service"
                                    size="lg"
                                    className="px-4"
                                    onClick={() => navigate('/login?mode=register')}
                                >
                                    Registrarse
                                </Button>
                                <Button variant="login" to="/login">
                                    Iniciar Sesión
                                </Button>
                            </>
                        ) : (
                            <div className="dropdown position-relative">
                                <button
                                    className="btn btn-link p-0 border-0"
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    onBlur={() => setTimeout(() => setShowUserMenu(false), 200)}
                                >
                                    <Avatar src={user?.photo} alt={user?.name} size="md" />
                                </button>

                                {showUserMenu && (
                                    <div
                                        className="position-absolute bg-white rounded shadow-lg border"
                                        style={{
                                            right: 0,
                                            top: 'calc(100% + 8px)',
                                            minWidth: '220px',
                                            zIndex: 1050
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="p-3 border-bottom bg-light rounded-top">
                                            <div className="fw-semibold text-dark">{user?.name}</div>
                                            <small className="text-muted">{user?.email}</small>
                                        </div>
                                        <div className="py-2">
                                            <button
                                                className="btn btn-link text-decoration-none text-dark w-100 text-start px-3 py-2 hover-bg-light"
                                                onClick={handleGoToDashboard}
                                                style={{ transition: 'background-color 0.2s' }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                            >
                                                Dashboard
                                            </button>
                                            <button
                                                className="btn btn-link text-decoration-none text-dark w-100 text-start px-3 py-2"
                                                onClick={handleSettings}
                                                style={{ transition: 'background-color 0.2s' }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                            >
                                                Configuración
                                            </button>
                                            <hr className="my-1" />
                                            <button
                                                className="btn btn-link text-decoration-none text-danger w-100 text-start px-3 py-2"
                                                onClick={handleLogout}
                                                style={{ transition: 'background-color 0.2s' }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = '#fee'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                            >
                                                Cerrar Sesión
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <button
                            className="btn position-relative d-none d-lg-block ms-lg-2"
                            id="cartToggleDesktop"
                            onClick={onCartToggle}
                        >
                            <i className="fa-solid fa-cart-shopping"></i>
                            {totalItems > 0 && (
                                <span
                                    className="badge bg-primary position-absolute top-0 start-100 translate-middle rounded-pill"
                                    id="cartCountDesktop"
                                >
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}