import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FilterProvider } from './context/FilterContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import { AppointmentProvider } from './context/AppointmentContext';
import { PetProvider } from './context/PetContext';
import { VeterinarianProvider } from './context/VeterinarianContext';
import { RoleBasedRoute } from './components/routes/RoleBasedRoute';
import { ToastContainer } from './components/organisms/ToastContainer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { LoginPage } from './pages/LoginPage';

// Client Dashboard Pages
import ClientDashboardPage from './pages/client/ClientDashboardPage';
import MyAppointmentsPage from './pages/client/MyAppointmentsPage';
import MyPetsPage from './pages/client/MyPetsPage';
import ClientProfilePage from './pages/client/ClientProfilePage';

// Vet Dashboard Pages
import VetDashboardPage from './pages/vet/VetDashboardPage';
import VetAllAppointmentsPage from './pages/vet/VetAllAppointmentsPage';
import VetReportsPage from './pages/vet/VetReportsPage';
import VetProfilePage from './pages/vet/VetProfilePage';
import VetAppointmentDetailPage from './pages/vet/VetAppointmentDetailPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <VeterinarianProvider>
            <CartProvider>
              <FilterProvider>
                <AppointmentProvider>
                  <PetProvider>
                    <ToastContainer />
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    {/* Client Dashboard Routes */}
                    <Route path="/dashboard" element={
                      <RoleBasedRoute allowedRoles={['CLIENT']}>
                        <ClientDashboardPage />
                      </RoleBasedRoute>
                    } />
                    <Route path="/dashboard/appointments" element={
                      <RoleBasedRoute allowedRoles={['CLIENT']}>
                        <MyAppointmentsPage />
                      </RoleBasedRoute>
                    } />
                    <Route path="/dashboard/pets" element={
                      <RoleBasedRoute allowedRoles={['CLIENT']}>
                        <MyPetsPage />
                      </RoleBasedRoute>
                    } />
                    <Route path="/dashboard/profile" element={
                      <RoleBasedRoute allowedRoles={['CLIENT']}>
                        <ClientProfilePage />
                      </RoleBasedRoute>
                    } />

                    {/* Client Dashboard Routes (with /client prefix) */}
                    <Route path="/client/dashboard" element={
                      <RoleBasedRoute allowedRoles={['CLIENT']}>
                        <ClientDashboardPage />
                      </RoleBasedRoute>
                    } />
                    <Route path="/client/appointments" element={
                      <RoleBasedRoute allowedRoles={['CLIENT']}>
                        <MyAppointmentsPage />
                      </RoleBasedRoute>
                    } />
                    <Route path="/client/pets" element={
                      <RoleBasedRoute allowedRoles={['CLIENT']}>
                        <MyPetsPage />
                      </RoleBasedRoute>
                    } />
                    <Route path="/client/profile" element={
                      <RoleBasedRoute allowedRoles={['CLIENT']}>
                        <ClientProfilePage />
                      </RoleBasedRoute>
                    } />

                    {/* Veterinarian Dashboard Routes */}
                    <Route path="/vet/dashboard" element={
                      <RoleBasedRoute allowedRoles={['VET']}>
                        <VetDashboardPage />
                      </RoleBasedRoute>
                    } />
                    <Route path="/vet/appointments" element={
                      <RoleBasedRoute allowedRoles={['VET']}>
                        <VetAllAppointmentsPage />
                      </RoleBasedRoute>
                    } />
                    <Route path="/vet/reports" element={
                      <RoleBasedRoute allowedRoles={['VET']}>
                        <VetReportsPage />
                      </RoleBasedRoute>
                    } />
                    <Route path="/vet/profile" element={
                      <RoleBasedRoute allowedRoles={['VET']}>
                        <VetProfilePage />
                      </RoleBasedRoute>
                    } />
                    <Route path="/vet/appointment/:appointmentId" element={
                      <RoleBasedRoute allowedRoles={['VET']}>
                        <VetAppointmentDetailPage />
                      </RoleBasedRoute>
                    } />
                  </Routes>
                  </PetProvider>
                </AppointmentProvider>
              </FilterProvider>
            </CartProvider>
          </VeterinarianProvider>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;