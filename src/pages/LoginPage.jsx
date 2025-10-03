import { useState } from 'react';
import { AuthTemplate } from '../components/templates/AuthTemplate';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';

export function LoginPage() {
    const [activeTab, setActiveTab] = useState('login');

    return (
        <AuthTemplate>
            <div className="login-card card p-4 shadow">
                <div className="text-center mb-4">
                    <img src="/img/logo_pethome.svg" alt="Logo" className="img-logo mb-3" />
                    <h2 className="text-primary">Bienvenido</h2>
                    <p className="text-muted">Accede o crea tu cuenta</p>
                </div>

                {/* Tabs */}
                <ul className="nav nav-pills justify-content-center mb-4" id="loginTabs" role="tablist">
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
                            <form>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Correo Electrónico</label>
                                    <Input type="email" placeholder="ejemplo@correo.com" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Contraseña</label>
                                    <Input type="password" placeholder="••••••••" required />
                                </div>
                                <div className="form-check mb-3">
                                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                                    <label className="form-check-label" htmlFor="rememberMe">Recordarme</label>
                                </div>
                                <Button variant="primary" type="submit" className="w-100 mb-3">
                                    Ingresar
                                </Button>
                                <div className="text-center">
                                    <a href="#" className="text-primary">¿Olvidaste tu contraseña?</a>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* REGISTER FORM */}
                    {activeTab === 'register' && (
                        <div className="tab-pane fade show active">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Nombre Completo</label>
                                    <Input type="text" placeholder="Juan Pérez" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Correo Electrónico</label>
                                    <Input type="email" placeholder="ejemplo@correo.com" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Contraseña</label>
                                    <Input type="password" placeholder="••••••••" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Confirmar Contraseña</label>
                                    <Input type="password" placeholder="••••••••" required />
                                </div>
                                <Button variant="primary" type="submit" className="w-100">
                                    Crear Cuenta
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </AuthTemplate>
    );
}