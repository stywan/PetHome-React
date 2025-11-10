import { Card } from '../atoms/Card';
import { Avatar } from '../atoms/Avatar';
import { Tag } from '../atoms/Tag';
import { Icon } from '../atoms/Icon';

// Traducciones de especies
const speciesTranslations = {
    'DOG': 'Perro',
    'CAT': 'Gato',
    'BIRD': 'Ave',
    'RABBIT': 'Conejo',
    'HAMSTER': 'Hámster',
    'OTHER': 'Otro'
};

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

export function PetMedicalCard({ pet, latestRecord, calculateAge }) {
    const age = calculateAge ? calculateAge(pet.birthDate) : null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Card shadow="sm">
            <Card.Body>
                <div className="d-flex align-items-start gap-3">
                    <Avatar
                        src={pet.photo}
                        alt={pet.name}
                        size="lg"
                        shape="rounded"
                    />

                    <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <h5 className="mb-1">{pet.name}</h5>
                                <div className="d-flex gap-2 flex-wrap">
                                    <Tag variant="primary" size="sm">
                                        {speciesTranslations[pet.species]}
                                    </Tag>
                                    <Tag variant="light" size="sm">
                                        {pet.breed}
                                    </Tag>
                                    {age !== null && (
                                        <span className="text-muted small">
                                            {age} {age === 1 ? 'año' : 'años'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row g-2 mb-3">
                            <div className="col-6">
                                <small className="text-muted d-block">Peso</small>
                                <strong>{latestRecord?.weight || pet.weight} kg</strong>
                            </div>
                            <div className="col-6">
                                <small className="text-muted d-block">Color</small>
                                <strong>{pet.color}</strong>
                            </div>
                        </div>

                        {latestRecord && (
                            <div className="border-top pt-2">
                                <small className="text-muted d-block mb-1">Última Consulta</small>
                                <div className="d-flex align-items-center gap-2">
                                    <Tag variant="info" size="sm">
                                        {medicalRecordTypeTranslations[latestRecord.type]}
                                    </Tag>
                                    <small className="text-muted">
                                        {formatDate(latestRecord.date)}
                                    </small>
                                </div>
                            </div>
                        )}

                        {pet.microchip && (
                            <div className="mt-2">
                                <small className="text-muted">
                                    <Icon name="microchip" className="me-1" />
                                    {pet.microchip}
                                </small>
                            </div>
                        )}
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
