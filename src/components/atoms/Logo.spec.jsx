import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Logo } from './Logo';

describe('Logo Component', () => {

    describe('Renderizado básico', () => {
        it('debería renderizar el logo', () => {
            render(
                <BrowserRouter>
                    <Logo />
                </BrowserRouter>
            );
            const logo = screen.getByAltText('Logo PetHome');
            expect(logo).toBeTruthy();
            expect(logo.tagName).toBe('IMG');
        });

        it('debería renderizar como un Link a la página principal', () => {
            const { container } = render(
                <BrowserRouter>
                    <Logo />
                </BrowserRouter>
            );
            const link = container.querySelector('a');
            expect(link).toBeTruthy();
            expect(link.getAttribute('href')).toBe('/');
        });

        it('debería tener la clase navbar-brand en el Link', () => {
            const { container } = render(
                <BrowserRouter>
                    <Logo />
                </BrowserRouter>
            );
            const link = container.querySelector('a');
            expect(link.classList.contains('navbar-brand')).toBe(true);
        });
    });

    describe('Imagen del logo', () => {
        it('debería usar la ruta correcta de la imagen', () => {
            render(
                <BrowserRouter>
                    <Logo />
                </BrowserRouter>
            );
            const logo = screen.getByAltText('Logo PetHome');
            expect(logo.src).toContain('/img/logo_pethome.svg');
        });

        it('debería tener el texto alternativo correcto', () => {
            render(
                <BrowserRouter>
                    <Logo />
                </BrowserRouter>
            );
            const logo = screen.getByAltText('Logo PetHome');
            expect(logo.alt).toBe('Logo PetHome');
        });

        it('debería aplicar la clase img-logo por defecto', () => {
            render(
                <BrowserRouter>
                    <Logo />
                </BrowserRouter>
            );
            const logo = screen.getByAltText('Logo PetHome');
            expect(logo.classList.contains('img-logo')).toBe(true);
        });
    });

    describe('Clase personalizada', () => {
        it('debería aceptar una className personalizada', () => {
            render(
                <BrowserRouter>
                    <Logo className="custom-logo-class" />
                </BrowserRouter>
            );
            const logo = screen.getByAltText('Logo PetHome');
            expect(logo.classList.contains('custom-logo-class')).toBe(true);
        });

        it('debería reemplazar la clase por defecto con la personalizada', () => {
            render(
                <BrowserRouter>
                    <Logo className="my-logo" />
                </BrowserRouter>
            );
            const logo = screen.getByAltText('Logo PetHome');
            expect(logo.classList.contains('my-logo')).toBe(true);
            expect(logo.classList.contains('img-logo')).toBe(false);
        });
    });
});
