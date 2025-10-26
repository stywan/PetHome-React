# Configuración de Pruebas - PetHome React

Este documento describe la configuración completa de pruebas implementada en el proyecto PetHome React utilizando Karma, Jasmine y Webpack.

## 🛠️ Stack de Testing

- **Karma**: Test runner que ejecuta tests en navegadores reales
- **Jasmine**: Framework de testing BDD (Behavior-Driven Development)
- **Webpack**: Bundler para transpilar y empaquetar tests
- **@testing-library/react**: Utilidades para testing de componentes React
- **Babel**: Transpilador para JSX y ES6+
- **Istanbul/babel-plugin-istanbul**: Instrumentación de código para cobertura
- **karma-coverage**: Plugin de Karma para reportes de cobertura

## 📦 Dependencias Instaladas

```json
{
  "devDependencies": {
    "@babel/core": "^7.28.5",
    "@babel/preset-env": "^7.28.5",
    "@babel/preset-react": "^7.28.5",
    "@testing-library/react": "^16.3.0",
    "babel-loader": "^10.0.0",
    "css-loader": "^7.1.2",
    "jasmine-core": "^5.12.0",
    "karma": "^6.4.4",
    "karma-chrome-launcher": "^3.2.0",
    "karma-jasmine": "^5.1.0",
    "karma-jasmine-html-reporter": "^2.1.0",
    "karma-spec-reporter": "^0.0.36",
    "karma-webpack": "^5.0.1",
    "style-loader": "^4.0.0",
    "webpack": "^5.102.1",
    "webpack-cli": "^6.0.1"
  }
}
```

## ⚙️ Archivos de Configuración

### karma.conf.cjs
Configuración principal de Karma con:
- Frameworks: Jasmine y Webpack
- Navegadores: Chrome (y ChromeHeadlessCI para CI/CD)
- Reporteros: spec y jasmine-html-reporter
- Configuración de Webpack integrada para transpilar JSX

### .babelrc
Configuración de Babel para transpilar JSX y ES6+:
```json
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
```

## 🚀 Scripts Disponibles

En el `package.json` están disponibles los siguientes scripts:

```bash
# Ejecutar tests en modo watch (abre navegador Chrome)
npm test

# Ejecutar tests una sola vez y salir
npm run test:single

# Ejecutar tests en modo headless (ideal para CI/CD)
npm run test:headless

# Ejecutar tests con cobertura y abrir reporte HTML
npm run test:coverage

# Abrir reporte de cobertura existente
npm run test:coverage:report
```

## 📝 Estructura de Tests

Los archivos de tests deben:
1. Ubicarse junto al componente que prueban
2. Usar la extensión `.spec.jsx` o `.spec.js`
3. Seguir el patrón: `ComponentName.spec.jsx`

Ejemplo de estructura:
```
src/
  components/
    atoms/
      Button.jsx
      Button.spec.jsx
```

## ✅ Ejemplo de Test

```jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
    it('debería renderizar un botón con el texto proporcionado', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByText('Click me');
        expect(button).toBeTruthy();
        expect(button.textContent).toBe('Click me');
    });

    it('debería llamar onClick cuando se hace click', () => {
        const handleClick = jasmine.createSpy('handleClick');
        render(<Button onClick={handleClick}>Clickable</Button>);
        const button = screen.getByText('Clickable');
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
```

## 🎯 Matchers de Jasmine

Como estamos usando Jasmine (no Jest), usa estos matchers:

### Matchers Básicos
- `expect(value).toBe(expected)` - Igualdad estricta (===)
- `expect(value).toEqual(expected)` - Igualdad profunda
- `expect(value).toBeTruthy()` / `toBeFalsy()` - Valores truthy/falsy
- `expect(value).toBeNull()` / `toBeUndefined()` - Valores null/undefined
- `expect(value).toBeDefined()` - Valor definido

### Matchers de Números
- `expect(value).toBeGreaterThan(number)`
- `expect(value).toBeLessThan(number)`
- `expect(value).toBeCloseTo(number, precision)`

### Matchers de Strings
- `expect(string).toContain(substring)`
- `expect(string).toMatch(/regex/)`

### Matchers de Arrays
- `expect(array).toContain(item)`

### Matchers de Funciones (Spies)
- `expect(spy).toHaveBeenCalled()`
- `expect(spy).toHaveBeenCalledTimes(number)`
- `expect(spy).toHaveBeenCalledWith(arg1, arg2, ...)`
- `expect(spy).not.toHaveBeenCalled()`

### Testing de DOM
En lugar de `@testing-library/jest-dom`, usa propiedades nativas del DOM:

```jsx
// Verificar clases CSS
expect(element.classList.contains('class-name')).toBe(true);

// Verificar atributos
expect(element.getAttribute('href')).toBe('/path');

// Verificar disabled
expect(element.disabled).toBe(true);

// Verificar tipo de elemento
expect(element.tagName).toBe('BUTTON');

// Verificar propiedades
expect(element.type).toBe('submit');
expect(element.textContent).toBe('Text');
```

## 🧪 Crear un Spy (Mock Function)

```jsx
// Crear un spy
const mockFn = jasmine.createSpy('functionName');

// Usar el spy
<Button onClick={mockFn}>Click</Button>

// Verificar llamadas
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(1);
```

## 🔍 Testing con React Router

Para componentes que usan `Link` o `useNavigate`, envuélvelos en `BrowserRouter`:

