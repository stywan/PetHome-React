import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar Component', () => {

    describe('Renderizado básico', () => {
        it('debería renderizar el componente SearchBar', () => {
            render(<SearchBar value="" onChange={() => {}} />);
            const input = screen.getByPlaceholderText('Buscar servicios...');
            expect(input).toBeTruthy();
        });

        it('debería renderizar con placeholder por defecto', () => {
            render(<SearchBar value="" onChange={() => {}} />);
            const input = screen.getByPlaceholderText('Buscar servicios...');
            expect(input.placeholder).toBe('Buscar servicios...');
        });

        it('debería renderizar con placeholder personalizado', () => {
            render(<SearchBar value="" onChange={() => {}} placeholder="Buscar..." />);
            const input = screen.getByPlaceholderText('Buscar...');
            expect(input.placeholder).toBe('Buscar...');
        });

        it('debería tener el id searchInput', () => {
            render(<SearchBar value="" onChange={() => {}} />);
            const input = screen.getByPlaceholderText('Buscar servicios...');
            expect(input.id).toBe('searchInput');
        });
    });

    describe('Valor del input', () => {
        it('debería mostrar el valor proporcionado', () => {
            render(<SearchBar value="test query" onChange={() => {}} />);
            const input = screen.getByDisplayValue('test query');
            expect(input.value).toBe('test query');
        });

        it('debería actualizar cuando onChange es llamado', () => {
            let searchValue = '';
            const handleChange = (value) => { searchValue = value; };
            render(<SearchBar value={searchValue} onChange={handleChange} />);
            const input = screen.getByPlaceholderText('Buscar servicios...');
            fireEvent.change(input, { target: { value: 'nueva búsqueda' } });
            expect(searchValue).toBe('nueva búsqueda');
        });

        it('debería llamar onChange con el valor del input', () => {
            const handleChange = jasmine.createSpy('handleChange');
            render(<SearchBar value="" onChange={handleChange} />);
            const input = screen.getByPlaceholderText('Buscar servicios...');
            fireEvent.change(input, { target: { value: 'test' } });
            expect(handleChange).toHaveBeenCalledWith('test');
        });
    });

    describe('Estructura HTML', () => {
        it('debería tener la estructura correcta con container', () => {
            const { container } = render(<SearchBar value="" onChange={() => {}} />);
            const section = container.querySelector('section');
            expect(section).toBeTruthy();
            expect(section.classList.contains('bg-light')).toBe(true);
        });

        it('debería contener el ícono de búsqueda', () => {
            const { container } = render(<SearchBar value="" onChange={() => {}} />);
            const icon = container.querySelector('.fa-search');
            expect(icon).toBeTruthy();
        });

        it('debería tener el container de búsqueda', () => {
            const { container } = render(<SearchBar value="" onChange={() => {}} />);
            const searchContainer = container.querySelector('.search-container');
            expect(searchContainer).toBeTruthy();
        });
    });
});
