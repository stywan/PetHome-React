import { useState, useEffect } from 'react';
import { ClientDashboardTemplate } from '../../components/templates/ClientDashboardTemplate';
import { AppointmentCard } from '../../components/molecules/AppointmentCard';
import { EmptyState } from '../../components/molecules/EmptyState';
import { Button } from '../../components/atoms/Button';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../context/AppointmentContext';
import { usePets } from '../../context/PetContext';
import { useVeterinarians } from '../../context/VeterinarianContext';
import { services } from '../../data/servicesData';
import { useNavigate } from 'react-router-dom';

function MyAppointmentsPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { getAppointmentsByClient, getUpcomingAppointments, getAppointmentHistory, cancelAppointment } = useAppointments();
    const { getPetsByOwner } = usePets();
    const { veterinarians, loadVeterinarians } = useVeterinarians();

    // Cargar veterinarios al montar el componente
    useEffect(() => {
        if (veterinarians.length === 0) {
            loadVeterinarians();
        }
    }, []);

    const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'history'

    const upcomingAppointments = getUpcomingAppointments(user?.id);
    const historyAppointments = getAppointmentHistory(user?.id);
    const myPets = getPetsByOwner(user?.id);

    const currentAppointments = activeTab === 'upcoming' ? upcomingAppointments : historyAppointments;

    const getAppointmentDetails = (appointment) => {
        const service = services.find(s => parseInt(s.id) === parseInt(appointment.serviceId));
        const pet = myPets.find(p => p.id === appointment.petId);
        const vet = veterinarians.find(v => v.id === appointment.veterinarianId);
        return { service, pet, veterinarian: vet };
    };

    const handleCancelAppointment = (appointmentId) => {
        if (window.confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
            cancelAppointment(appointmentId, 'Cancelada por el cliente');
            alert('Cita cancelada exitosamente');
        }
    };

    return (
        <ClientDashboardTemplate title="Mis Citas">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3>Mis Citas</h3>
                    <p className="text-muted mb-0">Gestiona tus citas veterinarias</p>
                </div>
                <Button
                    variant="primary"
                    onClick={() => navigate('/services')}
                >
                    <i className="fas fa-plus me-2"></i>
                    Nueva Cita
                </Button>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'upcoming' ? 'active' : ''}`}
                        onClick={() => setActiveTab('upcoming')}
                    >
                        <i className="fas fa-calendar-day me-2"></i>
                        Próximas ({upcomingAppointments.length})
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        <i className="fas fa-history me-2"></i>
                        Historial ({historyAppointments.length})
                    </button>
                </li>
            </ul>

            {/* Appointments List */}
            {currentAppointments.length > 0 ? (
                <div className="row">
                    {currentAppointments.map((appointment) => {
                        const { service, pet, veterinarian } = getAppointmentDetails(appointment);
                        return (
                            <div key={appointment.id} className="col-12">
                                <AppointmentCard
                                    appointment={appointment}
                                    service={service}
                                    pet={pet}
                                    veterinarian={veterinarian}
                                    userType="client"
                                    onCancel={activeTab === 'upcoming' ? handleCancelAppointment : null}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <EmptyState
                    icon={activeTab === 'upcoming' ? 'calendar-times' : 'history'}
                    title={
                        activeTab === 'upcoming'
                            ? 'No tienes citas próximas'
                            : 'No tienes historial de citas'
                    }
                    message={
                        activeTab === 'upcoming'
                            ? 'Agenda tu primera cita con uno de nuestros veterinarios'
                            : 'Aquí aparecerán tus citas completadas y pasadas'
                    }
                    actionLabel={activeTab === 'upcoming' ? 'Solicitar Cita' : null}
                    onAction={activeTab === 'upcoming' ? () => navigate('/services') : null}
                    variant="primary"
                />
            )}
        </ClientDashboardTemplate>
    );
}

export default MyAppointmentsPage;
