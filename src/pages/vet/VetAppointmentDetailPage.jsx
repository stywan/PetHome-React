import { useParams, useNavigate } from 'react-router-dom';
import { VetDashboardTemplate } from '../../components/templates/VetDashboardTemplate';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { AppointmentDetailPanel } from '../../components/organisms/vet/AppointmentDetailPanel';
import { PetMedicalHistory } from '../../components/organisms/vet/PetMedicalHistory';
import { useAppointments } from '../../context/AppointmentContext';
import { usePets } from '../../context/PetContext';
import { useNotification } from '../../context/NotificationContext';

function VetAppointmentDetailPage() {
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const { showSuccess, showError, showWarning } = useNotification();
    const { getAppointmentDetails, confirmAppointment, completeAppointment, cancelAppointment } = useAppointments();
    const { getPetById, getMedicalHistory, getLatestMedicalRecord, calculatePetAge, addMedicalRecord } = usePets();

    const appointmentDetails = getAppointmentDetails(appointmentId);

    if (!appointmentDetails) {
        return (
            <VetDashboardTemplate title="Cita no encontrada">
                <div className="text-center py-5">
                    <h4>Cita no encontrada</h4>
                    <Button variant="primary" onClick={() => navigate('/vet/dashboard')}>
                        Volver al Dashboard
                    </Button>
                </div>
            </VetDashboardTemplate>
        );
    }

    const { service, pet, veterinarian, client, address } = appointmentDetails;
    const latestMedicalRecord = getLatestMedicalRecord(pet?.id);
    const medicalHistory = getMedicalHistory(pet?.id);

    // Obtener la dirección principal del cliente
    const clientAddress = client?.addresses?.find(addr => addr.isDefault) || client?.addresses?.[0];

    const handleConfirm = async (appointmentId) => {
        const result = await confirmAppointment(appointmentId);
        if (result.success) {
            showSuccess('Cita confirmada exitosamente');
        } else {
            showError('Error al confirmar la cita: ' + (result.error || 'Error desconocido'));
        }
    };

    const handleComplete = async (appointmentId, medicalData) => {
        // Preparar datos para completar la cita (SIN las notas adicionales del vet)
        const appointmentDataToComplete = {
            diagnosis: medicalData.diagnosis,
            prescription: medicalData.prescription,
            // NO incluir notes aquí para evitar que se sumen a las notas del cliente
        };

        // Completar la cita
        const result = await completeAppointment(appointmentId, appointmentDataToComplete);

        if (result.success) {
            // Agregar registro médico (AQUÍ SÍ incluir las notas del veterinario)
            addMedicalRecord({
                petId: pet.id,
                appointmentId: appointmentId,
                date: appointmentDetails.date,
                veterinarianId: appointmentDetails.veterinarianId,
                type: service.category,
                title: service.name,
                diagnosis: medicalData.diagnosis,
                treatment: medicalData.prescription,
                prescription: medicalData.prescription,
                weight: parseFloat(medicalData.weight) || pet.weight,
                temperature: parseFloat(medicalData.temperature) || null,
                heartRate: parseInt(medicalData.heartRate) || null,
                notes: medicalData.notes || ''
            });

            showSuccess('Cita completada exitosamente');
            setTimeout(() => navigate('/vet/dashboard'), 1500);
        } else {
            showError('Error al completar la cita: ' + (result.error || 'Error desconocido'));
        }
    };

    const handleCancel = async (appointmentId) => {
        if (window.confirm('¿Estás seguro de cancelar esta cita?')) {
            const result = await cancelAppointment(appointmentId, 'Cancelada por el veterinario');
            if (result.success) {
                showWarning('Cita cancelada');
                setTimeout(() => navigate('/vet/dashboard'), 1500);
            } else {
                showError('Error al cancelar la cita: ' + (result.error || 'Error desconocido'));
            }
        }
    };

    return (
        <VetDashboardTemplate title={`Cita: ${service?.name}`}>
            {/* Back Button */}
            <div className="mb-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/vet/dashboard')}
                >
                    <Icon name="arrow-left" className="me-2" />
                    Volver a Agenda
                </Button>
            </div>

            <div className="row g-4">
                {/* Left Column - Appointment Details */}
                <div className="col-lg-8">
                    <AppointmentDetailPanel
                        appointment={appointmentDetails}
                        service={service}
                        pet={pet}
                        client={client}
                        address={clientAddress}
                        latestMedicalRecord={latestMedicalRecord}
                        calculateAge={calculatePetAge}
                        onConfirm={handleConfirm}
                        onComplete={handleComplete}
                        onCancel={handleCancel}
                    />
                </div>

                {/* Right Column - Medical History */}
                <div className="col-lg-4">
                    <PetMedicalHistory
                        medicalHistory={medicalHistory}
                    />
                </div>
            </div>
        </VetDashboardTemplate>
    );
}

export default VetAppointmentDetailPage;
