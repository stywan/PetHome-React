import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    /**
     * Add service to cart with appointment details
     */
    const addServiceToCart = (service, appointmentDetails) => {
        const { veterinarian, date, time, notes } = appointmentDetails;

        const existingItem = cart.find(item =>
            item.id === service.id &&
            item.veterinarian === veterinarian &&
            item.date === date &&
            item.time === time
        );

        if (existingItem) {
            setCart(cart.map(item =>
                item.id === service.id &&
                item.veterinarian === veterinarian &&
                item.date === date &&
                item.time === time
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, {
                ...service,
                veterinarian,
                date,
                time,
                notes: notes || "",
                quantity: 1
            }]);
        }
        return true;
    };

    /**
     * Remove item from cart
     */
    const removeFromCart = (serviceId, veterinarian = "", date = "", time = "") => {
        setCart(cart.filter(item =>
            !(item.id === serviceId &&
                item.veterinarian === veterinarian &&
                item.date === date &&
                item.time === time)
        ));
    };

    /**
     * Update quantity of item in cart
     */
    const updateQuantity = (serviceId, newQuantity, veterinarian = "", date = "", time = "") => {
        if (newQuantity <= 0) {
            removeFromCart(serviceId, veterinarian, date, time);
            return;
        }

        setCart(cart.map(item =>
            item.id === serviceId &&
            item.veterinarian === veterinarian &&
            item.date === date &&
            item.time === time
                ? { ...item, quantity: newQuantity }
                : item
        ));
    };

    /**
     * Clear entire cart
     */
    const clearCart = () => {
        setCart([]);
    };

    /**
     * Get cart totals
     */
    const getCartTotals = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return { totalItems, totalPrice };
    };

    /**
     * Check if cart is empty
     */
    const isCartEmpty = () => {
        return cart.length === 0;
    };

    const value = {
        cart,
        addServiceToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotals,
        isCartEmpty
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}