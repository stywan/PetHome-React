import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Button } from './Button';

describe('Button Component', () => {

    describe('Renderizado básico', () => {
        it('debería renderizar un botón con el texto proporcionado', () => {
            render(<Button>Click me</Button>);
            const button = screen.getByText('Click me');
            expect(button).toBeTruthy();
            expect(button.textContent).toBe('Click me');
        });

        it('debería renderizar un botón por defecto', () => {
            render(<Button>Test Button</Button>);
            const button = screen.getByText('Test Button');
            expect(button.tagName).toBe('BUTTON');
        });
    });

    describe('Variantes de estilo', () => {
        it('debería aplicar la clase primary por defecto', () => {
            render(<Button>Primary Button</Button>);
            const button = screen.getByText('Primary Button');
            expect(button.classList.contains('btn-primary')).toBe(true);
        });

        it('debería aplicar la clase secondary cuando variant="secondary"', () => {
            render(<Button variant="secondary">Secondary Button</Button>);
            const button = screen.getByText('Secondary Button');
            expect(button.classList.contains('btn-outline-primary')).toBe(true);
            expect(button.classList.contains('btn-second')).toBe(true);
        });

        it('debería aplicar la clase service cuando variant="service"', () => {
            render(<Button variant="service">Service Button</Button>);
            const button = screen.getByText('Service Button');
            expect(button.classList.contains('btn-primary-service')).toBe(true);
        });

        it('debería aplicar la clase login cuando variant="login"', () => {
            render(<Button variant="login">Login Button</Button>);
            const button = screen.getByText('Login Button');
            expect(button.classList.contains('btn-primary-signup')).toBe(true);
            expect(button.classList.contains('btn-login')).toBe(true);
        });

        it('debería aplicar la clase outline cuando variant="outline"', () => {
            render(<Button variant="outline">Outline Button</Button>);
            const button = screen.getByText('Outline Button');
            expect(button.classList.contains('btn-outline-primary')).toBe(true);
        });

        it('debería aplicar la clase danger cuando variant="danger"', () => {
            render(<Button variant="danger">Danger Button</Button>);
            const button = screen.getByText('Danger Button');
            expect(button.classList.contains('btn-outline-danger')).toBe(true);
        });
    });

    describe('Tamaños', () => {
        it('debería aplicar tamaño md por defecto (sin clase adicional)', () => {
            render(<Button>Medium Button</Button>);
            const button = screen.getByText('Medium Button');
            expect(button.classList.contains('btn')).toBe(true);
            expect(button.classList.contains('btn-sm')).toBe(false);
            expect(button.classList.contains('btn-lg')).toBe(false);
        });

        it('debería aplicar la clase btn-sm cuando size="sm"', () => {
            render(<Button size="sm">Small Button</Button>);
            const button = screen.getByText('Small Button');
            expect(button.classList.contains('btn-sm')).toBe(true);
        });

        it('debería aplicar la clase btn-lg cuando size="lg"', () => {
            render(<Button size="lg">Large Button</Button>);
            const button = screen.getByText('Large Button');
            expect(button.classList.contains('btn-lg')).toBe(true);
        });
    });

    describe('Funcionalidad', () => {
        it('debería llamar onClick cuando se hace click', () => {
            const handleClick = jasmine.createSpy('handleClick');
            render(<Button onClick={handleClick}>Clickable Button</Button>);
            const button = screen.getByText('Clickable Button');
            fireEvent.click(button);
            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it('debería poder ser deshabilitado', () => {
            render(<Button disabled>Disabled Button</Button>);
            const button = screen.getByText('Disabled Button');
            expect(button.disabled).toBe(true);
        });

        it('no debería llamar onClick cuando está deshabilitado', () => {
            const handleClick = jasmine.createSpy('handleClick');
            render(<Button onClick={handleClick} disabled>Disabled Button</Button>);
            const button = screen.getByText('Disabled Button');
            fireEvent.click(button);
            expect(handleClick).not.toHaveBeenCalled();
        });
    });

    describe('Tipo de botón', () => {
        it('debería tener type="button" por defecto', () => {
            render(<Button>Default Type</Button>);
            const button = screen.getByText('Default Type');
            expect(button.type).toBe('button');
        });

        it('debería aplicar type="submit" cuando se especifica', () => {
            render(<Button type="submit">Submit Button</Button>);
            const button = screen.getByText('Submit Button');
            expect(button.type).toBe('submit');
        });
    });

    describe('Clases personalizadas', () => {
        it('debería aplicar clases CSS adicionales', () => {
            render(<Button className="custom-class another-class">Custom Button</Button>);
            const button = screen.getByText('Custom Button');
            expect(button.classList.contains('custom-class')).toBe(true);
            expect(button.classList.contains('another-class')).toBe(true);
        });
    });

    describe('Renderizado como Link', () => {
        it('debería renderizar un Link cuando se proporciona "to"', () => {
            render(
                <BrowserRouter>
                    <Button to="/services">Go to Services</Button>
                </BrowserRouter>
            );
            const link = screen.getByText('Go to Services');
            expect(link.tagName).toBe('A');
            expect(link.getAttribute('href')).toBe('/services');
        });

        it('debería aplicar las clases correctas al Link', () => {
            render(
                <BrowserRouter>
                    <Button to="/home" variant="secondary" size="lg">Link Button</Button>
                </BrowserRouter>
            );
            const link = screen.getByText('Link Button');
            expect(link.classList.contains('btn')).toBe(true);
            expect(link.classList.contains('btn-outline-primary')).toBe(true);
            expect(link.classList.contains('btn-second')).toBe(true);
            expect(link.classList.contains('btn-lg')).toBe(true);
        });
    });
});
