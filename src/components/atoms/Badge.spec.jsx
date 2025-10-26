import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge Component', () => {

    describe('Renderizado básico', () => {
        it('debería renderizar un badge con el texto proporcionado', () => {
            render(<Badge>Test Badge</Badge>);
            const badge = screen.getByText('Test Badge');
            expect(badge).toBeTruthy();
            expect(badge.textContent).toBe('Test Badge');
        });

        it('debería renderizar como un span', () => {
            render(<Badge>Span Badge</Badge>);
            const badge = screen.getByText('Span Badge');
            expect(badge.tagName).toBe('SPAN');
        });
    });

    describe('Variantes de estilo', () => {
        it('debería aplicar la clase primary por defecto', () => {
            render(<Badge>Primary Badge</Badge>);
            const badge = screen.getByText('Primary Badge');
            expect(badge.classList.contains('badge')).toBe(true);
            expect(badge.classList.contains('bg-primary')).toBe(true);
        });

        it('debería aplicar la clase secondary cuando variant="secondary"', () => {
            render(<Badge variant="secondary">Secondary Badge</Badge>);
            const badge = screen.getByText('Secondary Badge');
            expect(badge.classList.contains('badge')).toBe(true);
            expect(badge.classList.contains('bg-secondary')).toBe(true);
        });

        it('debería aplicar la clase price cuando variant="price"', () => {
            render(<Badge variant="price">$50.000</Badge>);
            const badge = screen.getByText('$50.000');
            expect(badge.classList.contains('badge')).toBe(true);
            expect(badge.classList.contains('price-badge')).toBe(true);
        });

        it('debería aplicar la clase duration cuando variant="duration"', () => {
            render(<Badge variant="duration">45 min</Badge>);
            const badge = screen.getByText('45 min');
            expect(badge.classList.contains('badge')).toBe(true);
            expect(badge.classList.contains('duration-badge')).toBe(true);
        });

        it('debería aplicar la clase light cuando variant="light"', () => {
            render(<Badge variant="light">Light Badge</Badge>);
            const badge = screen.getByText('Light Badge');
            expect(badge.classList.contains('badge')).toBe(true);
            expect(badge.classList.contains('bg-light')).toBe(true);
            expect(badge.classList.contains('text-dark')).toBe(true);
        });

        it('debería aplicar la clase animal cuando variant="animal"', () => {
            render(<Badge variant="animal">Perro</Badge>);
            const badge = screen.getByText('Perro');
            expect(badge.classList.contains('animal-tag')).toBe(true);
        });
    });

    describe('Clases personalizadas', () => {
        it('debería aplicar clases CSS adicionales', () => {
            render(<Badge className="custom-class">Custom Badge</Badge>);
            const badge = screen.getByText('Custom Badge');
            expect(badge.classList.contains('custom-class')).toBe(true);
            expect(badge.classList.contains('bg-primary')).toBe(true);
        });

        it('debería combinar variant y className', () => {
            render(<Badge variant="price" className="my-class">Price</Badge>);
            const badge = screen.getByText('Price');
            expect(badge.classList.contains('price-badge')).toBe(true);
            expect(badge.classList.contains('my-class')).toBe(true);
        });
    });
});
