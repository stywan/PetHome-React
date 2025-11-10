import { useState } from 'react';
import { FormField } from '../../molecules/FormField';
import { Button } from '../../atoms/Button';
import { Card } from '../../atoms/Card';

// Traducciones de especies
const speciesTranslations = {
    'DOG': 'Perro',
    'CAT': 'Gato',
    'BIRD': 'Ave',
    'RABBIT': 'Conejo',
    'HAMSTER': 'Hámster',
    'OTHER': 'Otro'
};

// Traducciones de género
const genderTranslations = {
    'MALE': 'Macho',
    'FEMALE': 'Hembra'
};

export function AddPetForm({ onSubmit, onCancel, initialData = null }) {
    const [formData, setFormData] = useState(initialData || {
        name: '',
        species: '',
        breed: '',
        birthDate: '',
        weight: '',
        gender: '',
        color: '',
        microchip: '',
        photo: ''
    });

    const [errors, setErrors] = useState({});

    const speciesOptions = Object.entries(speciesTranslations).map(([value, label]) => ({
        value,
        label
    }));

    const genderOptions = Object.entries(genderTranslations).map(([value, label]) => ({
        value,
        label
    }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }
        if (!formData.species) {
            newErrors.species = 'La especie es requerida';
        }
        if (!formData.breed.trim()) {
            newErrors.breed = 'La raza es requerida';
        }
        if (!formData.birthDate) {
            newErrors.birthDate = 'La fecha de nacimiento es requerida';
        }
        if (!formData.weight || formData.weight <= 0) {
            newErrors.weight = 'El peso debe ser mayor a 0';
        }
        if (!formData.gender) {
            newErrors.gender = 'El género es requerido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            onSubmit({
                ...formData,
                weight: parseFloat(formData.weight)
            });
        }
    };

    return (
        <Card>
            <Card.Body>
                <h5 className="mb-4">{initialData ? 'Editar Mascota' : 'Agregar Nueva Mascota'}</h5>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <FormField
                                type="text"
                                label="Nombre"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ej: Max"
                                required
                                error={errors.name}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormField
                                type="select"
                                label="Especie"
                                name="species"
                                value={formData.species}
                                onChange={handleChange}
                                options={speciesOptions}
                                placeholder="Selecciona la especie"
                                required
                                error={errors.species}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormField
                                type="text"
                                label="Raza"
                                name="breed"
                                value={formData.breed}
                                onChange={handleChange}
                                placeholder="Ej: Golden Retriever"
                                required
                                error={errors.breed}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormField
                                type="date"
                                label="Fecha de Nacimiento"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                max={new Date().toISOString().split('T')[0]}
                                required
                                error={errors.birthDate}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormField
                                type="number"
                                label="Peso (kg)"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                placeholder="Ej: 25.5"
                                step="0.1"
                                min="0"
                                required
                                error={errors.weight}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormField
                                type="select"
                                label="Género"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                options={genderOptions}
                                placeholder="Selecciona el género"
                                required
                                error={errors.gender}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormField
                                type="text"
                                label="Color"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                placeholder="Ej: Dorado"
                            />
                        </div>

                        <div className="col-md-6">
                            <FormField
                                type="text"
                                label="Microchip (opcional)"
                                name="microchip"
                                value={formData.microchip}
                                onChange={handleChange}
                                placeholder="Número de microchip"
                                helpText="15 dígitos"
                            />
                        </div>

                        <div className="col-12">
                            <FormField
                                type="text"
                                label="URL de Foto (opcional)"
                                name="photo"
                                value={formData.photo}
                                onChange={handleChange}
                                placeholder="/img/pets/my-pet.jpg"
                            />
                        </div>
                    </div>

                    <div className="d-flex gap-2 justify-content-end mt-4">
                        {onCancel && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                            >
                                Cancelar
                            </Button>
                        )}
                        <Button type="submit" variant="primary">
                            {initialData ? 'Guardar Cambios' : 'Agregar Mascota'}
                        </Button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    );
}
