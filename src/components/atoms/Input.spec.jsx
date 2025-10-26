import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input Component', () => {

    describe('Renderizado básico', () => {
        it('debería renderizar un input', () => {
            render(<Input placeholder="Test input" />);
            const input = screen.getByPlaceholderText('Test input');
            expect(input).toBeTruthy();
            expect(input.tagName).toBe('INPUT');
        });

        it('debería tener type="text" por defecto', () => {
            render(<Input placeholder="Default type" />);
            const input = screen.getByPlaceholderText('Default type');
            expect(input.type).toBe('text');
        });

        it('debería aplicar la clase form-control', () => {
            render(<Input placeholder="Form control" />);
            const input = screen.getByPlaceholderText('Form control');
            expect(input.classList.contains('form-control')).toBe(true);
        });
    });

    describe('Tipos de input', () => {
        it('debería aceptar type="email"', () => {
            render(<Input type="email" placeholder="Email" />);
            const input = screen.getByPlaceholderText('Email');
            expect(input.type).toBe('email');
        });

        it('debería aceptar type="password"', () => {
            render(<Input type="password" placeholder="Password" />);
            const input = screen.getByPlaceholderText('Password');
            expect(input.type).toBe('password');
        });

        it('debería aceptar type="number"', () => {
            render(<Input type="number" placeholder="Number" />);
            const input = screen.getByPlaceholderText('Number');
            expect(input.type).toBe('number');
        });

        it('debería aceptar type="date"', () => {
            render(<Input type="date" placeholder="Date" />);
            const input = screen.getByPlaceholderText('Date');
            expect(input.type).toBe('date');
        });
    });

    describe('Propiedades', () => {
        it('debería aplicar el placeholder', () => {
            render(<Input placeholder="Enter text" />);
            const input = screen.getByPlaceholderText('Enter text');
            expect(input.placeholder).toBe('Enter text');
        });

        it('debería aplicar el value', () => {
            render(<Input value="Initial value" onChange={() => {}} />);
            const input = screen.getByDisplayValue('Initial value');
            expect(input.value).toBe('Initial value');
        });

        it('debería aplicar el id', () => {
            render(<Input id="test-id" placeholder="ID test" />);
            const input = screen.getByPlaceholderText('ID test');
            expect(input.id).toBe('test-id');
        });

        it('debería aplicar el name', () => {
            render(<Input name="test-name" placeholder="Name test" />);
            const input = screen.getByPlaceholderText('Name test');
            expect(input.name).toBe('test-name');
        });

        it('debería aplicar required', () => {
            render(<Input required placeholder="Required" />);
            const input = screen.getByPlaceholderText('Required');
            expect(input.required).toBe(true);
        });

        it('debería aplicar min para números', () => {
            render(<Input type="number" min="0" placeholder="Min test" />);
            const input = screen.getByPlaceholderText('Min test');
            expect(input.min).toBe('0');
        });

        it('debería aplicar max para números', () => {
            render(<Input type="number" max="100" placeholder="Max test" />);
            const input = screen.getByPlaceholderText('Max test');
            expect(input.max).toBe('100');
        });
    });

    describe('Funcionalidad', () => {
        it('debería llamar onChange cuando cambia el valor', () => {
            const handleChange = jasmine.createSpy('handleChange');
            render(<Input onChange={handleChange} placeholder="Change test" />);
            const input = screen.getByPlaceholderText('Change test');
            fireEvent.change(input, { target: { value: 'new value' } });
            expect(handleChange).toHaveBeenCalledTimes(1);
        });

        it('debería actualizar el valor cuando onChange es llamado', () => {
            let testValue = '';
            const handleChange = (e) => { testValue = e.target.value; };
            render(<Input onChange={handleChange} placeholder="Update test" />);
            const input = screen.getByPlaceholderText('Update test');
            fireEvent.change(input, { target: { value: 'updated' } });
            expect(testValue).toBe('updated');
        });
    });

    describe('Clases personalizadas', () => {
        it('debería aplicar className adicional', () => {
            render(<Input className="custom-input" placeholder="Custom class" />);
            const input = screen.getByPlaceholderText('Custom class');
            expect(input.classList.contains('custom-input')).toBe(true);
            expect(input.classList.contains('form-control')).toBe(true);
        });

        it('debería combinar múltiples clases', () => {
            render(<Input className="class1 class2" placeholder="Multiple classes" />);
            const input = screen.getByPlaceholderText('Multiple classes');
            expect(input.classList.contains('class1')).toBe(true);
            expect(input.classList.contains('class2')).toBe(true);
            expect(input.classList.contains('form-control')).toBe(true);
        });
    });
});
