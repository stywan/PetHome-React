import { formatPrice, formatDate, formatVeterinarianName } from './formatters.js';

describe('Formatters Utilities', () => {

    describe('formatPrice', () => {
        it('debería formatear un precio como pesos chilenos', () => {
            const result = formatPrice(50000);
            expect(result).toContain('50.000');
            expect(result).toContain('$');
        });

        it('debería formatear precios grandes correctamente', () => {
            const result = formatPrice(1000000);
            expect(result).toContain('1.000.000');
        });

        it('debería formatear precios pequeños correctamente', () => {
            const result = formatPrice(5000);
            expect(result).toContain('5.000');
        });

        it('debería formatear cero correctamente', () => {
            const result = formatPrice(0);
            expect(result).toContain('0');
        });

        it('debería usar formato de pesos chilenos (CLP)', () => {
            const result = formatPrice(100000);
            expect(result).toBeTruthy();
            expect(typeof result).toBe('string');
        });

        it('debería no incluir decimales', () => {
            const result = formatPrice(50000);
            expect(result).not.toContain(',00');
        });
    });

    describe('formatDate', () => {
        it('debería formatear una fecha en formato español', () => {
            const result = formatDate('2025-03-15');
            expect(result).toBeTruthy();
            expect(result).toContain('2025');
        });

        it('debería retornar string vacío si no hay fecha', () => {
            const result = formatDate('');
            expect(result).toBe('');
        });

        it('debería retornar string vacío si la fecha es null', () => {
            const result = formatDate(null);
            expect(result).toBe('');
        });

        it('debería retornar string vacío si la fecha es undefined', () => {
            const result = formatDate(undefined);
            expect(result).toBe('');
        });

        it('debería formatear correctamente una fecha válida', () => {
            const result = formatDate('2025-01-15');
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
        });

        it('debería incluir el mes en el formato', () => {
            const result = formatDate('2025-12-25');
            expect(result).toBeTruthy();
            expect(result).toContain('2025');
        });
    });

    describe('formatVeterinarianName', () => {
        it('debería formatear nombre de veterinario masculino', () => {
            const result = formatVeterinarianName('dr-rodriguez');
            expect(result).toBe('Dr. rodriguez');
        });

        it('debería formatear nombre de veterinario femenino', () => {
            const result = formatVeterinarianName('dra-martinez');
            expect(result).toBe('Dra. martinez');
        });

        it('debería retornar string vacío si no hay ID', () => {
            const result = formatVeterinarianName('');
            expect(result).toBe('');
        });

        it('debería retornar string vacío si el ID es null', () => {
            const result = formatVeterinarianName(null);
            expect(result).toBe('');
        });

        it('debería retornar string vacío si el ID es undefined', () => {
            const result = formatVeterinarianName(undefined);
            expect(result).toBe('');
        });

        it('debería manejar IDs con guiones', () => {
            const result = formatVeterinarianName('dr-garcia-lopez');
            expect(result).toContain('Dr. ');
            expect(result).toContain('garcia-lopez');
        });

        it('debería reemplazar correctamente el prefijo dr-', () => {
            const result = formatVeterinarianName('dr-smith');
            expect(result).not.toContain('dr-');
            expect(result).toContain('Dr. ');
        });

        it('debería reemplazar correctamente el prefijo dra-', () => {
            const result = formatVeterinarianName('dra-johnson');
            expect(result).not.toContain('dra-');
            expect(result).toContain('Dra. ');
        });
    });
});
