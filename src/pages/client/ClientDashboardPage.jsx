import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientDashboardTemplate } from '../../components/templates/ClientDashboardTemplate';
import { StatsCard } from '../../components/molecules/StatsCard';
import { AppointmentCard } from '../../components/molecules/AppointmentCard';
import { PetCard } from '../../components/molecules/PetCard';
import { EmptyState } from '../../components/molecules/EmptyState';
import { Button } from '../../components/atoms/Button';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../context/AppointmentContext';
import { usePets } from '../../context/PetContext';
import { useVeterinarians } from '../../context/VeterinarianContext';
import { services } from '../../data/servicesData';

function ClientDashboardPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { getUpcomingAppointments } = useAppointments();
    const { getPetsByOwner, calculatePetAge } = usePets();
    const { veterinarians, loadVeterinarians } = useVeterinarians();

    // Cargar veterinarios al montar el componente
    useEffect(() => {
        if (veterinarians.length === 0) {
            loadVeterinarians();
        }
    }, []);

    const upcomingAppointments = getUpcomingAppointments(user?.id).slice(0, 3);
    const myPets = getPetsByOwner(user?.id);

    const getAppointmentDetails = (appointment) => {
        const service = services.find(s => parseInt(s.id) === parseInt(appointment.serviceId));
        const pet = myPets.find(p => p.id === appointment.petId);
        const vet = veterinarians.find(v => v.id === appointment.veterinarianId);
        return { service, pet, veterinarian: vet };
    };

    return (
        <ClientDashboardTemplate title="Dashboard">
            {/* Welcome Section */}
            <div className="mb-4">
                <h2>Bienvenido, {user?.name}!</h2>
                <p className="text-muted">Gestiona tus citas y mascotas desde aquí</p>
            </div>

            {/* Stats Cards */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <StatsCard
                        icon="calendar-check"
                        title="Próximas Citas"
                        value={upcomingAppointments.length}
                        variant="primary"
                    />
                </div>
                <div className="col-md-4">
                    <StatsCard
                        icon="paw"
                        title="Mis Mascotas"
                        value={myPets.length}
                        variant="success"
                    />
                </div>
                <div className="col-md-4">
                    <StatsCard
                        icon="stethoscope"
                        title="Servicios Disponibles"
                        value={services.length}
                        variant="info"
                    />
                </div>
            </div>

            {/* Quick Actions */}
            <div className="row g-3 mb-4">
                <div className="col-md-6">
                    <Button
                        variant="primary"
                        className="w-100 py-3"
                        onClick={() => navigate('/services')}
                    >
                        <i className="fas fa-plus-circle me-2"></i>
                        Solicitar Nueva Cita
                    </Button>
                </div>
                <div className="col-md-6">
                    <Button
                        variant="outline"
                        className="w-100 py-3"
                        onClick={() => navigate('/dashboard/pets')}
                    >
                        <i className="fas fa-paw me-2"></i>
                        Agregar Mascota
                    </Button>
                </div>
            </div>

            {/* Upcoming Appointments Section */}
            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4>Próximas Citas</h4>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/dashboard/appointments')}
                    >
                        Ver todas
                    </Button>
                </div>

                {upcomingAppointments.length > 0 ? (
                    <div className="row">
                        {upcomingAppointments.map((appointment) => {
                            const { service, pet, veterinarian } = getAppointmentDetails(appointment);
                            return (
                                <div key={appointment.id} className="col-12">
                                    <AppointmentCard
                                        appointment={appointment}
                                        service={service}
                                        pet={pet}
                                        veterinarian={veterinarian}
                                        userType="client"
                                        onViewDetails={() => navigate('/dashboard/appointments')}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <EmptyState
                        icon="calendar-times"
                        title="No tienes citas próximas"
                        message="Agenda tu primera cita con uno de nuestros veterinarios"
                        actionLabel="Solicitar Cita"
                        onAction={() => navigate('/services')}
                        variant="primary"
                    />
                )}
            </div>

            {/* My Pets Section */}
            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4>Mis Mascotas</h4>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/dashboard/pets')}
                    >
                        Ver todas
                    </Button>
                </div>

                {myPets.length > 0 ? (
                    <div className="row">
                        {myPets.slice(0, 3).map((pet) => (
                            <div key={pet.id} className="col-md-6 col-lg-4">
                                <PetCard
                                    pet={pet}
                                    calculateAge={calculatePetAge}
                                    onEdit={() => navigate('/dashboard/pets')}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon="paw"
                        title="No tienes mascotas registradas"
                        message="Agrega tu primera mascota para comenzar"
                        actionLabel="Agregar Mascota"
                        onAction={() => navigate('/dashboard/pets')}
                        variant="primary"
                    />
                )}
            </div>
        </ClientDashboardTemplate>
    );
}

export default ClientDashboardPage;
