import { useCart } from '../../context/CartContext';
import { useAppointments } from '../../context/AppointmentContext';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { CartItem } from '../molecules/CartItem';
import { Button } from '../atoms/Button';
import { formatPrice } from '../../utils/formatters';
import { useEffect, useRef, useState } from 'react';

export function CartOffcanvas({ show, onHide }) {
    const { cart, updateQuantity, removeFromCart, clearCart, getCartTotals, isCartEmpty, processCheckout } = useCart();
    const { createAppointment } = useAppointments();
    const { user } = useAuth();
    const { showSuccess, showError, showWarning } = useNotification();
    const { totalPrice } = getCartTotals();
    const offcanvasRef = useRef(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (show) {
            offcanvasRef.current?.classList.add('show');
            const backdrop = document.createElement('div');
            backdrop.className = 'offcanvas-backdrop fade show';
            backdrop.onclick = onHide;
            document.body.appendChild(backdrop);
            document.body.style.overflow = 'hidden';
        } else {
            offcanvasRef.current?.classList.remove('show');
            const backdrop = document.querySelector('.offcanvas-backdrop');
            if (backdrop) backdrop.remove();
            document.body.style.overflow = '';
        }
    }, [show, onHide]);

    const handleUpdateQuantity = (item, newQuantity) => {
        updateQuantity(item.id, newQuantity, item.petId, item.veterinarian, item.date, item.time);
    };

    const handleRemove = (item) => {
        removeFromCart(item.id, item.petId, item.veterinarian, item.date, item.time);
    };

    const handleCheckout = async () => {
        if (!user) {
            showWarning('Debes iniciar sesión para agendar citas');
            return;
        }

        if (isCartEmpty()) {
            showWarning('Tu carrito está vacío');
            return;
        }

        setIsProcessing(true);

        try {
            const result = await processCheckout(createAppointment, user.id);

            if (result.success) {
                showSuccess(`¡Éxito! Se agendaron ${result.created.length} cita(s) correctamente`);
                onHide();
            } else {
                // Some appointments succeeded, some failed
                if (result.created.length > 0) {
                    showWarning(
                        `Se agendaron ${result.created.length} cita(s), pero ${result.errors.length} fallaron.
                        Por favor revisa tu carrito.`
                    );
                } else {
                    showError('No se pudo agendar ninguna cita. Por favor, intenta nuevamente.');
                }

                // Show specific errors
                result.errors.forEach(err => {
                    console.error(`Error en ${err.service}:`, err.error);
                });
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            showError('Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div
            ref={offcanvasRef}
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="cartOffcanvas"
            style={{ visibility: show ? 'visible' : 'hidden' }}
        >
            <div className="offcanvas-header bg-primary text-white">
                <h5 className="offcanvas-title">
                    <i className="fas fa-shopping-cart me-2"></i>
                    Carrito de Servicios
                </h5>
                <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={onHide}
                ></button>
            </div>
            <div className="offcanvas-body">
                <div id="cartItems">
                    {isCartEmpty() ? (
                        <div className="text-center text-muted py-5" id="emptyCart">
                            <i className="fas fa-shopping-cart fa-3x mb-3"></i>
                            <h5>Tu carrito está vacío</h5>
                            <p>Agrega servicios para comenzar</p>
                        </div>
                    ) : (
                        cart.map((item, index) => (
                            <CartItem
                                key={`${item.id}-${item.veterinarian}-${item.date}-${item.time}-${index}`}
                                item={item}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemove={handleRemove}
                            />
                        ))
                    )}
                </div>

                {!isCartEmpty() && (
                    <div className="mt-auto" id="cartFooter">
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <strong>Total: <span id="cartTotal">{formatPrice(totalPrice)}</span></strong>
                        </div>
                        <div className="d-grid gap-2">
                            <Button
                                variant="danger"
                                className="w-100"
                                onClick={clearCart}
                                disabled={isProcessing}
                            >
                                <i className="fas fa-trash me-2"></i>
                                Vaciar Carrito
                            </Button>
                            <Button
                                variant="primary"
                                className="w-100"
                                onClick={handleCheckout}
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                        Procesando...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-calendar-check me-2"></i>
                                        Agendar Servicios
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}