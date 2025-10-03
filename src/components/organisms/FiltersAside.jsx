import { useFilters } from '../../context/FilterContext';
import { formatPrice } from '../../utils/formatters';

export function FiltersAside() {
    const {
        filters,
        updateCategoryFilter,
        updateAnimalFilter,
        updatePriceFilter,
        resetFilters
    } = useFilters();

    const handleCategoryChange = (e) => {
        updateCategoryFilter(e.target.value);
    };

    const handleAnimalChange = (e) => {
        updateAnimalFilter(e.target.value);
    };

    const handlePriceChange = (e) => {
        updatePriceFilter(e.target.value);
    };

    const handleResetFilters = () => {
        resetFilters();
    };

    return (
        <aside className="col-lg-3 mb-4">
            <div className="card shadow-sm">
                {/* Header que siempre se ve */}
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center"
                     data-bs-toggle="collapse"
                     data-bs-target="#filtersCollapse"
                     aria-expanded="false"
                     aria-controls="filtersCollapse"
                     style={{ cursor: 'pointer' }}>
                    <h5 className="mb-0">
                        <i className="fas fa-filter me-2"></i> Filtros
                    </h5>
                    <i className="fas fa-chevron-down" id="filterArrow"></i>
                </div>

                {/* Contenido colapsable */}
                <div id="filtersCollapse" className="collapse d-lg-block">
                    <div className="card-body">
                        {/* FILTRO CATEGORÍA */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Categoría</label>
                            <div className="filter-group">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="category"
                                        id="cat-all"
                                        value="all"
                                        checked={filters.category === "all"}
                                        onChange={handleCategoryChange}
                                    />
                                    <label className="form-check-label" htmlFor="cat-all">Todos los servicios</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="category"
                                        id="cat-consultation"
                                        value="consultation"
                                        checked={filters.category === "consultation"}
                                        onChange={handleCategoryChange}
                                    />
                                    <label className="form-check-label" htmlFor="cat-consultation">Consultas</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="category"
                                        id="cat-vaccination"
                                        value="vaccination"
                                        checked={filters.category === "vaccination"}
                                        onChange={handleCategoryChange}
                                    />
                                    <label className="form-check-label" htmlFor="cat-vaccination">Vacunación</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="category"
                                        id="cat-grooming"
                                        value="grooming"
                                        checked={filters.category === "grooming"}
                                        onChange={handleCategoryChange}
                                    />
                                    <label className="form-check-label" htmlFor="cat-grooming">Peluquería</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="category"
                                        id="cat-emergency"
                                        value="emergency"
                                        checked={filters.category === "emergency"}
                                        onChange={handleCategoryChange}
                                    />
                                    <label className="form-check-label" htmlFor="cat-emergency">Emergencias</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="category"
                                        id="cat-surgery"
                                        value="surgery"
                                        checked={filters.category === "surgery"}
                                        onChange={handleCategoryChange}
                                    />
                                    <label className="form-check-label" htmlFor="cat-surgery">Cirugía</label>
                                </div>
                            </div>
                        </div>

                        {/* FILTRO ANIMAL */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Tipo de Animal</label>
                            <div className="filter-group">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="animal"
                                        id="animal-all"
                                        value="all"
                                        checked={filters.animal === "all"}
                                        onChange={handleAnimalChange}
                                    />
                                    <label className="form-check-label" htmlFor="animal-all">Todos</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="animal"
                                        id="animal-dog"
                                        value="dog"
                                        checked={filters.animal === "dog"}
                                        onChange={handleAnimalChange}
                                    />
                                    <label className="form-check-label" htmlFor="animal-dog">Perros</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="animal"
                                        id="animal-cat"
                                        value="cat"
                                        checked={filters.animal === "cat"}
                                        onChange={handleAnimalChange}
                                    />
                                    <label className="form-check-label" htmlFor="animal-cat">Gatos</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="animal"
                                        id="animal-bird"
                                        value="bird"
                                        checked={filters.animal === "bird"}
                                        onChange={handleAnimalChange}
                                    />
                                    <label className="form-check-label" htmlFor="animal-bird">Aves</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="animal"
                                        id="animal-rabbit"
                                        value="rabbit"
                                        checked={filters.animal === "rabbit"}
                                        onChange={handleAnimalChange}
                                    />
                                    <label className="form-check-label" htmlFor="animal-rabbit">Conejos</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="animal"
                                        id="animal-other"
                                        value="other"
                                        checked={filters.animal === "other"}
                                        onChange={handleAnimalChange}
                                    />
                                    <label className="form-check-label" htmlFor="animal-other">Otros</label>
                                </div>
                            </div>
                        </div>

                        {/* FILTRO PRECIO */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Rango de Precio</label>
                            <div className="d-flex gap-2 align-items-center">
                                <span className="text-muted small">$0</span>
                                <input
                                    type="range"
                                    className="form-range flex-grow-1"
                                    id="priceRange"
                                    min="0"
                                    max="200000"
                                    value={filters.priceRange}
                                    onChange={handlePriceChange}
                                />
                                <span className="text-muted small">$200.000</span>
                            </div>
                            <div className="text-center mt-2">
                                <span className="badge bg-light text-dark">Hasta $<span id="priceValue">{filters.priceRange.toLocaleString('es-CL')}</span></span>
                            </div>
                        </div>

                        <button className="btn btn-outline-secondary w-100 mt-3" onClick={handleResetFilters}>
                            <i className="fas fa-undo me-2"></i>
                            Limpiar Filtros
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}