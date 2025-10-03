import { Link } from 'react-router-dom';
import { Button } from '../atoms/Button';

export function Footer() {
    return (
        <footer className="footer-hm">
            <div className="container">
                <div className="row col-footer">
                    <div className="col-md-4 mb-4">
                        <Link to="/">
                            <img className="img-logo-footer mb-3" src="/img/logo_pethome.svg" alt="Logo PetHome" />
                        </Link>
                        <p className="text-footer">Veterinarios a domicilio y atención de calidad para tu mascota.</p>
                        <div className="d-flex gap-2 mt-3">
                            <Button variant="service" size="lg" to="/services">
                                Agendar Servicios
                            </Button>
                            <Button variant="login" size="lg" to="/login">
                                Iniciar Sesión
                            </Button>
                        </div>
                    </div>

                    <div className="col-md-7 ms-auto d-flex flex-column flex-md-row justify-content-end gap-5">
                        <div>
                            <h6 className="fw-bold title-footer">Recursos</h6>
                            <ul className="list-unstyled">
                                <li><Link to="#" className="text-footer-link">Blog</Link></li>
                                <li><Link to="#" className="text-footer-link">Nosotros</Link></li>
                                <li><Link to="#" className="text-footer-link">Casos de éxito</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h6 className="fw-bold title-footer">Contacto</h6>
                            <ul className="list-unstyled">
                                <li>
                                    <a className="text-footer-link" href="mailto:contacto@pethome.cl">contacto@pethome.cl</a>
                                </li>
                                <li>
                                    <a className="text-footer-link" href="tel:+56912345678">+569 1234 5678</a>
                                </li>
                                <li><Link to="#" className="text-footer-link">FAQs</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
                    <p className="text-footer-link">&copy; 2025 PetHome</p>

                    <div className="d-flex gap-3 mb-2 mb-md-0">
                        <a href="#" className="icon-rrss"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#" className="icon-rrss"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" className="icon-rrss"><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>

                    <Link to="#" className="text-footer-link">Términos y Condiciones</Link>
                </div>
            </div>
        </footer>
    );
}