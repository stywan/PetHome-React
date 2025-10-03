import { Link } from 'react-router-dom';
import { Logo } from '../atoms/Logo';
import { Button } from '../atoms/Button';
import { useCart } from '../../context/CartContext';

export function Navbar({ onCartToggle }) {
    const { getCartTotals } = useCart();
    const { totalItems } = getCartTotals();

    return (
        <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container">
                <Logo />

                <div className="d-flex align-items-center ms-auto d-lg-none">
                    <button
                        className="btn btn-outline-primary position-relative me-2"
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

                    <div className="d-flex justify-content-center gap-2 mt-3 mt-lg-0">
                        <Button variant="service" size="lg" className="px-4">
                            Agendar Servicio
                        </Button>
                        <Button variant="login" to="/login">
                            Iniciar Sesión
                        </Button>

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