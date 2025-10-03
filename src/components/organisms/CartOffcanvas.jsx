import { useCart } from '../../context/CartContext';
import { CartItem } from '../molecules/CartItem';
import { Button } from '../atoms/Button';
import { formatPrice } from '../../utils/formatters';
import { useEffect, useRef } from 'react';

export function CartOffcanvas({ show, onHide }) {
    const { cart, updateQuantity, removeFromCart, clearCart, getCartTotals, isCartEmpty } = useCart();
    const { totalPrice } = getCartTotals();
    const offcanvasRef = useRef(null);

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
        updateQuantity(item.id, newQuantity, item.veterinarian, item.date, item.time);
    };

    const handleRemove = (item) => {
        removeFromCart(item.id, item.veterinarian, item.date, item.time);
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
                            <Button variant="danger" className="w-100" onClick={clearCart}>
                                <i className="fas fa-trash me-2"></i>
                                Vaciar Carrito
                            </Button>
                            <Button variant="primary" className="w-100">
                                <i className="fas fa-calendar-check me-2"></i>
                                Agendar Servicios
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}