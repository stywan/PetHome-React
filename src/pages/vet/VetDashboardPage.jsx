import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VetDashboardTemplate } from '../../components/templates/VetDashboardTemplate';
import { StatsCard } from '../../components/molecules/StatsCard';
import { DailyAgenda } from '../../components/organisms/vet/DailyAgenda';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../context/AppointmentContext';

function VetDashboardPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { getTodayAppointments, getAppointmentsByVet } = useAppointments();

    const today = new Date().toISOString().split('T')[0];
    // No pasar parámetro - el contexto usará automáticamente el veterinarianId correcto
    const todayAppointments = getTodayAppointments();
    const allAppointments = getAppointmentsByVet();

    const completedToday = todayAppointments.filter(apt => apt.status === 'completed').length;
    const pendingToday = todayAppointments.filter(apt => apt.status === 'pending' || apt.status === 'confirmed').length;

    const handleAppointmentClick = (appointment) => {
        navigate(`/vet/appointment/${appointment.id}`);
    };

    const formatToday = () => {
        const date = new Date();
        return date.toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <VetDashboardTemplate title="Agenda del Día">
            {/* Welcome Section */}
            <div className="mb-4">
                <h2>Bienvenido, {user?.name}!</h2>
                <p className="text-muted">
                    <i className="fas fa-calendar me-2"></i>
                    {formatToday()}
                </p>
            </div>

            {/* Stats Cards */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <StatsCard
                        icon="calendar-check"
                        title="Citas de Hoy"
                        value={todayAppointments.length}
                        variant="primary"
                    />
                </div>
                <div className="col-md-4">
                    <StatsCard
                        icon="check-circle"
                        title="Completadas Hoy"
                        value={completedToday}
                        variant="success"
                    />
                </div>
                <div className="col-md-4">
                    <StatsCard
                        icon="clock"
                        title="Pendientes Hoy"
                        value={pendingToday}
                        variant="warning"
                    />
                </div>
            </div>

            {/* Daily Agenda */}
            <DailyAgenda
                appointments={todayAppointments}
                onAppointmentClick={handleAppointmentClick}
            />
        </VetDashboardTemplate>
    );
}

export default VetDashboardPage;
