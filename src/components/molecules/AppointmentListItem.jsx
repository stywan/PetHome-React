import { StatusBadge } from '../atoms/StatusBadge';
import { Icon } from '../atoms/Icon';
import { Avatar } from '../atoms/Avatar';

export function AppointmentListItem({ appointment, service, pet, client, onClick }) {
    // Obtener la dirección del cliente
    const clientAddress = client?.addresses?.find(addr => addr.isDefault) || client?.addresses?.[0];
    const addressDisplay = clientAddress
        ? `${clientAddress.street}${clientAddress.neighborhood ? ', ' + clientAddress.neighborhood : ''}, ${clientAddress.city}`
        : appointment.address;

    return (
        <div
            className="list-group-item list-group-item-action"
            onClick={() => onClick && onClick(appointment)}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
            <div className="d-flex align-items-center gap-3">
                {/* Hora */}
                <div className="text-center" style={{ minWidth: '60px' }}>
                    <div className="fw-bold text-primary">{appointment.time}</div>
                    <small className="text-muted">{appointment.duration || service?.duration}</small>
                </div>

                {/* Avatar de la mascota */}
                {pet && (
                    <Avatar
                        src={pet.photo}
                        alt={pet.name}
                        size="sm"
                        shape="rounded"
                    />
                )}

                {/* Información */}
                <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                        <div>
                            <h6 className="mb-0">{service?.name}</h6>
                            {pet && client && (
                                <small className="text-muted">
                                    {pet.name} - {client.name}
                                </small>
                            )}
                        </div>
                        <StatusBadge status={appointment.status} />
                    </div>

                    {addressDisplay && (
                        <div className="d-flex align-items-center gap-1 mt-1">
                            <Icon name="map-marker-alt" size="xs" className="text-muted" />
                            <small className="text-muted">{addressDisplay}</small>
                        </div>
                    )}

                    {appointment.notes && (
                        <div className="mt-1">
                            <small className="text-muted">
                                <Icon name="sticky-note" size="xs" className="me-1" />
                                {appointment.notes}
                            </small>
                        </div>
                    )}
                </div>

                {/* Icono de navegación */}
                {onClick && (
                    <Icon name="chevron-right" className="text-muted" />
                )}
            </div>
        </div>
    );
}