```jsx
import { BrowserRouter } from 'react-router-dom';

it('debería renderizar un link', () => {
    render(
        <BrowserRouter>
            <Button to="/services">Go to Services</Button>
        </BrowserRouter>
    );
    const link = screen.getByText('Go to Services');
    expect(link.tagName).toBe('A');
});
```

## 🎨 Testing con Context

Para componentes que usan Context, envuélvelos en el Provider:

```jsx
import { CartContext } from '../../context/CartContext';

it('debería usar el contexto', () => {
    const mockCart = {
        items: [],
        addServiceToCart: jasmine.createSpy('addServiceToCart')
    };

    render(
        <CartContext.Provider value={mockCart}>
            <YourComponent />
        </CartContext.Provider>
    );
    // ... tus aserciones
});
```

## 📊 Resultados de Tests

Después de ejecutar `npm run test:single`, verás un reporte como:

```
Button Component
  Renderizado básico
    ✓ debería renderizar un botón con el texto proporcionado
    ✓ debería renderizar un botón por defecto
  Variantes de estilo
    ✓ debería aplicar la clase primary por defecto
    ...

Chrome 141.0.0.0 (Mac OS): Executed 19 of 19 SUCCESS (0.026 secs / 0.021 secs)
TOTAL: 19 SUCCESS
```

## 🚨 Troubleshooting

### Error: "module is not defined"
- Asegúrate de que el archivo de configuración sea `karma.conf.cjs` (no `.js`)
- El proyecto usa ESM (`"type": "module"` en package.json)

### Error: "expect.extend is not a function"
- No uses `@testing-library/jest-dom` con Jasmine
- Usa propiedades nativas del DOM en su lugar

### Tests no se encuentran
- Verifica que los archivos terminen en `.spec.jsx` o `.spec.js`
- Asegúrate de que estén dentro del directorio `src/`

## 📚 Recursos Adicionales

- [Documentación de Jasmine](https://jasmine.github.io/)
- [Documentación de Karma](https://karma-runner.github.io/)
- [Testing Library - React](https://testing-library.com/docs/react-testing-library/intro/)
- [Webpack Documentation](https://webpack.js.org/)

## 📊 Cobertura de Código

### Configuración de Cobertura

El proyecto está configurado con:
- **babel-plugin-istanbul**: Para instrumentar el código
- **karma-coverage**: Para generar reportes de cobertura
- **Umbral mínimo**: 85% en todas las métricas (statements, branches, functions, lines)

### Reportes Generados

Después de ejecutar `npm run test:coverage`, se generan los siguientes reportes en el directorio `coverage/`:

1. **Reporte HTML** (`coverage/html/index.html`): Reporte visual interactivo que se abre automáticamente
2. **LCOV** (`coverage/lcov.info`): Para integración con herramientas de CI/CD
3. **JSON** (`coverage/coverage.json`): Datos de cobertura en formato JSON
4. **Text Summary**: Resumen en consola

### Métricas de Cobertura

La configuración verifica que se cumplan los siguientes umbrales:

```javascript
{
  statements: 85%,  // Declaraciones ejecutadas
  branches: 85%,    // Ramas de decisión cubiertas
  functions: 85%,   // Funciones llamadas
  lines: 85%        // Líneas de código ejecutadas
}
```

### Interpretación del Reporte

Al abrir el reporte HTML (`npm run test:coverage:report`), verás:

- **Verde**: Cobertura ≥ 85% (excelente)
- **Amarillo**: Cobertura 50-85% (necesita mejora)
- **Rojo**: Cobertura < 50% (crítico)

### Ver Cobertura

```bash
# Ejecutar tests con cobertura y abrir reporte
npm run test:coverage

# O ejecutar tests y luego abrir el reporte
npm run test:single
npm run test:coverage:report
```

## ✨ Tests Implementados

Se han creado tests completos para los siguientes componentes y utilidades:

### Atoms (Componentes Básicos)
- ✅ **Button.spec.jsx** (19 tests)
  - Renderizado básico
  - Variantes de estilo (primary, secondary, service, login, outline, danger)
  - Tamaños (sm, md, lg)
  - Funcionalidad (onClick, disabled)
  - Tipos de botón (button, submit)
  - Clases personalizadas
  - Renderizado como Link (con React Router)

- ✅ **Badge.spec.jsx** (10 tests)
  - Renderizado básico
  - Variantes (primary, secondary, price, duration, light, animal)
  - Clases personalizadas

- ✅ **Input.spec.jsx** (18 tests)
  - Renderizado básico
  - Tipos de input (text, email, password, number, date)
  - Propiedades (placeholder, value, id, name, required, min, max)
  - Funcionalidad (onChange)
  - Clases personalizadas

- ✅ **Logo.spec.jsx** (8 tests)
  - Renderizado básico
  - Link a página principal
  - Imagen del logo
  - Clases personalizadas

### Molecules (Componentes Compuestos)
- ✅ **SearchBar.spec.jsx** (10 tests)
  - Renderizado básico
  - Placeholder personalizado
  - Valor del input
  - Funcionalidad onChange
  - Estructura HTML

### Utilities (Funciones Auxiliares)
- ✅ **formatters.spec.js** (24 tests)
  - formatPrice (pesos chilenos)
  - formatDate (formato español)
  - formatVeterinarianName (Dr./Dra.)

**Total: 65 tests pasando ✓**
**Cobertura: 100% en archivos testeados** ✓
