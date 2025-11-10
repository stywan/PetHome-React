import { Card } from '../atoms/Card';
import { Avatar } from '../atoms/Avatar';
import { Tag } from '../atoms/Tag';
import { Icon } from '../atoms/Icon';
import { Button } from '../atoms/Button';

// Traducciones de especies
const speciesTranslations = {
    'DOG': 'Perro',
    'CAT': 'Gato',
    'BIRD': 'Ave',
    'RABBIT': 'Conejo',
    'HAMSTER': 'Hámster',
    'OTHER': 'Otro'
};

export function PetCard({ pet, onEdit, onViewHistory, calculateAge }) {
    const age = calculateAge ? calculateAge(pet.birthDate) : null;

    const speciesIcons = {
        DOG: 'dog',
        CAT: 'cat',
        BIRD: 'dove',
        RABBIT: 'rabbit',
        HAMSTER: 'hamster',
        OTHER: 'paw'
    };

    return (
        <Card className="mb-3" hoverable shadow="sm">
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
                                <div className="d-flex gap-2 align-items-center">
                                    <Tag variant="primary" size="sm">
                                        <Icon name={speciesIcons[pet.species]} className="me-1" />
                                        {speciesTranslations[pet.species]}
                                    </Tag>
                                    {age !== null && (
                                        <span className="text-muted small">
                                            {age} {age === 1 ? 'año' : 'años'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <p className="mb-1 small">
                                <strong>Raza:</strong> {pet.breed}
                            </p>
                            <p className="mb-1 small">
                                <strong>Color:</strong> {pet.color}
                            </p>
                            <p className="mb-1 small">
                                <strong>Peso:</strong> {pet.weight} kg
                            </p>
                            {pet.microchip && (
                                <p className="mb-0 small">
                                    <Icon name="microchip" className="text-primary me-1" />
                                    <strong>Microchip:</strong> {pet.microchip}
                                </p>
                            )}
                        </div>

                        <div className="d-flex gap-2">
                            {onViewHistory && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onViewHistory(pet)}
                                    className="flex-grow-1"
                                >
                                    <Icon name="file-medical" className="me-1" />
                                    Historial
                                </Button>
                            )}
                            {onEdit && (
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => onEdit(pet)}
                                >
                                    <Icon name="edit" className="me-1" />
                                    Editar
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
