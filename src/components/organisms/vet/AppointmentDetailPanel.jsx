import { useState } from 'react';
import { Card } from '../../atoms/Card';
import { Button } from '../../atoms/Button';
import { StatusBadge } from '../../atoms/StatusBadge';
import { Icon } from '../../atoms/Icon';
import { FormField } from '../../molecules/FormField';
import { ClientInfoCard } from '../../molecules/ClientInfoCard';
import { PetMedicalCard } from '../../molecules/PetMedicalCard';

export function AppointmentDetailPanel({
    appointment,
    service,
    pet,
    client,
    address,
    latestMedicalRecord,
    calculateAge,
    onConfirm,
    onComplete,
    onCancel
}) {
    const [showCompleteForm, setShowCompleteForm] = useState(false);
    const [formData, setFormData] = useState({
        diagnosis: '',
        prescription: '',
        weight: pet?.weight || '',
        temperature: '',
        heartRate: '',
        notes: ''
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleComplete = () => {
        if (formData.diagnosis && formData.prescription) {
            onComplete(appointment.id, formData);
            setShowCompleteForm(false);
        } else {
            alert('Por favor completa el diagnóstico y la prescripción');
        }
    };

    return (
        <div className="row g-3">
            {/* Appointment Info */}
            <div className="col-12">
                <Card>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                                <h4 className="mb-2">{service?.name}</h4>
                                <p className="text-muted mb-0">
                                    <Icon name="calendar" className="me-2" />
                                    {formatDate(appointment.date)} - {appointment.time}
                                </p>
                            </div>
                            <StatusBadge status={appointment.status} />
                        </div>

                        {/* Notas del cliente */}
                        {appointment.notes && (
                            <div className="alert alert-info mb-2">
                                <strong>Notas del cliente:</strong> {appointment.notes}
                            </div>
                        )}

                        {/* Mensaje si ya está confirmada */}
                        {appointment.status === 'confirmed' && !showCompleteForm && (
                            <div className="alert alert-success mb-3">
                                <Icon name="check-circle" className="me-2" />
                                <strong>Cita confirmada.</strong> Lista para ser atendida.
                            </div>
                        )}

                        {/* Actions */}
                        {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                            <div className="d-flex gap-2 mt-3">
                                {/* Confirmar cita (solo si está pendiente) */}
                                {appointment.status === 'pending' && onConfirm && (
                                    <Button
                                        variant="success"
                                        onClick={() => onConfirm(appointment.id)}
                                        className="flex-grow-1"
                                    >
                                        <Icon name="check" className="me-2" />
                                        Confirmar Cita
                                    </Button>
                                )}

                                {/* Completar cita (solo si está confirmada o pendiente) */}
                                {!showCompleteForm && (
                                    <Button
                                        variant="primary"
                                        onClick={() => setShowCompleteForm(true)}
                                        className="flex-grow-1"
                                    >
                                        <Icon name="check-circle" className="me-2" />
                                        Completar Cita
                                    </Button>
                                )}

                                {/* Cancelar cita */}
                                {onCancel && (
                                    <Button
                                        variant="danger"
                                        onClick={() => onCancel(appointment.id)}
                                    >
                                        <Icon name="times" className="me-2" />
                                        Cancelar
                                    </Button>
                                )}
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </div>

            {/* Client Info */}
            <div className="col-md-6">
                <ClientInfoCard client={client} address={address} />
            </div>

            {/* Pet Info */}
            <div className="col-md-6">
                <PetMedicalCard
                    pet={pet}
                    latestRecord={latestMedicalRecord}
                    calculateAge={calculateAge}
                />
            </div>

            {/* Complete Appointment Form */}
            {showCompleteForm && (
                <div className="col-12">
                    <Card>
                        <Card.Body>
                            <h5 className="mb-4">Completar Consulta</h5>

                            <div className="row">
                                <div className="col-md-4">
                                    <FormField
                                        type="number"
                                        label="Peso (kg)"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        step="0.1"
                                    />
                                </div>
                                <div className="col-md-4">
                                    <FormField
                                        type="number"
                                        label="Temperatura (°C)"
                                        name="temperature"
                                        value={formData.temperature}
                                        onChange={handleChange}
                                        step="0.1"
                                    />
                                </div>
                                <div className="col-md-4">
                                    <FormField
                                        type="number"
                                        label="Frecuencia Cardíaca (lpm)"
                                        name="heartRate"
                                        value={formData.heartRate}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-12">
                                    <FormField
                                        type="textarea"
                                        label="Diagnóstico"
                                        name="diagnosis"
                                        value={formData.diagnosis}
                                        onChange={handleChange}
                                        rows={3}
                                        required
                                    />
                                </div>

                                <div className="col-12">
                                    <FormField
                                        type="textarea"
                                        label="Prescripción / Tratamiento"
                                        name="prescription"
                                        value={formData.prescription}
                                        onChange={handleChange}
                                        rows={3}
                                        required
                                    />
                                </div>

                                <div className="col-12">
                                    <FormField
                                        type="textarea"
                                        label="Notas Adicionales"
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        rows={2}
                                    />
                                </div>
                            </div>

                            <div className="d-flex gap-2 justify-content-end mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowCompleteForm(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button variant="primary" onClick={handleComplete}>
                                    Guardar y Completar
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            )}

            {/* Show results if completed */}
            {appointment.status === 'completed' && (
                <div className="col-12">
                    <Card>
                        <Card.Body>
                            <h5 className="mb-3">Resumen de la Consulta</h5>

                            {appointment.diagnosis && (
                                <div className="mb-3">
                                    <strong>Diagnóstico:</strong>
                                    <p className="mb-0">{appointment.diagnosis}</p>
                                </div>
                            )}

                            {appointment.prescription && (
                                <div className="mb-3">
                                    <strong>Prescripción:</strong>
                                    <p className="mb-0">{appointment.prescription}</p>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div>
    );
}
