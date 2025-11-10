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
        const { petId, veterinarian, date, time, notes } = appointmentDetails;

        const existingItem = cart.find(item =>
            item.id === service.id &&
            item.petId === petId &&
            item.veterinarian === veterinarian &&
            item.date === date &&
            item.time === time
        );

        if (existingItem) {
            setCart(cart.map(item =>
                item.id === service.id &&
                item.petId === petId &&
                item.veterinarian === veterinarian &&
                item.date === date &&
                item.time === time
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, {
                ...service,
                petId,
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
    const removeFromCart = (serviceId, petId = "", veterinarian = "", date = "", time = "") => {
        setCart(cart.filter(item =>
            !(item.id === serviceId &&
                item.petId === petId &&
                item.veterinarian === veterinarian &&
                item.date === date &&
                item.time === time)
        ));
    };

    /**
     * Update quantity of item in cart
     */
    const updateQuantity = (serviceId, newQuantity, petId = "", veterinarian = "", date = "", time = "") => {
        if (newQuantity <= 0) {
            removeFromCart(serviceId, petId, veterinarian, date, time);
            return;
        }

        setCart(cart.map(item =>
            item.id === serviceId &&
            item.petId === petId &&
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

    /**
     * Process checkout - convert cart items to appointments
     * Returns array of appointment IDs that were created
     */
    const processCheckout = async (createAppointmentFn, userId) => {
        const results = [];
        const errors = [];

        for (const item of cart) {
            try {
                // Ensure time has seconds format (HH:mm:ss)
                const formattedTime = item.time.includes(':') && item.time.split(':').length === 2
                    ? `${item.time}:00`
                    : item.time;

                // Prepare appointment data according to backend schema
                // TODO: Get user's default address from backend instead of hardcoded value
                const appointmentData = {
                    clientId: userId,
                    veterinarianId: parseInt(item.veterinarian),
                    petId: parseInt(item.petId),
                    serviceId: parseInt(item.id),
                    date: item.date,
                    time: formattedTime,
                    duration: item.duration,
                    address: item.address || "Dirección del cliente (pendiente de configurar)",
                    notes: item.notes || ''
                    // status is NOT included - backend sets it to "pending" automatically
                };

                console.log('Sending appointment data:', appointmentData);
                console.log('Cart item:', item);

                const result = await createAppointmentFn(appointmentData);

                if (result.success) {
                    results.push(result.appointment);
                } else {
                    errors.push({
                        service: item.name,
                        error: result.error
                    });
                }
            } catch (error) {
                errors.push({
                    service: item.name,
                    error: error.message
                });
            }
        }

        // If all appointments were created successfully, clear the cart
        if (errors.length === 0) {
            clearCart();
        }

        return {
            success: errors.length === 0,
            created: results,
            errors: errors
        };
    };

    const value = {
        cart,
        addServiceToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotals,
        isCartEmpty,
        processCheckout
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}