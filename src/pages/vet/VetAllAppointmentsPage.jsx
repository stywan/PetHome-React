import { useState } from 'react';
import { VetDashboardTemplate } from '../../components/templates/VetDashboardTemplate';
import { AppointmentCard } from '../../components/molecules/AppointmentCard';
import { EmptyState } from '../../components/molecules/EmptyState';
import { StatusBadge } from '../../components/atoms/StatusBadge';
import { Icon } from '../../components/atoms/Icon';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../context/AppointmentContext';

function VetAllAppointmentsPage() {
    const { user } = useAuth();
    const { getAppointmentsByVet } = useAppointments();
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Obtener todas las citas del veterinario (usa automáticamente el veterinarianId correcto)
    const allAppointments = user ? getAppointmentsByVet() : [];

    // Filtrar por estado
    const filteredByStatus = filterStatus === 'all'
        ? allAppointments
        : allAppointments.filter(apt => apt.status === filterStatus);

    // Filtrar por búsqueda (nombre del cliente o mascota)
    const filteredAppointments = filteredByStatus.filter(apt => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
            apt.clientName?.toLowerCase().includes(searchLower) ||
            apt.petName?.toLowerCase().includes(searchLower) ||
            apt.service?.toLowerCase().includes(searchLower)
        );
    });

    // Contar por estado
    const statusCounts = {
        all: allAppointments.length,
        pending: allAppointments.filter(apt => apt.status === 'pending').length,
        confirmed: allAppointments.filter(apt => apt.status === 'confirmed').length,
        completed: allAppointments.filter(apt => apt.status === 'completed').length,
        cancelled: allAppointments.filter(apt => apt.status === 'cancelled').length
    };

    return (
        <VetDashboardTemplate title="Todas las Citas">
            <div className="row g-4">
                {/* Filtros y búsqueda */}
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row g-3 align-items-end">
                                {/* Barra de búsqueda */}
                                <div className="col-md-6">
                                    <label className="form-label">
                                        <Icon name="search" className="me-2" />
                                        Buscar cita
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Buscar por cliente, mascota o servicio..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                {/* Filtro por estado */}
                                <div className="col-md-6">
                                    <label className="form-label">
                                        <Icon name="filter" className="me-2" />
                                        Filtrar por estado
                                    </label>
                                    <select
                                        className="form-select"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <option value="all">Todos ({statusCounts.all})</option>
                                        <option value="pending">Pendientes ({statusCounts.pending})</option>
                                        <option value="confirmed">Confirmadas ({statusCounts.confirmed})</option>
                                        <option value="completed">Completadas ({statusCounts.completed})</option>
                                        <option value="cancelled">Canceladas ({statusCounts.cancelled})</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Estadísticas rápidas */}
                <div className="col-12">
                    <div className="row g-3">
                        <div className="col-md-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h3 className="text-primary mb-1">{statusCounts.pending}</h3>
                                    <small className="text-muted">Pendientes</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h3 className="text-success mb-1">{statusCounts.confirmed}</h3>
                                    <small className="text-muted">Confirmadas</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h3 className="text-info mb-1">{statusCounts.completed}</h3>
                                    <small className="text-muted">Completadas</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h3 className="text-danger mb-1">{statusCounts.cancelled}</h3>
                                    <small className="text-muted">Canceladas</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lista de citas */}
                <div className="col-12">
                    {filteredAppointments.length === 0 ? (
                        <EmptyState
                            icon="calendar-times"
                            title="No se encontraron citas"
                            message={
                                searchTerm
                                    ? "No hay citas que coincidan con tu búsqueda"
                                    : filterStatus === 'all'
                                        ? "No tienes citas programadas"
                                        : `No tienes citas ${filterStatus === 'pending' ? 'pendientes' : filterStatus === 'confirmed' ? 'confirmadas' : filterStatus === 'completed' ? 'completadas' : 'canceladas'}`
                            }
                        />
                    ) : (
                        <div className="row g-3">
                            {filteredAppointments.map((appointment) => (
                                <div key={appointment.id} className="col-md-6 col-lg-4">
                                    <AppointmentCard appointment={appointment} userType="vet" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </VetDashboardTemplate>
    );
}

export default VetAllAppointmentsPage;
