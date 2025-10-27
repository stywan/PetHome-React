import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FilterProvider } from './context/FilterContext';
import { NotificationProvider } from './context/NotificationContext';
import { ToastContainer } from './components/organisms/ToastContainer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <CartProvider>
          <FilterProvider>
            <ToastContainer />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </FilterProvider>
        </CartProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;