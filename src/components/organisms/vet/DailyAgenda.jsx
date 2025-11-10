import { Card } from '../../atoms/Card';
import { AppointmentListItem } from '../../molecules/AppointmentListItem';
import { EmptyState } from '../../molecules/EmptyState';

export function DailyAgenda({ appointments, onAppointmentClick }) {
    if (appointments.length === 0) {
        return (
            <Card>
                <Card.Body>
                    <EmptyState
                        icon="calendar-check"
                        title="No hay citas programadas para hoy"
                        message="Disfruta tu día libre o revisa las citas de otros días"
                    />
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card>
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Agenda del Día</h5>
                    <span className="badge bg-primary">{appointments.length} citas</span>
                </div>
            </Card.Header>
            <Card.Body className="p-0">
                <div className="list-group list-group-flush">
                    {appointments.map((appointment) => {
                        // Los datos ya vienen completos del contexto
                        return (
                            <AppointmentListItem
                                key={appointment.id}
                                appointment={appointment}
                                service={appointment.service}
                                pet={appointment.pet}
                                client={appointment.client}
                                onClick={onAppointmentClick}
                            />
                        );
                    })}
                </div>
            </Card.Body>
        </Card>
    );
}
