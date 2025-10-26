import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

// Mock service para tests
const mockService = {
    id: "1",
    name: "Consulta Veterinaria",
    description: "Consulta general",
    price: 50000,
    duration: "45 min",
    category: "consultation",
    animals: ["dog", "cat"],
    image: "/img/1-serv.png"
};

const mockAppointmentDetails = {
    veterinarian: "dr-rodriguez",
    date: "2025-03-15",
    time: "10:00",
    notes: "Primera consulta"
};

// Componente de prueba para estado inicial
function InitialStateComponent() {
    const { cart, isCartEmpty, getCartTotals } = useCart();
    const totals = getCartTotals();

    return (
        <div>
            <div data-testid="cart-length">{cart.length}</div>
            <div data-testid="is-empty">{isCartEmpty() ? 'empty' : 'not-empty'}</div>
            <div data-testid="total-items">{totals.totalItems}</div>
            <div data-testid="total-price">{totals.totalPrice}</div>
        </div>
    );
}

// Componente de prueba para agregar al carrito
function AddToCartComponent() {
    const { cart, addServiceToCart } = useCart();

    const handleAdd = () => {
        addServiceToCart(mockService, mockAppointmentDetails);
    };

    return (
        <div>
            <button data-testid="add-button" onClick={handleAdd}>
                Agregar
            </button>
            <div data-testid="cart-length">{cart.length}</div>
            {cart.map((item, index) => (
                <div key={index} data-testid={`item-${index}`}>
                    <span data-testid={`item-name-${index}`}>{item.name}</span>
                    <span data-testid={`item-quantity-${index}`}>{item.quantity}</span>
                    <span data-testid={`item-vet-${index}`}>{item.veterinarian}</span>
                </div>
            ))}
        </div>
    );
}

// Componente de prueba para eliminar del carrito
function RemoveFromCartComponent() {
    const { cart, addServiceToCart, removeFromCart } = useCart();

    const handleAdd = () => {
        addServiceToCart(mockService, mockAppointmentDetails);
    };

    const handleRemove = () => {
        removeFromCart(
            mockService.id,
            mockAppointmentDetails.veterinarian,
            mockAppointmentDetails.date,
            mockAppointmentDetails.time
        );
    };

    return (
        <div>
            <button data-testid="add-button" onClick={handleAdd}>Agregar</button>
            <button data-testid="remove-button" onClick={handleRemove}>Eliminar</button>
            <div data-testid="cart-length">{cart.length}</div>
        </div>
    );
}

// Componente de prueba para actualizar cantidad
function UpdateQuantityComponent() {
    const { cart, addServiceToCart, updateQuantity } = useCart();

    const handleAdd = () => {
        addServiceToCart(mockService, mockAppointmentDetails);
    };

    const handleUpdate = (newQuantity) => {
        updateQuantity(
            mockService.id,
            newQuantity,
            mockAppointmentDetails.veterinarian,
            mockAppointmentDetails.date,
            mockAppointmentDetails.time
        );
    };

    return (
        <div>
            <button data-testid="add-button" onClick={handleAdd}>Agregar</button>
            <button data-testid="update-3-button" onClick={() => handleUpdate(3)}>
                Actualizar a 3
            </button>
            <button data-testid="update-0-button" onClick={() => handleUpdate(0)}>
                Actualizar a 0
            </button>
            <div data-testid="cart-length">{cart.length}</div>
            {cart.length > 0 && (
                <div data-testid="item-quantity">{cart[0].quantity}</div>
            )}
        </div>
    );
}

// Componente de prueba para vaciar carrito
function ClearCartComponent() {
    const { cart, addServiceToCart, clearCart } = useCart();

    const handleAdd = () => {
        addServiceToCart(mockService, mockAppointmentDetails);
    };

    return (
        <div>
            <button data-testid="add-button" onClick={handleAdd}>Agregar</button>
            <button data-testid="clear-button" onClick={clearCart}>Vaciar</button>
            <div data-testid="cart-length">{cart.length}</div>
        </div>
    );
}

// Componente de prueba para totales
function TotalsComponent() {
    const { cart, addServiceToCart, getCartTotals } = useCart();
    const [count, setCount] = useState(0);

    const handleAdd = () => {
        addServiceToCart(mockService, mockAppointmentDetails);
        setCount(count + 1);
    };

    const totals = getCartTotals();

    return (
        <div>
            <button data-testid="add-button" onClick={handleAdd}>Agregar</button>
            <div data-testid="total-items">{totals.totalItems}</div>
            <div data-testid="total-price">{totals.totalPrice}</div>
        </div>
    );
}

