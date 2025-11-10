import { Card } from '../atoms/Card';
import { StatusBadge } from '../atoms/StatusBadge';
import { Icon } from '../atoms/Icon';
import { Button } from '../atoms/Button';

export function AppointmentCard({ appointment, service, pet, veterinarian, client, userType, onViewDetails, onCancel }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Si no se pasan como props separados, tomarlos del appointment
    const appointmentService = service || appointment.service;
    const appointmentPet = pet || appointment.pet;
    const appointmentVeterinarian = veterinarian || appointment.veterinarian;
    const appointmentClient = client || appointment.client;

    return (
        <Card className="mb-3" hoverable shadow="sm">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h5 className="mb-1 text-primary">{appointmentService?.name || 'Servicio no disponible'}</h5>
                        <p className="text-muted mb-0 small">
                            <Icon name="calendar" className="me-1" />
                            {formatDate(appointment.date)} - {appointment.time}
                        </p>
                    </div>
                    <StatusBadge status={appointment.status} />
                </div>

                <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                        <Icon name="paw" className="text-primary me-2" />
                        <span><strong>Mascota:</strong> {appointmentPet?.name || 'No disponible'} {appointmentPet?.species ? `(${appointmentPet.species})` : ''}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                        {userType === 'vet' ? (
                            <>
                                <Icon name="user" className="text-primary me-2" />
                                <span><strong>Cliente:</strong> {appointmentClient?.name || 'No disponible'}</span>
                            </>
                        ) : (
                            <>
                                <Icon name="user-md" className="text-primary me-2" />
                                <span><strong>Veterinario:</strong> {appointmentVeterinarian?.userName || appointmentVeterinarian?.name || 'No disponible'}</span>
                            </>
                        )}
                    </div>
                    <div className="d-flex align-items-center">
                        <Icon name="map-marker-alt" className="text-primary me-2" />
                        <span className="small text-muted">{appointment.address}</span>
                    </div>
                </div>

                {appointment.notes && (
                    <div className="mb-3">
                        <p className="small mb-0">
                            <strong>Notas:</strong> {appointment.notes}
                        </p>
                    </div>
                )}

                <div className="d-flex gap-2">
                    {onViewDetails && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onViewDetails(appointment)}
                            className="flex-grow-1"
                        >
                            <Icon name="eye" className="me-1" />
                            Ver Detalles
                        </Button>
                    )}
                    {onCancel && appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => onCancel(appointment.id)}
                        >
                            <Icon name="times" className="me-1" />
                            Cancelar
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}
