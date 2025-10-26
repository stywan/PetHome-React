import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterProvider, useFilters } from './FilterContext';

// Mock services para tests
const mockServices = [
    {
        id: "1",
        name: "Consulta Veterinaria General",
        description: "Examen completo de salud",
        price: 50000,
        category: "consultation",
        animals: ["dog", "cat"]
    },
    {
        id: "2",
        name: "Vacunación Antirrábica",
        description: "Vacuna contra la rabia",
        price: 25000,
        category: "vaccination",
        animals: ["dog", "cat", "rabbit"]
    },
    {
        id: "3",
        name: "Baño y Peluquería Canina",
        description: "Servicio completo de grooming",
        price: 35000,
        category: "grooming",
        animals: ["dog"]
    },
    {
        id: "4",
        name: "Cirugía Menor",
        description: "Procedimientos quirúrgicos menores",
        price: 150000,
        category: "surgery",
        animals: ["dog", "cat"]
    }
];

// Componente para mostrar estado inicial
function InitialFiltersComponent() {
    const { filters } = useFilters();

    return (
        <div>
            <div data-testid="category">{filters.category}</div>
            <div data-testid="animal">{filters.animal}</div>
            <div data-testid="priceRange">{filters.priceRange}</div>
            <div data-testid="search">{filters.search}</div>
        </div>
    );
}

// Componente para actualizar búsqueda
function SearchFilterComponent() {
    const { filters, updateSearchFilter } = useFilters();

    return (
        <div>
            <input
                data-testid="search-input"
                onChange={(e) => updateSearchFilter(e.target.value)}
            />
            <div data-testid="search">{filters.search}</div>
        </div>
    );
}

// Componente para actualizar categoría
function CategoryFilterComponent() {
    const { filters, updateCategoryFilter } = useFilters();

    return (
        <div>
            <button data-testid="set-vaccination" onClick={() => updateCategoryFilter('vaccination')}>
                Vaccination
            </button>
            <button data-testid="set-all" onClick={() => updateCategoryFilter('all')}>
                All
            </button>
            <div data-testid="category">{filters.category}</div>
        </div>
    );
}

// Componente para actualizar animal
function AnimalFilterComponent() {
    const { filters, updateAnimalFilter } = useFilters();

    return (
        <div>
            <button data-testid="set-dog" onClick={() => updateAnimalFilter('dog')}>
                Dog
            </button>
            <button data-testid="set-cat" onClick={() => updateAnimalFilter('cat')}>
                Cat
            </button>
            <div data-testid="animal">{filters.animal}</div>
        </div>
    );
}

// Componente para actualizar precio
function PriceFilterComponent() {
    const { filters, updatePriceFilter } = useFilters();

    return (
        <div>
            <button data-testid="set-100k" onClick={() => updatePriceFilter(100000)}>
                100k
            </button>
            <button data-testid="set-50k-string" onClick={() => updatePriceFilter("50000")}>
                50k String
            </button>
            <div data-testid="priceRange">{filters.priceRange}</div>
            <div data-testid="priceRange-type">{typeof filters.priceRange}</div>
        </div>
    );
}

// Componente para resetear filtros
function ResetFiltersComponent() {
    const { filters, updateSearchFilter, updateCategoryFilter, resetFilters } = useFilters();

    return (
        <div>
            <button data-testid="set-search" onClick={() => updateSearchFilter('test')}>
                Set Search
            </button>
            <button data-testid="set-category" onClick={() => updateCategoryFilter('grooming')}>
                Set Category
            </button>
            <button data-testid="reset" onClick={resetFilters}>
                Reset
            </button>
            <div data-testid="category">{filters.category}</div>
            <div data-testid="search">{filters.search}</div>
        </div>
    );
}

