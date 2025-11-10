import { Card } from '../../atoms/Card';
import { Tag } from '../../atoms/Tag';
import { Icon } from '../../atoms/Icon';
import { EmptyState } from '../../molecules/EmptyState';

// Traducciones de tipos de registros médicos
const medicalRecordTypeTranslations = {
    'CONSULTATION': 'Consulta',
    'VACCINATION': 'Vacunación',
    'SURGERY': 'Cirugía',
    'CHECKUP': 'Chequeo',
    'EMERGENCY': 'Emergencia',
    'GROOMING': 'Peluquería',
    'TRAINING': 'Entrenamiento'
};

export function PetMedicalHistory({ medicalHistory }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (!medicalHistory || medicalHistory.length === 0) {
        return (
            <Card>
                <Card.Body>
                    <EmptyState
                        icon="file-medical"
                        title="Sin historial médico"
                        message="Esta mascota aún no tiene registros médicos"
                    />
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card>
            <Card.Header>
                <h5 className="mb-0">Historial Médico</h5>
            </Card.Header>
            <Card.Body>
                <div className="timeline">
                    {medicalHistory.map((record, index) => {
                        return (
                            <div key={record.id} className="timeline-item mb-4 pb-4 border-bottom">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <div>
                                        <h6 className="mb-1">{record.title}</h6>
                                        <div className="d-flex gap-2 align-items-center mb-1">
                                            <Tag variant="info" size="sm">
                                                {medicalRecordTypeTranslations[record.type] || record.type}
                                            </Tag>
                                            <small className="text-muted">
                                                {formatDate(record.date)}
                                            </small>
                                        </div>
                                        {record.veterinarianName && (
                                            <small className="text-muted">
                                                <Icon name="user-md" size="xs" className="me-1" />
                                                {record.veterinarianName}
                                            </small>
                                        )}
                                    </div>
                                </div>

                                {record.diagnosis && (
                                    <div className="mb-2">
                                        <strong className="small">Diagnóstico:</strong>
                                        <p className="mb-0 small">{record.diagnosis}</p>
                                    </div>
                                )}

                                {record.treatment && (
                                    <div className="mb-2">
                                        <strong className="small">Tratamiento:</strong>
                                        <p className="mb-0 small">{record.treatment}</p>
                                    </div>
                                )}

                                {record.prescription && (
                                    <div className="mb-2">
                                        <strong className="small">Prescripción:</strong>
                                        <p className="mb-0 small">{record.prescription}</p>
                                    </div>
                                )}

                                {/* Vital Signs */}
                                {(record.weight || record.temperature || record.heartRate) && (
                                    <div className="mt-2">
                                        <div className="d-flex gap-3 flex-wrap">
                                            {record.weight && (
                                                <small className="text-muted">
                                                    <Icon name="weight" size="xs" className="me-1" />
                                                    <strong>Peso:</strong> {record.weight} kg
                                                </small>
                                            )}
                                            {record.temperature && (
                                                <small className="text-muted">
                                                    <Icon name="thermometer-half" size="xs" className="me-1" />
                                                    <strong>Temp:</strong> {record.temperature}°C
                                                </small>
                                            )}
                                            {record.heartRate && (
                                                <small className="text-muted">
                                                    <Icon name="heartbeat" size="xs" className="me-1" />
                                                    <strong>FC:</strong> {record.heartRate} lpm
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {record.notes && (
                                    <div className="mt-2">
                                        <small className="text-muted fst-italic">{record.notes}</small>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Card.Body>
        </Card>
    );
}
