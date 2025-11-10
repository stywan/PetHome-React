import { useState } from 'react';
import { ClientDashboardTemplate } from '../../components/templates/ClientDashboardTemplate';
import { Card } from '../../components/atoms/Card';
import { FormField } from '../../components/molecules/FormField';
import { Button } from '../../components/atoms/Button';
import { Avatar } from '../../components/atoms/Avatar';
import { AddressCard } from '../../components/molecules/AddressCard';
import { PaymentMethodCard } from '../../components/molecules/PaymentMethodCard';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

function ClientProfilePage() {
    const { user, updateProfile } = useAuth();
    const { showSuccess, showError } = useNotification();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        photo: user?.photo || ''
    });

    const [activeSection, setActiveSection] = useState('info'); // 'info' | 'addresses' | 'payments'
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [addressFormData, setAddressFormData] = useState({
        street: '',
        city: '',
        neighborhood: '',
        zipCode: '',
        isDefault: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = updateProfile(formData);
        if (result.success) {
            alert('Perfil actualizado exitosamente');
        }
    };

    const handleAddressChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAddressFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddAddress = () => {
        setEditingAddress(null);
        setAddressFormData({
            street: '',
            city: '',
            neighborhood: '',
            zipCode: '',
            isDefault: false
        });
        setShowAddressForm(true);
    };

    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setAddressFormData({
            street: address.street || '',
            city: address.city || '',
            neighborhood: address.neighborhood || '',
            zipCode: address.zipCode || '',
            isDefault: address.isDefault || false
        });
        setShowAddressForm(true);
    };

    const handleCancelAddressForm = () => {
        setShowAddressForm(false);
        setEditingAddress(null);
        setAddressFormData({
            street: '',
            city: '',
            neighborhood: '',
            zipCode: '',
            isDefault: false
        });
    };

    const handleSaveAddress = () => {
        // Validar campos requeridos
        if (!addressFormData.street || !addressFormData.city) {
            showError('Por favor completa la calle y la ciudad');
            return;
        }

        // Obtener direcciones actuales del usuario
        const currentAddresses = user?.addresses || [];

        let updatedAddresses;
        if (editingAddress) {
            // Editar dirección existente
            updatedAddresses = currentAddresses.map(addr =>
                addr.id === editingAddress.id
                    ? { ...addressFormData, id: editingAddress.id }
                    : addressFormData.isDefault ? { ...addr, isDefault: false } : addr
            );
        } else {
            // Agregar nueva dirección
            const newAddress = {
                id: Date.now(),
                ...addressFormData
            };

            // Si es la primera dirección o se marca como predeterminada, desmarcar las demás
            if (addressFormData.isDefault || currentAddresses.length === 0) {
                updatedAddresses = currentAddresses.map(addr => ({ ...addr, isDefault: false }));
                newAddress.isDefault = true;
                updatedAddresses.push(newAddress);
            } else {
                updatedAddresses = [...currentAddresses, newAddress];
            }
        }

        // Actualizar usuario con nuevas direcciones
        const updatedUser = {
            ...user,
            addresses: updatedAddresses
        };

        // Guardar en localStorage (temporal hasta que el backend soporte esto)
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Actualizar el contexto (esto depende de cómo esté implementado updateProfile)
        window.location.reload(); // Temporal: recargar para actualizar el estado

        showSuccess(editingAddress ? 'Dirección actualizada exitosamente' : 'Dirección agregada exitosamente');
        setShowAddressForm(false);
        setEditingAddress(null);
    };

    const handleDeleteAddress = (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta dirección?')) {
            const updatedAddresses = (user?.addresses || []).filter(addr => addr.id !== id);
            const updatedUser = {
                ...user,
                addresses: updatedAddresses
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            window.location.reload();
            showSuccess('Dirección eliminada exitosamente');
        }
    };

    const handleSetDefaultAddress = (id) => {
        const updatedAddresses = (user?.addresses || []).map(addr => ({
            ...addr,
            isDefault: addr.id === id
        }));
        const updatedUser = {
            ...user,
            addresses: updatedAddresses
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        window.location.reload();
        showSuccess('Dirección predeterminada actualizada');
    };

    const handleAddPaymentMethod = () => {
        alert('Agregar nuevo método de pago');
    };

    return (
        <ClientDashboardTemplate title="Mi Perfil">
            <div className="row">
                {/* Sidebar Tabs */}
                <div className="col-md-3 mb-4">
                    <Card>
                        <Card.Body className="p-0">
                            <div className="list-group list-group-flush">
                                <button
                                    className={`list-group-item list-group-item-action ${activeSection === 'info' ? 'active' : ''}`}
                                    onClick={() => setActiveSection('info')}
                                >
                                    <i className="fas fa-user me-2"></i>
                                    Información Personal
                                </button>
                                <button
                                    className={`list-group-item list-group-item-action ${activeSection === 'addresses' ? 'active' : ''}`}
                                    onClick={() => setActiveSection('addresses')}
                                >
                                    <i className="fas fa-map-marker-alt me-2"></i>
                                    Direcciones
                                </button>
                                <button
                                    className={`list-group-item list-group-item-action ${activeSection === 'payments' ? 'active' : ''}`}
                                    onClick={() => setActiveSection('payments')}
                                >
                                    <i className="fas fa-credit-card me-2"></i>
                                    Métodos de Pago
                                </button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="col-md-9">
                    {/* Personal Information */}
                    {activeSection === 'info' && (
                        <Card>
                            <Card.Body>
                                <h5 className="mb-4">Información Personal</h5>

                                {/* Avatar */}
                                <div className="text-center mb-4">
                                    <Avatar
                                        src={formData.photo}
                                        alt={formData.name}
                                        size="xl"
                                        shape="circle"
                                    />
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-12">
                                            <FormField
                                                type="text"
                                                label="Nombre Completo"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <FormField
                                                type="email"
                                                label="Correo Electrónico"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <FormField
                                                type="tel"
                                                label="Teléfono"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-12">
                                            <FormField
                                                type="text"
                                                label="URL de Foto de Perfil"
                                                name="photo"
                                                value={formData.photo}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end mt-4">
                                        <Button type="submit" variant="primary">
                                            Guardar Cambios
                                        </Button>
                                    </div>
                                </form>
                            </Card.Body>
                        </Card>
                    )}

                    {/* Addresses */}
                    {activeSection === 'addresses' && (
                        <>
                            {!showAddressForm ? (
                                <>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h5 className="mb-0">Mis Direcciones</h5>
                                        <Button variant="primary" onClick={handleAddAddress}>
                                            <i className="fas fa-plus me-2"></i>
                                            Agregar Dirección
                                        </Button>
                                    </div>

                                    {user?.addresses && user.addresses.length > 0 ? (
                                        user.addresses.map((address) => (
                                            <AddressCard
                                                key={address.id}
                                                address={address}
                                                onEdit={handleEditAddress}
                                                onDelete={handleDeleteAddress}
                                                onSetDefault={handleSetDefaultAddress}
                                            />
                                        ))
                                    ) : (
                                        <Card>
                                            <Card.Body className="text-center py-5">
                                                <i className="fas fa-map-marker-alt fa-3x text-muted mb-3"></i>
                                                <h5>No tienes direcciones registradas</h5>
                                                <p className="text-muted">Agrega tu primera dirección para poder solicitar servicios a domicilio</p>
                                            </Card.Body>
                                        </Card>
                                    )}
                                </>
                            ) : (
                                <Card>
                                    <Card.Body>
                                        <h5 className="mb-4">
                                            {editingAddress ? 'Editar Dirección' : 'Agregar Nueva Dirección'}
                                        </h5>

                                        <div className="row">
                                            <div className="col-12">
                                                <FormField
                                                    type="text"
                                                    label="Calle y Número"
                                                    name="street"
                                                    value={addressFormData.street}
                                                    onChange={handleAddressChange}
                                                    placeholder="Ej: Av. Libertador 123, Depto 45"
                                                    required
                                                />
                                            </div>

                                            <div className="col-12">
                                                <FormField
                                                    type="text"
                                                    label="Comuna/Barrio"
                                                    name="neighborhood"
                                                    value={addressFormData.neighborhood}
                                                    onChange={handleAddressChange}
                                                    placeholder="Ej: Providencia"
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <FormField
                                                    type="text"
                                                    label="Ciudad"
                                                    name="city"
                                                    value={addressFormData.city}
                                                    onChange={handleAddressChange}
                                                    placeholder="Ej: Santiago"
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <FormField
                                                    type="text"
                                                    label="Código Postal"
                                                    name="zipCode"
                                                    value={addressFormData.zipCode}
                                                    onChange={handleAddressChange}
                                                    placeholder="Ej: 7500000"
                                                />
                                            </div>

                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="isDefault"
                                                        name="isDefault"
                                                        checked={addressFormData.isDefault}
                                                        onChange={handleAddressChange}
                                                    />
                                                    <label className="form-check-label" htmlFor="isDefault">
                                                        Establecer como dirección predeterminada
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-end gap-2 mt-4">
                                            <Button variant="outline" onClick={handleCancelAddressForm}>
                                                Cancelar
                                            </Button>
                                            <Button variant="primary" onClick={handleSaveAddress}>
                                                {editingAddress ? 'Guardar Cambios' : 'Agregar Dirección'}
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )}
                        </>
                    )}

                    {/* Payment Methods */}
                    {activeSection === 'payments' && (
                        <>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="mb-0">Métodos de Pago</h5>
                                <Button variant="primary" onClick={handleAddPaymentMethod}>
                                    <i className="fas fa-plus me-2"></i>
                                    Agregar Método
                                </Button>
                            </div>

                            {user?.paymentMethods?.map((method) => (
                                <PaymentMethodCard
                                    key={method.id}
                                    paymentMethod={method}
                                    onEdit={(pm) => alert(`Editar ${pm.cardBrand}`)}
                                    onDelete={(id) => alert(`Eliminar método ${id}`)}
                                    onSetDefault={(id) => alert(`Establecer como predeterminado ${id}`)}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </ClientDashboardTemplate>
    );
}

export default ClientProfilePage;
