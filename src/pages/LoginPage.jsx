import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthTemplate } from '../components/templates/AuthTemplate';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { useAuth } from '../context/AuthContext';
import { DEFAULT_USER_PHOTO } from '../constants';

export function LoginPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login, register, isLoading } = useAuth();
    const [activeTab, setActiveTab] = useState('login');
    const [error, setError] = useState('');

    // Detectar si viene del link de "Registrarse"
    useEffect(() => {
        const mode = searchParams.get('mode');
        if (mode === 'register') {
            setActiveTab('register');
        }
    }, [searchParams]);

    // Estado para login
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    // Estado para registro
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Handle login submit
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const result = await login(loginData.email, loginData.password);

            if (result.success) {
                // Redirigir según el rol del usuario
                const userType = result.user.role;
                if (userType === 'VET') {
                    navigate('/vet/dashboard');
                } else if (userType === 'CLIENT') {
                    navigate('/client/dashboard');
                } else if (userType === 'ADMIN') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/client/dashboard'); // Default
                }
            } else {
                setError(result.error || 'Error al iniciar sesión');
            }
        } catch (err) {
            setError('Error al conectar con el servidor');
            console.error('Login error:', err);
        }
    };

    // Handle register submit
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validar contraseñas
        if (registerData.password !== registerData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (registerData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            // Registrar usuario como CLIENT (por defecto)
            const result = await register({
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
                phone: null, // El teléfono se agregará desde el dashboard
                role: 'CLIENT', // Siempre CLIENT para registro público
                photo: DEFAULT_USER_PHOTO // Foto por defecto
            });

            if (result.success) {
                // Después del registro exitoso, hacer login automático
                const loginResult = await login(registerData.email, registerData.password);

                if (loginResult.success) {
                    // Redirigir al dashboard del cliente
                    navigate('/client/dashboard');
                } else {
                    // Si el auto-login falla, mostrar mensaje y cambiar a tab de login
                    setError('Cuenta creada. Por favor inicia sesión.');
                    setActiveTab('login');
                    setLoginData({
                        email: registerData.email,
                        password: ''
                    });
                }
            } else {
                setError(result.error || 'Error al crear la cuenta');
            }
        } catch (err) {
            setError('Error al conectar con el servidor');
            console.error('Register error:', err);
        }
    };

    return (
        <AuthTemplate>
            <div className="auth-container">
                {/* Botón volver al home */}
                <button
                    className="btn btn-link position-absolute text-muted back-button"
                    onClick={() => navigate('/')}
                    title="Volver al inicio"
                >
                    <i className="fas fa-arrow-left me-2"></i>
                    Volver
                </button>

                {/* Contenedor de dos columnas */}
                <div className="auth-card">
                    {/* Columna izquierda - Formulario */}
                    <div className="auth-form-section">
                        <div className="auth-form-content">
                            <div className="mb-4">
                                <img src="/img/logo_pethome.svg" alt="Logo" className="auth-logo mb-3" />
                                <h2 className="auth-title">
                                    {activeTab === 'login' ? 'Bienvenido' : 'Crear Cuenta'}
                                </h2>
                                <p className="auth-subtitle">
                                    {activeTab === 'login'
                                        ? 'Ingresa tus credenciales para continuar'
                                        : 'Completa tus datos para registrarte'}
                                </p>
                            </div>

                            {/* Mostrar error si existe */}
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            {/* Tabs */}
                            <ul className="nav nav-pills mb-4" id="loginTabs" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('login')}
                                        type="button"
                                    >
                                        Iniciar Sesión
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('register')}
                                        type="button"
                                    >
                                        Registrarse
                                    </button>
                                </li>
                            </ul>

                            <div className="tab-content">
                                {/* LOGIN FORM */}
                                {activeTab === 'login' && (
                                    <div className="tab-pane fade show active">
                                        <form onSubmit={handleLoginSubmit}>
                                            <div className="mb-3">
                                                <label className="form-label">Correo Electrónico</label>
                                                <Input
                                                    type="email"
                                                    placeholder="ejemplo@correo.com"
                                                    value={loginData.email}
                                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                                    required
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Contraseña</label>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={loginData.password}
                                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                                    required
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                                                    <label className="form-check-label" htmlFor="rememberMe">Recordarme</label>
                                                </div>
                                                <a href="#" className="auth-link">¿Olvidaste tu contraseña?</a>
                                            </div>
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                className="w-100"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? 'Ingresando...' : 'Ingresar'}
                                            </Button>
                                        </form>
                                    </div>
                                )}

                                {/* REGISTER FORM */}
                                {activeTab === 'register' && (
                                    <div className="tab-pane fade show active">
                                        <form onSubmit={handleRegisterSubmit}>
                                            <div className="mb-3">
                                                <label className="form-label">Nombre Completo</label>
                                                <Input
                                                    type="text"
                                                    placeholder="Juan Pérez"
                                                    value={registerData.name}
                                                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                                    required
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Correo Electrónico</label>
                                                <Input
                                                    type="email"
                                                    placeholder="ejemplo@correo.com"
                                                    value={registerData.email}
                                                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                                    required
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Contraseña</label>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={registerData.password}
                                                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                                    required
                                                    disabled={isLoading}
                                                />
                                                <small className="text-muted">Mínimo 6 caracteres</small>
                                            </div>
                                            <div className="mb-4">
                                                <label className="form-label">Confirmar Contraseña</label>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={registerData.confirmPassword}
                                                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                                                    required
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                className="w-100"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                                            </Button>
                                            <p className="text-muted text-center mt-3" style={{ fontSize: '0.85rem' }}>
                                                Podrás agregar tu número de teléfono en tu perfil
                                            </p>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha - Imagen */}
                    <div className="auth-image-section">
                        <img
                            src="/img/img-banner-home.png"
                            alt="Bienvenido a PetHome"
                            className="auth-banner-image"
                        />
                    </div>
                </div>
            </div>
        </AuthTemplate>
    );
}