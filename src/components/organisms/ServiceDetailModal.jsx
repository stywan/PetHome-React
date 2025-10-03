import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { veterinarians, timeSlots, categoryTranslations, animalTranslations } from '../../data/servicesData';
import { Badge } from '../atoms/Badge';

export function ServiceDetailModal({ service, show, onHide }) {
    const { addServiceToCart } = useCart();

    const [formData, setFormData] = useState({
        veterinarian: '',
        date: '',
        time: '',
        notes: ''
    });

    // Bootstrap modal management
    useEffect(() => {
        const modalElement = document.getElementById('serviceDetailModal');
        if (!modalElement) return;

        if (show) {
            const bsModal = new window.bootstrap.Modal(modalElement);
            bsModal.show();

            // Reset form when modal is shown
            setFormData({
                veterinarian: '',
                date: '',
                time: '',
                notes: ''
            });

            // Cleanup handler when modal is hidden
            const handleHidden = () => {
                onHide();
            };
            modalElement.addEventListener('hidden.bs.modal', handleHidden);

            return () => {
                modalElement.removeEventListener('hidden.bs.modal', handleHidden);
                bsModal.dispose();
            };
        } else {
            const bsModal = window.bootstrap.Modal.getInstance(modalElement);
            if (bsModal) {
                bsModal.hide();
            }
        }
    }, [show, onHide]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const fieldName = id.replace('veterinarianSelect', 'veterinarian')
                            .replace('appointmentDate', 'date')
                            .replace('timeSelect', 'time')
                            .replace('specialNotes', 'notes');
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const handleAddToCart = () => {
        // Validate required fields
        if (!formData.veterinarian || !formData.date || !formData.time) {
            alert('Por favor, completa todos los campos requeridos (Veterinario, Fecha y Hora)');
            return;
        }

        // Add to cart
        const appointmentDetails = {
            veterinarian: formData.veterinarian,
            date: formData.date,
            time: formData.time,
            notes: formData.notes
        };

        const success = addServiceToCart(service, appointmentDetails);

        if (success) {
            // Close modal
            const modalElement = document.getElementById('serviceDetailModal');
            const bsModal = window.bootstrap.Modal.getInstance(modalElement);
            if (bsModal) {
                bsModal.hide();
            }

            // Show success message
            alert('Servicio agregado al carrito exitosamente');
        }
    };

    if (!service) return null;

    // Get min date for date input (today)
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="modal fade" id="serviceDetailModal" tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title" id="serviceDetailTitle">Detalles del Servicio</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-6">
                                <img id="serviceDetailImage" src={service.image} alt={service.name} className="img-fluid rounded mb-3" />
                                <h4 id="serviceDetailName">{service.name}</h4>
                                <p id="serviceDetailDescription" className="text-muted">{service.description}</p>
                                <div className="d-flex align-items-center mb-3">
                                    <Badge variant="primary" className="me-2" id="serviceDetailCategory">
                                        {categoryTranslations[service.category]}
                                    </Badge>
                                    <Badge variant="secondary" id="serviceDetailAnimal">
                                        {service.animals.map(animal => animalTranslations[animal]).join(', ')}
                                    </Badge>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="text-primary mb-0">Precio: <span id="serviceDetailPrice">{formatPrice(service.price)}</span></h5>
                                    <Badge variant="duration" id="serviceDetailDuration">{service.duration}</Badge>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <form id="appointmentForm">
                                    {/* veterinario */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            <i className="fas fa-user-md me-2"></i>
                                            Seleccionar Veterinario
                                        </label>
                                        <select
                                            className="form-select"
                                            id="veterinarianSelect"
                                            required
                                            value={formData.veterinarian}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Selecciona un veterinario</option>
                                            {veterinarians.map(vet => (
                                                <option key={vet.id} value={vet.id}>
                                                    {vet.name} - {vet.specialty}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* fecha */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            <i className="fas fa-calendar me-2"></i>
                                            Fecha de la Cita
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="appointmentDate"
                                            required
                                            min={today}
                                            value={formData.date}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    {/* hora */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            <i className="fas fa-clock me-2"></i>
                                            Horario Disponible
                                        </label>
                                        <select
                                            className="form-select"
                                            id="timeSelect"
                                            required
                                            value={formData.time}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Selecciona un horario</option>
                                            {timeSlots.map(time => (
                                                <option key={time} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* NOTAS */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            <i className="fas fa-sticky-note me-2"></i>
                                            Notas Especiales (Opcional)
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="specialNotes"
                                            rows="3"
                                            placeholder="Describe cualquier información adicional sobre tu mascota o el servicio..."
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary" id="addToCartBtn" onClick={handleAddToCart}>
                            <i className="fas fa-cart-plus me-2"></i>
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}