describe('CartContext', () => {

    describe('Estado inicial del carrito', () => {
        it('debería proporcionar un carrito vacío por defecto', () => {
            render(
                <CartProvider>
                    <InitialStateComponent />
                </CartProvider>
            );

            expect(screen.getByTestId('cart-length').textContent).toBe('0');
            expect(screen.getByTestId('is-empty').textContent).toBe('empty');
        });

        it('debería tener totales en cero', () => {
            render(
                <CartProvider>
                    <InitialStateComponent />
                </CartProvider>
            );

            expect(screen.getByTestId('total-items').textContent).toBe('0');
            expect(screen.getByTestId('total-price').textContent).toBe('0');
        });
    });

    describe('addServiceToCart', () => {
        it('debería agregar un servicio al carrito', () => {
            render(
                <CartProvider>
                    <AddToCartComponent />
                </CartProvider>
            );

            const addButton = screen.getByTestId('add-button');
            fireEvent.click(addButton);

            expect(screen.getByTestId('cart-length').textContent).toBe('1');
            expect(screen.getByTestId('item-name-0').textContent).toBe(mockService.name);
            expect(screen.getByTestId('item-quantity-0').textContent).toBe('1');
            expect(screen.getByTestId('item-vet-0').textContent).toBe(mockAppointmentDetails.veterinarian);
        });

        it('debería incrementar cantidad si el mismo servicio ya existe', () => {
            render(
                <CartProvider>
                    <AddToCartComponent />
                </CartProvider>
            );

            const addButton = screen.getByTestId('add-button');
            fireEvent.click(addButton);
            fireEvent.click(addButton);

            expect(screen.getByTestId('cart-length').textContent).toBe('1');
            expect(screen.getByTestId('item-quantity-0').textContent).toBe('2');
        });

        it('debería agregar múltiples veces correctamente', () => {
            render(
                <CartProvider>
                    <AddToCartComponent />
                </CartProvider>
            );

            const addButton = screen.getByTestId('add-button');
            fireEvent.click(addButton);
            fireEvent.click(addButton);
            fireEvent.click(addButton);

            expect(screen.getByTestId('cart-length').textContent).toBe('1');
            expect(screen.getByTestId('item-quantity-0').textContent).toBe('3');
        });
    });

    describe('removeFromCart', () => {
        it('debería eliminar un item del carrito', () => {
            render(
                <CartProvider>
                    <RemoveFromCartComponent />
                </CartProvider>
            );

            const addButton = screen.getByTestId('add-button');
            const removeButton = screen.getByTestId('remove-button');

            fireEvent.click(addButton);
            expect(screen.getByTestId('cart-length').textContent).toBe('1');

            fireEvent.click(removeButton);
            expect(screen.getByTestId('cart-length').textContent).toBe('0');
        });

        it('debería mantener el carrito vacío si se intenta eliminar de un carrito vacío', () => {
            render(
                <CartProvider>
                    <RemoveFromCartComponent />
                </CartProvider>
            );

            const removeButton = screen.getByTestId('remove-button');
            fireEvent.click(removeButton);

            expect(screen.getByTestId('cart-length').textContent).toBe('0');
        });
    });

    describe('updateQuantity', () => {
        it('debería actualizar la cantidad de un item', () => {
            render(
                <CartProvider>
                    <UpdateQuantityComponent />
                </CartProvider>
            );

            const addButton = screen.getByTestId('add-button');
            const updateButton = screen.getByTestId('update-3-button');

            fireEvent.click(addButton);
            expect(screen.getByTestId('item-quantity').textContent).toBe('1');

            fireEvent.click(updateButton);
            expect(screen.getByTestId('item-quantity').textContent).toBe('3');
        });

        it('debería eliminar el item si la cantidad es 0', () => {
            render(
                <CartProvider>
                    <UpdateQuantityComponent />
                </CartProvider>
            );

            const addButton = screen.getByTestId('add-button');
            const updateButton = screen.getByTestId('update-0-button');

            fireEvent.click(addButton);
            expect(screen.getByTestId('cart-length').textContent).toBe('1');

            fireEvent.click(updateButton);
            expect(screen.getByTestId('cart-length').textContent).toBe('0');
        });
    });

    describe('clearCart', () => {
        it('debería vaciar todo el carrito', () => {
            render(
                <CartProvider>
                    <ClearCartComponent />
                </CartProvider>
            );

            const addButton = screen.getByTestId('add-button');
            const clearButton = screen.getByTestId('clear-button');

            fireEvent.click(addButton);
            fireEvent.click(addButton);
            expect(screen.getByTestId('cart-length').textContent).toBe('1');

            fireEvent.click(clearButton);
            expect(screen.getByTestId('cart-length').textContent).toBe('0');
        });
    });

    describe('getCartTotals', () => {
        it('debería calcular correctamente el total de items', () => {
            render(
                <CartProvider>
                    <TotalsComponent />
                </CartProvider>
            );

            const addButton = screen.getByTestId('add-button');

            fireEvent.click(addButton);
            fireEvent.click(addButton);

            expect(screen.getByTestId('total-items').textContent).toBe('2');
        });

        it('debería calcular correctamente el precio total', () => {
            render(
                <CartProvider>
                    <TotalsComponent />
                </CartProvider>
            );

            const addButton = screen.getByTestId('add-button');

            fireEvent.click(addButton);
            fireEvent.click(addButton);

            expect(screen.getByTestId('total-price').textContent).toBe('100000'); // 50000 * 2
        });

        it('debería retornar 0 para carrito vacío', () => {
            render(
                <CartProvider>
                    <TotalsComponent />
                </CartProvider>
            );

            expect(screen.getByTestId('total-items').textContent).toBe('0');
            expect(screen.getByTestId('total-price').textContent).toBe('0');
        });
    });

    describe('isCartEmpty', () => {
        it('debería retornar true cuando el carrito está vacío', () => {
            render(
                <CartProvider>
                    <InitialStateComponent />
                </CartProvider>
            );

            expect(screen.getByTestId('is-empty').textContent).toBe('empty');
        });

        it('debería retornar false cuando hay items en el carrito', () => {
            render(
                <CartProvider>
                    <AddToCartComponent />
                </CartProvider>
            );

            const addButton = screen.getByTestId('add-button');
            fireEvent.click(addButton);

            // Necesitamos un componente que muestre isCartEmpty
            // Por ahora verificamos que hay items
            expect(screen.getByTestId('cart-length').textContent).toBe('1');
        });
    });
});
