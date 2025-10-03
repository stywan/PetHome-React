import { MainTemplate } from '../components/templates/MainTemplate';
import { Button } from '../components/atoms/Button';
import { services } from '../data/servicesData';

export function HomePage() {
    const featuredServices = services.slice(0, 4);

    return (
        <MainTemplate>
            {/* HERO */}
            <section className="py-5">
                <div className="container hero">
                    <div className="row align-items-center">
                        {/* Texto */}
                        <div className="col-12 col-md-6 text-center text-md-start mb-4 mb-md-0">
                            <h1 className="display-5 fw-bold title-hero">
                                Bienestar y salud para tu mascota, <br className="d-md-none" />
                                <span className="txt-dest">tranquilidad para ti</span>
                            </h1>
                            <p className="lead mb-4 bajada-hero">
                                Veterinarios a domicilio, puntuales y profesionales, para que tu mascota reciba atención sin salir de casa.
                            </p>
                            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center justify-content-md-start">
                                <Button variant="primary" size="lg">Crear Cuenta</Button>
                                <Button variant="secondary" size="lg" to="/services">Ver Servicios</Button>
                            </div>
                        </div>

                        {/* Imagen */}
                        <div className="col-12 col-md-6 text-center img-hero-h">
                            <img src="/img/img-hero-home.png" alt="Veterinario a domicilio" className="img-fluid fade-in-right" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Banner CTA */}
            <section className="banner-home py-5">
                <div className="container">
                    <div className="row align-items-center rounded-4">
                        {/* Columna de texto */}
                        <div className="col-12 col-md-6 text-center text-md-start mb-4 mb-md-0">
                            <h2 className="fw-bold mb-3 title-banner-home">
                                Cuidamos de tu mascota, <br className="d-md-none" />
                                <span className="text-banner-dest">sin salir de casa 🐾</span>
                            </h2>
                            <p className="mb-4 bajada-banner-home">
                                Sabemos lo estresante que puede ser llevar a tu mascota a una clínica veterinaria.
                                Con PetHome, conecta con veterinarios de confianza que atienden a domicilio,
                                en el horario que más te acomode y con la tranquilidad de tu hogar.
                            </p>
                            <Button variant="primary" size="lg" className="px-4" to="/services">
                                Agenda tu cita ahora
                            </Button>
                        </div>

                        {/* Columna de imagen */}
                        <div className="col-12 col-md-6 text-center">
                            <img src="/img/img-banner-home.png" alt="mascota en casa" className="img-fluid rounded-3 shadow" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Service */}
            <section className="py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold mb-3 title-banner-home">Atención Veterinaria a Domicilio</h2>
                        <p className="p mb-4 bajada-service-home">Servicios médicos para tu mascota, sin estrés y sin salir de casa</p>
                    </div>
                    <div className="row g-4">
                        {featuredServices.map((service) => (
                            <div key={service.id} className="col-md-6 col-lg-3">
                                <div className="card h-100 shadow-sm card-border-service">
                                    <img src={service.image} className="card-img-top card-img-s" alt={service.name} />
                                    <div className="card-body text-center">
                                        <h3 className="card-title fw-bold title-card-service">{service.name}</h3>
                                        <p className="card-text">{service.description}</p>
                                        <Button variant="primary" className="btn-card-s" to="/services">
                                            Ver más <i className="fa-regular fa-circle-right"></i>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </MainTemplate>
    );
}