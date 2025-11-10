import { useState } from 'react';
import { ClientDashboardTemplate } from '../../components/templates/ClientDashboardTemplate';
import { PetCard } from '../../components/molecules/PetCard';
import { EmptyState } from '../../components/molecules/EmptyState';
import { Button } from '../../components/atoms/Button';
import { AddPetForm } from '../../components/organisms/client/AddPetForm';
import { useAuth } from '../../context/AuthContext';
import { usePets } from '../../context/PetContext';

function MyPetsPage() {
    const { user } = useAuth();
    const { getPetsByOwner, addPet, calculatePetAge } = usePets();

    const [showForm, setShowForm] = useState(false);
    const myPets = getPetsByOwner(user?.id);

    const handleAddPet = async (petData) => {
        const result = await addPet({
            ...petData,
            ownerId: user.id
        });

        if (result.success) {
            alert('Mascota agregada exitosamente');
            setShowForm(false);
        } else {
            alert(`Error al agregar mascota: ${result.error}`);
        }
    };

    const handleViewHistory = (pet) => {
        // TODO: Implementar modal o página de historial médico
        alert(`Ver historial de ${pet.name}`);
    };

    const handleEdit = (pet) => {
        // TODO: Implementar edición
        alert(`Editar ${pet.name}`);
    };

    return (
        <ClientDashboardTemplate title="Mis Mascotas">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3>Mis Mascotas</h3>
                    <p className="text-muted mb-0">
                        Gestiona la información de tus mascotas ({myPets.length})
                    </p>
                </div>
                {!showForm && (
                    <Button
                        variant="primary"
                        onClick={() => setShowForm(true)}
                    >
                        <i className="fas fa-plus me-2"></i>
                        Agregar Mascota
                    </Button>
                )}
            </div>

            {/* Add Pet Form */}
            {showForm && (
                <div className="mb-4">
                    <AddPetForm
                        onSubmit={handleAddPet}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}

            {/* Pets List */}
            {myPets.length > 0 ? (
                <div className="row">
                    {myPets.map((pet) => (
                        <div key={pet.id} className="col-md-6 col-lg-4">
                            <PetCard
                                pet={pet}
                                calculateAge={calculatePetAge}
                                onEdit={handleEdit}
                                onViewHistory={handleViewHistory}
                            />
                        </div>
                    ))}
                </div>
            ) : !showForm && (
                <EmptyState
                    icon="paw"
                    title="No tienes mascotas registradas"
                    message="Agrega tu primera mascota para comenzar a gestionar su salud"
                    actionLabel="Agregar Mascota"
                    onAction={() => setShowForm(true)}
                    variant="primary"
                />
            )}
        </ClientDashboardTemplate>
    );
}

export default MyPetsPage;
