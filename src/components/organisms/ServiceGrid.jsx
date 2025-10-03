import { ServiceCard } from '../molecules/ServiceCard';

export function ServiceGrid({ services, onViewDetail }) {
    if (services.length === 0) {
        return (
            <div className="col-12 text-center py-5">
                <i className="fas fa-search fa-3x text-muted mb-3"></i>
                <h4 className="text-muted">No se encontraron servicios</h4>
                <p className="text-muted">Intenta ajustar los filtros de búsqueda</p>
            </div>
        );
    }

    return (
        <>
            {services.map(service => (
                <ServiceCard
                    key={service.id}
                    service={service}
                    onViewDetail={onViewDetail}
                />
            ))}
        </>
    );
}