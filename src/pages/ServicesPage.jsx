import { useState } from 'react';
import { MainTemplate } from '../components/templates/MainTemplate';
import { SearchBar } from '../components/molecules/SearchBar';
import { ServiceGrid } from '../components/organisms/ServiceGrid';
import { FiltersAside } from '../components/organisms/FiltersAside';
import { ServiceDetailModal } from '../components/organisms/ServiceDetailModal';
import { useFilters } from '../context/FilterContext';
import { services } from '../data/servicesData';

export function ServicesPage() {
    const { filters, filterServices } = useFilters();
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const filteredServices = filterServices(services);

    const handleViewDetail = (service) => {
        setSelectedService(service);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedService(null);
    };

    return (
        <MainTemplate>
            <SearchBar value={filters.search} onChange={(value) => {}} />

            <main className="container my-5">
                <div className="row">
                    <FiltersAside />

                    <div className="col-lg-9">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="text-primary">Nuestros Servicios</h2>
                            <span className="text-muted">{filteredServices.length} servicios disponibles</span>
                        </div>

                        <div className="row">
                            <ServiceGrid services={filteredServices} onViewDetail={handleViewDetail} />
                        </div>
                    </div>
                </div>
            </main>

            {selectedService && (
                <ServiceDetailModal
                    service={selectedService}
                    show={showModal}
                    onHide={handleCloseModal}
                />
            )}
        </MainTemplate>
    );
}