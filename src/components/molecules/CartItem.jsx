import { Button } from '../atoms/Button';
import { formatPrice, formatDate } from '../../utils/formatters';
import { usePets } from '../../context/PetContext';
import { useVeterinarians } from '../../context/VeterinarianContext';

export function CartItem({ item, onUpdateQuantity, onRemove }) {
    const { pets } = usePets();
    const { veterinarians } = useVeterinarians();

    // Find pet name from petId
    const pet = pets.find(p => p.id === parseInt(item.petId));
    const petName = pet ? pet.name : 'Mascota no encontrada';

    // Find veterinarian name from veterinarianId
    const vet = veterinarians.find(v => v.id === parseInt(item.veterinarian));
    const vetName = vet ? `${vet.userName || 'Nombre no disponible'} - ${vet.specialty}` : 'Veterinario no encontrado';

    return (
        <div className="cart-item">
            <div className="d-flex align-items-start gap-3">
                <img src={item.image} alt={item.name} className="rounded"
                     style={{width: '60px', height: '60px', objectFit: 'cover'}} />
                <div className="flex-grow-1">
                    <h6 className="mb-1">{item.name}</h6>
                    <p className="text-muted small mb-1">{formatPrice(item.price)}</p>
                    {item.petId && (
                        <p className="text-muted small mb-1">
                            <i className="fas fa-paw me-1"></i>
                            {petName}
                        </p>
                    )}
                    {item.veterinarian && (
                        <p className="text-muted small mb-1">
                            <i className="fas fa-user-md me-1"></i>
                            {vetName}
                        </p>
                    )}
                    {item.date && item.time && (
                        <p className="text-muted small mb-2">
                            <i className="fas fa-calendar me-1"></i>
                            {formatDate(item.date)} a las {item.time}
                        </p>
                    )}

                    <div className="d-flex justify-content-between align-items-center">
                        <div className="quantity-controls">
                            <button
                                className="quantity-btn"
                                onClick={() => onUpdateQuantity(item, item.quantity - 1)}
                            >
                                <i className="fas fa-minus"></i>
                            </button>
                            <input
                                type="number"
                                className="quantity-input"
                                value={item.quantity}
                                onChange={(e) => onUpdateQuantity(item, parseInt(e.target.value) || 1)}
                                min="1"
                            />
                            <button
                                className="quantity-btn"
                                onClick={() => onUpdateQuantity(item, item.quantity + 1)}
                            >
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                            <strong>{formatPrice(item.price * item.quantity)}</strong>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => onRemove(item)}
                            >
                                <i className="fas fa-trash"></i>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}