// Componente para filtrar servicios
function FilterServicesComponent() {
    const { filterServices, updateCategoryFilter, updateAnimalFilter, updatePriceFilter, updateSearchFilter } = useFilters();
    const [filtered, setFiltered] = React.useState([]);

    const handleFilter = () => {
        setFiltered(filterServices(mockServices));
    };

    return (
        <div>
            <button data-testid="filter-category-vaccination" onClick={() => {
                updateCategoryFilter('vaccination');
                setTimeout(handleFilter, 0);
            }}>
                Filter Vaccination
            </button>
            <button data-testid="filter-animal-rabbit" onClick={() => {
                updateAnimalFilter('rabbit');
                setTimeout(handleFilter, 0);
            }}>
                Filter Rabbit
            </button>
            <button data-testid="filter-price-40k" onClick={() => {
                updatePriceFilter(40000);
                setTimeout(handleFilter, 0);
            }}>
                Filter Price 40k
            </button>
            <button data-testid="filter-search-vacuna" onClick={() => {
                updateSearchFilter('vacuna');
                setTimeout(handleFilter, 0);
            }}>
                Search Vacuna
            </button>
            <button data-testid="do-filter" onClick={handleFilter}>
                Do Filter
            </button>
            <div data-testid="filtered-count">{filtered.length}</div>
            {filtered.map((service, index) => (
                <div key={service.id} data-testid={`service-${index}`}>
                    {service.name}
                </div>
            ))}
        </div>
    );
}

