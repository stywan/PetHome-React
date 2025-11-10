import { useState, useMemo } from 'react';
import { VetDashboardTemplate } from '../../components/templates/VetDashboardTemplate';
import { Card } from '../../components/atoms/Card';
import { Icon } from '../../components/atoms/Icon';
import { StatusBadge } from '../../components/atoms/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../context/AppointmentContext';

function VetReportsPage() {
    const { user } = useAuth();
    const { getAppointmentsByVet } = useAppointments();
    const [dateRange, setDateRange] = useState('month'); // week, month, year, custom

    // Obtener todas las citas del veterinario (usa automáticamente el veterinarianId correcto)
    const allAppointments = user ? getAppointmentsByVet() : [];

    // Calcular estadísticas
    const statistics = useMemo(() => {
        const total = allAppointments.length;
        const completed = allAppointments.filter(apt => apt.status === 'completed').length;
        const cancelled = allAppointments.filter(apt => apt.status === 'cancelled').length;
        const pending = allAppointments.filter(apt => apt.status === 'pending').length;
        const confirmed = allAppointments.filter(apt => apt.status === 'confirmed').length;

        // Calcular ingresos totales basados en el precio real de cada servicio
        const totalRevenue = allAppointments
            .filter(apt => apt.status === 'completed')
            .reduce((sum, apt) => sum + (apt.service?.price || 0), 0);

        // Agrupar por servicio
        const serviceCount = {};
        allAppointments.forEach(apt => {
            const serviceName = apt.service?.name || 'Sin especificar';
            serviceCount[serviceName] = (serviceCount[serviceName] || 0) + 1;
        });

        // Servicio más solicitado
        const mostRequestedService = Object.entries(serviceCount)
            .sort((a, b) => b[1] - a[1])[0];

        // Tasa de completitud
        const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;

        // Tasa de cancelación
        const cancellationRate = total > 0 ? ((cancelled / total) * 100).toFixed(1) : 0;

        return {
            total,
            completed,
            cancelled,
            pending,
            confirmed,
            totalRevenue,
            serviceCount,
            mostRequestedService,
            completionRate,
            cancellationRate
        };
    }, [allAppointments]);

    return (
        <VetDashboardTemplate title="Reportes y Estadísticas">
            <div className="row g-4">
                {/* Selector de rango de fecha */}
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h5 className="mb-1">
                                        <Icon name="calendar-alt" className="me-2" />
                                        Período de análisis
                                    </h5>
                                    <small className="text-muted">Selecciona el rango de fechas para el reporte</small>
                                </div>
                                <select
                                    className="form-select w-auto"
                                    value={dateRange}
                                    onChange={(e) => setDateRange(e.target.value)}
                                >
                                    <option value="week">Última semana</option>
                                    <option value="month">Último mes</option>
                                    <option value="year">Último año</option>
                                    <option value="all">Todos los tiempos</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Estadísticas principales */}
                <div className="col-12">
                    <h5 className="mb-3">
                        <Icon name="chart-line" className="me-2" />
                        Resumen General
                    </h5>
                </div>

                <div className="col-md-3">
                    <Card>
                        <Card.Body>
                            <div className="text-center">
                                <Icon name="calendar-check" size="2x" className="text-primary mb-3" />
                                <h3 className="mb-1">{statistics.total}</h3>
                                <p className="text-muted mb-0">Total de Citas</p>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-3">
                    <Card>
                        <Card.Body>
                            <div className="text-center">
                                <Icon name="check-circle" size="2x" className="text-success mb-3" />
                                <h3 className="mb-1">{statistics.completed}</h3>
                                <p className="text-muted mb-0">Completadas</p>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-3">
                    <Card>
                        <Card.Body>
                            <div className="text-center">
                                <Icon name="clock" size="2x" className="text-warning mb-3" />
                                <h3 className="mb-1">{statistics.pending + statistics.confirmed}</h3>
                                <p className="text-muted mb-0">Pendientes</p>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-3">
                    <Card>
                        <Card.Body>
                            <div className="text-center">
                                <Icon name="times-circle" size="2x" className="text-danger mb-3" />
                                <h3 className="mb-1">{statistics.cancelled}</h3>
                                <p className="text-muted mb-0">Canceladas</p>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                {/* Métricas de rendimiento */}
                <div className="col-12 mt-4">
                    <h5 className="mb-3">
                        <Icon name="tachometer-alt" className="me-2" />
                        Métricas de Rendimiento
                    </h5>
                </div>

                <div className="col-md-4">
                    <Card>
                        <Card.Body>
                            <h6 className="text-muted mb-2">Tasa de Completitud</h6>
                            <h3 className="text-success mb-2">{statistics.completionRate}%</h3>
                            <div className="progress" style={{ height: '8px' }}>
                                <div
                                    className="progress-bar bg-success"
                                    style={{ width: `${statistics.completionRate}%` }}
                                />
                            </div>
                            <small className="text-muted mt-2 d-block">
                                {statistics.completed} de {statistics.total} citas completadas
                            </small>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-4">
                    <Card>
                        <Card.Body>
                            <h6 className="text-muted mb-2">Tasa de Cancelación</h6>
                            <h3 className="text-danger mb-2">{statistics.cancellationRate}%</h3>
                            <div className="progress" style={{ height: '8px' }}>
                                <div
                                    className="progress-bar bg-danger"
                                    style={{ width: `${statistics.cancellationRate}%` }}
                                />
                            </div>
                            <small className="text-muted mt-2 d-block">
                                {statistics.cancelled} de {statistics.total} citas canceladas
                            </small>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-4">
                    <Card>
                        <Card.Body>
                            <h6 className="text-muted mb-2">Ingresos Estimados</h6>
                            <h3 className="text-primary mb-2">
                                ${statistics.totalRevenue.toLocaleString('es-CL')}
                            </h3>
                            <small className="text-muted d-block">
                                Basado en citas completadas
                            </small>
                        </Card.Body>
                    </Card>
                </div>

                {/* Servicios más solicitados */}
                <div className="col-12 mt-4">
                    <h5 className="mb-3">
                        <Icon name="star" className="me-2" />
                        Servicios Más Solicitados
                    </h5>
                </div>

                <div className="col-12">
                    <Card>
                        <Card.Body>
                            {Object.keys(statistics.serviceCount).length === 0 ? (
                                <p className="text-muted text-center mb-0">No hay datos disponibles</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Servicio</th>
                                                <th className="text-end">Cantidad</th>
                                                <th className="text-end">Porcentaje</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(statistics.serviceCount)
                                                .sort((a, b) => b[1] - a[1])
                                                .map(([service, count]) => {
                                                    const percentage = ((count / statistics.total) * 100).toFixed(1);
                                                    return (
                                                        <tr key={service}>
                                                            <td>
                                                                <Icon name="stethoscope" className="me-2 text-primary" />
                                                                {service}
                                                            </td>
                                                            <td className="text-end">
                                                                <strong>{count}</strong>
                                                            </td>
                                                            <td className="text-end">
                                                                <span className="badge bg-primary">{percentage}%</span>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </div>

                {/* Información adicional */}
                <div className="col-12 mt-3">
                    <div className="alert alert-info d-flex align-items-center">
                        <Icon name="info-circle" className="me-2" size="lg" />
                        <div>
                            <strong>Nota:</strong> Los reportes se actualizan en tiempo real basados en tus citas.
                            Los ingresos mostrados son estimaciones basadas en un precio promedio por consulta.
                        </div>
                    </div>
                </div>
            </div>
        </VetDashboardTemplate>
    );
}

export default VetReportsPage;
