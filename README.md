# 🐾 PetHome - React + Vite

Aplicación web de servicios veterinarios a domicilio construida con **React**, **Vite** y **Atomic Design**.

## 📋 Descripción

PetHome es una plataforma que conecta dueños de mascotas con veterinarios profesionales que brindan atención a domicilio. La aplicación permite explorar servicios, filtrar por categorías, agregar servicios al carrito y agendar citas.

## 🏗️ Arquitectura - Atomic Design

El proyecto sigue la metodología **Atomic Design** para una mejor organización y reutilización de componentes:

```
src/
├── components/
│   ├── atoms/          # Componentes más pequeños (Button, Badge, Input, Logo)
│   ├── molecules/      # Combinación de átomos (ServiceCard, CartItem, SearchBar)
│   ├── organisms/      # Secciones complejas (Navbar, Footer, ServiceGrid, Cart)
│   └── templates/      # Layouts de página (MainTemplate, AuthTemplate)
├── pages/              # Páginas completas (HomePage, ServicesPage, LoginPage)
├── context/            # Context API (CartContext, FilterContext)
├── data/               # Datos estáticos (servicesData.js)
├── utils/              # Utilidades (formatters.js)
├── hooks/              # Custom hooks (si es necesario)
└── assets/             # JavaScript original migrado
```

## 🚀 Tecnologías

- **React 18** - Librería de UI
- **Vite** - Build tool ultrarrápido
- **React Router DOM** - Enrutamiento
- **Context API** - Gestión de estado global
- **Bootstrap 5** - Framework CSS
- **Font Awesome** - Iconos

## 📦 Instalación

```bash
# Clonar el repositorio
cd pethome-react

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

## 🎨 Características

- ✅ **Atomic Design**: Componentes organizados y reutilizables
- ✅ **React Router**: Navegación SPA fluida
- ✅ **Context API**: Gestión de estado del carrito y filtros
- ✅ **Filtros avanzados**: Por categoría, animal y precio
- ✅ **Carrito de compras**: Agregar, eliminar y modificar servicios
- ✅ **Responsive**: Diseño adaptable a móviles y desktop
- ✅ **CSS Original**: Mantiene todos los estilos del proyecto original

## 📄 Páginas

- **/** - Página de inicio (Hero, Banner CTA, Servicios destacados)
- **/services** - Catálogo de servicios con filtros
- **/login** - Inicio de sesión y registro

## 🧩 Componentes Principales

### Atoms
- `Button` - Botones reutilizables con variantes
- `Badge` - Etiquetas de información
- `Input` - Inputs de formulario
- `Logo` - Logotipo de la marca

### Molecules
- `ServiceCard` - Tarjeta de servicio
- `CartItem` - Item del carrito
- `SearchBar` - Barra de búsqueda

### Organisms
- `Navbar` - Navegación principal
- `Footer` - Pie de página
- `ServiceGrid` - Grilla de servicios
- `CartOffcanvas` - Panel lateral del carrito
- `FiltersAside` - Panel de filtros
- `ServiceDetailModal` - Modal de detalles del servicio

### Templates
- `MainTemplate` - Layout principal con Navbar y Footer
- `AuthTemplate` - Layout para autenticación

## 🔧 Context API

### CartContext
Maneja el estado global del carrito de compras:
- `addServiceToCart()` - Agregar servicio
- `removeFromCart()` - Eliminar servicio
- `updateQuantity()` - Actualizar cantidad
- `clearCart()` - Vaciar carrito
- `getCartTotals()` - Obtener totales

### FilterContext
Maneja los filtros de servicios:
- `updateSearchFilter()` - Filtro de búsqueda
- `updateCategoryFilter()` - Filtro por categoría
- `updateAnimalFilter()` - Filtro por tipo de animal
- `updatePriceFilter()` - Filtro por rango de precio
- `filterServices()` - Aplicar filtros

## 📱 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run preview  # Vista previa de build
npm run lint     # Linter ESLint
```

## 🎯 Migración desde HTML/CSS/JS

Este proyecto fue migrado desde una aplicación HTML/CSS/JS vanilla a React manteniendo:
- ✅ Todo el CSS original sin modificaciones
- ✅ Toda la funcionalidad existente
- ✅ El mismo diseño visual
- ✅ Las mismas interacciones de usuario

## 📝 Notas

- Los estilos CSS están en `src/style.css` (sin modificaciones del original)
- Las imágenes están en `public/img/`
- Bootstrap y Font Awesome se cargan vía CDN en `index.html`

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de uso educativo.