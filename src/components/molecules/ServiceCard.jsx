import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { formatPrice } from '../../utils/formatters';
import { categoryTranslations, animalTranslations } from '../../data/servicesData';

export function ServiceCard({ service, onViewDetail }) {
    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card service-card shadow-sm h-100">
                <img src={service.image} className="card-img-top service-image" alt={service.name} />
                <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title text-primary">{service.name}</h5>
                        <Badge variant="price">{formatPrice(service.price)}</Badge>
                    </div>

                    <p className="card-text text-muted small flex-grow-1">{service.description}</p>

                    <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <Badge variant="duration">
                                <i className="fas fa-clock me-1"></i>
                                {service.duration}
                            </Badge>
                            <Badge variant="light">
                                {categoryTranslations[service.category]}
                            </Badge>
                        </div>

                        <div className="animal-tags">
                            {service.animals.map(animal => (
                                <Badge key={animal} variant="animal">
                                    {animalTranslations[animal]}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <Button
                        variant="card"
                        className="w-100"
                        onClick={() => onViewDetail(service)}
                    >
                        <i className="fas fa-eye me-2"></i>
                        Ver Detalle
                    </Button>
                </div>
            </div>
        </div>
    );
}