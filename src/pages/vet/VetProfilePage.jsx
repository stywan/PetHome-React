import { useState } from 'react';
import { VetDashboardTemplate } from '../../components/templates/VetDashboardTemplate';
import { Card } from '../../components/atoms/Card';
import { Avatar } from '../../components/atoms/Avatar';
import { Icon } from '../../components/atoms/Icon';
import { Button } from '../../components/atoms/Button';
import { Input } from '../../components/atoms/Input';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

function VetProfilePage() {
    const { user, updateProfile } = useAuth();
    const { showSuccess, showError } = useNotification();

    // Estado para editar perfil
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        specialty: user?.specialty || '',
        licenseNumber: user?.licenseNumber || '',
        bio: user?.bio || '',
        clinicName: user?.clinicName || '',
        clinicAddress: user?.clinicAddress || '',
        workingHours: user?.workingHours || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            updateProfile(formData);
            setIsEditing(false);
            showSuccess('Perfil actualizado exitosamente');
        } catch (error) {
            showError('Error al actualizar el perfil');
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            specialty: user?.specialty || '',
            licenseNumber: user?.licenseNumber || '',
            bio: user?.bio || '',
            clinicName: user?.clinicName || '',
            clinicAddress: user?.clinicAddress || '',
            workingHours: user?.workingHours || '',
        });
        setIsEditing(false);
    };

    return (
        <VetDashboardTemplate title="Mi Perfil Profesional">
            <div className="row g-4">
                {/* Tarjeta de perfil principal */}
                <div className="col-lg-4">
                    <Card>
                        <Card.Body>
                            <div className="text-center">
                                <Avatar
                                    src={user?.photo}
                                    alt={user?.name}
                                    size="xl"
                                    shape="circle"
                                    className="mb-3"
                                />
                                <h4 className="mb-1">{user?.name}</h4>
                                <p className="text-muted mb-2">{user?.specialty}</p>
                                <p className="text-muted small mb-3">
                                    <Icon name="id-card" className="me-2" />
                                    Licencia: {user?.licenseNumber || 'No especificada'}
                                </p>

                                {!isEditing && (
                                    <Button
                                        variant="primary"
                                        className="w-100"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <Icon name="edit" className="me-2" />
                                        Editar Perfil
                                    </Button>
                                )}
                            </div>

                            <hr className="my-4" />

                            <div className="mb-3">
                                <small className="text-muted d-block mb-2">
                                    <Icon name="envelope" className="me-2" />
                                    Correo Electrónico
                                </small>
                                <p className="mb-0">{user?.email}</p>
                            </div>

                            <div className="mb-3">
                                <small className="text-muted d-block mb-2">
                                    <Icon name="phone" className="me-2" />
                                    Teléfono
                                </small>
                                <p className="mb-0">{user?.phone || 'No especificado'}</p>
                            </div>

                            <div>
                                <small className="text-muted d-block mb-2">
                                    <Icon name="clinic-medical" className="me-2" />
                                    Clínica
                                </small>
                                <p className="mb-0">{user?.clinicName || 'No especificada'}</p>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                {/* Formulario de información */}
                <div className="col-lg-8">
                    <Card>
                        <Card.Header>
                            <div className="d-flex align-items-center justify-content-between">
                                <h5 className="mb-0">
                                    <Icon name="user-md" className="me-2" />
                                    Información Profesional
                                </h5>
                                {isEditing && (
                                    <div className="d-flex gap-2">
                                        <Button variant="outline" onClick={handleCancel}>
                                            Cancelar
                                        </Button>
                                        <Button variant="primary" onClick={handleSubmit}>
                                            <Icon name="save" className="me-2" />
                                            Guardar Cambios
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    {/* Información básica */}
                                    <div className="col-12">
                                        <h6 className="border-bottom pb-2 mb-3">Datos Personales</h6>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Nombre Completo</label>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Especialidad</label>
                                        <Input
                                            name="specialty"
                                            value={formData.specialty}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="Ej: Veterinario General, Cirujano, etc."
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Correo Electrónico</label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Teléfono</label>
                                        <Input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="+56 9 1234 5678"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Número de Licencia</label>
                                        <Input
                                            name="licenseNumber"
                                            value={formData.licenseNumber}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="Número de registro profesional"
                                        />
                                    </div>

                                    {/* Información de la clínica */}
                                    <div className="col-12 mt-4">
                                        <h6 className="border-bottom pb-2 mb-3">Información de la Clínica</h6>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Nombre de la Clínica</label>
                                        <Input
                                            name="clinicName"
                                            value={formData.clinicName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="Nombre de tu clínica"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Dirección de la Clínica</label>
                                        <Input
                                            name="clinicAddress"
                                            value={formData.clinicAddress}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="Dirección completa"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Horario de Atención</label>
                                        <Input
                                            name="workingHours"
                                            value={formData.workingHours}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="Ej: Lun-Vie 9:00-18:00"
                                        />
                                    </div>

                                    {/* Biografía */}
                                    <div className="col-12 mt-4">
                                        <h6 className="border-bottom pb-2 mb-3">Biografía Profesional</h6>
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Acerca de ti</label>
                                        <textarea
                                            className="form-control"
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            rows="4"
                                            placeholder="Describe tu experiencia, áreas de interés y cualquier otra información relevante..."
                                        />
                                    </div>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>

                    {/* Tarjeta de seguridad */}
                    <Card className="mt-4">
                        <Card.Header>
                            <h5 className="mb-0">
                                <Icon name="lock" className="me-2" />
                                Seguridad
                            </h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h6 className="mb-1">Contraseña</h6>
                                    <small className="text-muted">
                                        Última actualización hace 30 días
                                    </small>
                                </div>
                                <Button variant="outline">
                                    <Icon name="key" className="me-2" />
                                    Cambiar Contraseña
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </VetDashboardTemplate>
    );
}

export default VetProfilePage;
