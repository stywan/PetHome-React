import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export function useFilters() {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilters must be used within a FilterProvider');
    }
    return context;
}

export function FilterProvider({ children }) {
    const [filters, setFilters] = useState({
        category: "all",
        animal: "all",
        priceRange: 200000,
        search: ""
    });

    /**
     * Update search filter
     */
    const updateSearchFilter = (search) => {
        setFilters({ ...filters, search: search.toLowerCase().trim() });
    };

    /**
     * Update category filter
     */
    const updateCategoryFilter = (category) => {
        setFilters({ ...filters, category });
    };

    /**
     * Update animal filter
     */
    const updateAnimalFilter = (animal) => {
        setFilters({ ...filters, animal });
    };

    /**
     * Update price filter
     */
    const updatePriceFilter = (priceRange) => {
        setFilters({ ...filters, priceRange: parseInt(priceRange) });
    };

    /**
     * Reset all filters to default values
     */
    const resetFilters = () => {
        setFilters({
            category: "all",
            animal: "all",
            priceRange: 200000,
            search: ""
        });
    };

    /**
     * Filter services based on current filter state
     */
    const filterServices = (services) => {
        return services.filter(service => {
            // Category filter
            if (filters.category !== "all" && service.category !== filters.category) {
                return false;
            }

            // Animal filter
            if (filters.animal !== "all" && !service.animals.includes(filters.animal)) {
                return false;
            }

            // Price filter
            if (service.price > filters.priceRange) {
                return false;
            }

            // Search filter
            if (filters.search) {
                const searchTerm = filters.search;
                const matchesName = service.name.toLowerCase().includes(searchTerm);
                const matchesDescription = service.description.toLowerCase().includes(searchTerm);
                return matchesName || matchesDescription;
            }

            return true;
        });
    };

    const value = {
        filters,
        updateSearchFilter,
        updateCategoryFilter,
        updateAnimalFilter,
        updatePriceFilter,
        resetFilters,
        filterServices
    };

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
}