describe('FilterContext', () => {

    describe('Estado inicial de filtros', () => {
        it('debería iniciar con valores por defecto', () => {
            render(
                <FilterProvider>
                    <InitialFiltersComponent />
                </FilterProvider>
            );

            expect(screen.getByTestId('category').textContent).toBe('all');
            expect(screen.getByTestId('animal').textContent).toBe('all');
            expect(screen.getByTestId('priceRange').textContent).toBe('200000');
            expect(screen.getByTestId('search').textContent).toBe('');
        });
    });

    describe('updateSearchFilter', () => {
        it('debería actualizar el filtro de búsqueda', () => {
            render(
                <FilterProvider>
                    <SearchFilterComponent />
                </FilterProvider>
            );

            const input = screen.getByTestId('search-input');
            fireEvent.change(input, { target: { value: 'consulta' } });

            expect(screen.getByTestId('search').textContent).toBe('consulta');
        });

        it('debería convertir búsqueda a minúsculas y quitar espacios', () => {
            render(
                <FilterProvider>
                    <SearchFilterComponent />
                </FilterProvider>
            );

            const input = screen.getByTestId('search-input');
            fireEvent.change(input, { target: { value: '  CONSULTA Veterinaria  ' } });

            expect(screen.getByTestId('search').textContent).toBe('consulta veterinaria');
        });
    });

    describe('updateCategoryFilter', () => {
        it('debería actualizar el filtro de categoría', () => {
            render(
                <FilterProvider>
                    <CategoryFilterComponent />
                </FilterProvider>
            );

            const button = screen.getByTestId('set-vaccination');
            fireEvent.click(button);

            expect(screen.getByTestId('category').textContent).toBe('vaccination');
        });

        it('debería permitir volver a "all"', () => {
            render(
                <FilterProvider>
                    <CategoryFilterComponent />
                </FilterProvider>
            );

            const vaccinationButton = screen.getByTestId('set-vaccination');
            const allButton = screen.getByTestId('set-all');

            fireEvent.click(vaccinationButton);
            expect(screen.getByTestId('category').textContent).toBe('vaccination');

            fireEvent.click(allButton);
            expect(screen.getByTestId('category').textContent).toBe('all');
        });
    });

    describe('updateAnimalFilter', () => {
        it('debería actualizar el filtro de animal', () => {
            render(
                <FilterProvider>
                    <AnimalFilterComponent />
                </FilterProvider>
            );

            const button = screen.getByTestId('set-dog');
            fireEvent.click(button);

            expect(screen.getByTestId('animal').textContent).toBe('dog');
        });

        it('debería permitir cambiar entre diferentes animales', () => {
            render(
                <FilterProvider>
                    <AnimalFilterComponent />
                </FilterProvider>
            );

            const dogButton = screen.getByTestId('set-dog');
            const catButton = screen.getByTestId('set-cat');

            fireEvent.click(dogButton);
            expect(screen.getByTestId('animal').textContent).toBe('dog');

            fireEvent.click(catButton);
            expect(screen.getByTestId('animal').textContent).toBe('cat');
        });
    });

    describe('updatePriceFilter', () => {
        it('debería actualizar el filtro de precio', () => {
            render(
                <FilterProvider>
                    <PriceFilterComponent />
                </FilterProvider>
            );

            const button = screen.getByTestId('set-100k');
            fireEvent.click(button);

            expect(screen.getByTestId('priceRange').textContent).toBe('100000');
        });

        it('debería convertir string a número', () => {
            render(
                <FilterProvider>
                    <PriceFilterComponent />
                </FilterProvider>
            );

            const button = screen.getByTestId('set-50k-string');
            fireEvent.click(button);

            expect(screen.getByTestId('priceRange').textContent).toBe('50000');
            expect(screen.getByTestId('priceRange-type').textContent).toBe('number');
        });
    });

    describe('resetFilters', () => {
        it('debería resetear todos los filtros a valores por defecto', () => {
            render(
                <FilterProvider>
                    <ResetFiltersComponent />
                </FilterProvider>
            );

            const setSearchButton = screen.getByTestId('set-search');
            const setCategoryButton = screen.getByTestId('set-category');
            const resetButton = screen.getByTestId('reset');

            fireEvent.click(setSearchButton);
            fireEvent.click(setCategoryButton);

            expect(screen.getByTestId('category').textContent).toBe('grooming');
            expect(screen.getByTestId('search').textContent).toBe('test');

            fireEvent.click(resetButton);

            expect(screen.getByTestId('category').textContent).toBe('all');
            expect(screen.getByTestId('search').textContent).toBe('');
        });
    });

    describe('filterServices', () => {
        it('debería filtrar servicios por categoría', (done) => {
            render(
                <FilterProvider>
                    <FilterServicesComponent />
                </FilterProvider>
            );

            const filterButton = screen.getByTestId('filter-category-vaccination');
            const doFilterButton = screen.getByTestId('do-filter');

            fireEvent.click(filterButton);

            setTimeout(() => {
                fireEvent.click(doFilterButton);
                setTimeout(() => {
                    expect(screen.getByTestId('filtered-count').textContent).toBe('1');
                    done();
                }, 10);
            }, 10);
        });

        it('debería filtrar servicios por animal', (done) => {
            render(
                <FilterProvider>
                    <FilterServicesComponent />
                </FilterProvider>
            );

            const filterButton = screen.getByTestId('filter-animal-rabbit');
            const doFilterButton = screen.getByTestId('do-filter');

            fireEvent.click(filterButton);

            setTimeout(() => {
                fireEvent.click(doFilterButton);
                setTimeout(() => {
                    expect(screen.getByTestId('filtered-count').textContent).toBe('1');
                    done();
                }, 10);
            }, 10);
        });

        it('debería filtrar servicios por precio', (done) => {
            render(
                <FilterProvider>
                    <FilterServicesComponent />
                </FilterProvider>
            );

            const filterButton = screen.getByTestId('filter-price-40k');
            const doFilterButton = screen.getByTestId('do-filter');

            fireEvent.click(filterButton);

            setTimeout(() => {
                fireEvent.click(doFilterButton);
                setTimeout(() => {
                    expect(screen.getByTestId('filtered-count').textContent).toBe('2');
                    done();
                }, 10);
            }, 10);
        });

        it('debería filtrar servicios por búsqueda', (done) => {
            render(
                <FilterProvider>
                    <FilterServicesComponent />
                </FilterProvider>
            );

            const filterButton = screen.getByTestId('filter-search-vacuna');
            const doFilterButton = screen.getByTestId('do-filter');

            fireEvent.click(filterButton);

            setTimeout(() => {
                fireEvent.click(doFilterButton);
                setTimeout(() => {
                    expect(screen.getByTestId('filtered-count').textContent).toBe('1');
                    done();
                }, 10);
            }, 10);
        });
    });
});
