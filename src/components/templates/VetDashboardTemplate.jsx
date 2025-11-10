import { useState } from 'react';
import { VetSidebar } from '../organisms/vet/VetSidebar';
import { Icon } from '../atoms/Icon';

export function VetDashboardTemplate({ children, title }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <div className="dashboard-layout">
            {/* Overlay para cerrar el menú en móvil */}
            {mobileMenuOpen && (
                <div
                    className="dashboard-overlay"
                    onClick={toggleMobileMenu}
                />
            )}

            {/* Sidebar */}
            <aside className={`dashboard-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                <VetSidebar collapsed={sidebarCollapsed} />
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Header */}
                <header className="dashboard-header bg-white border-bottom p-3 mb-4">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                            <button
                                className="btn btn-outline-secondary d-lg-none"
                                onClick={toggleMobileMenu}
                            >
                                <Icon name="bars" />
                            </button>
                            {title && <h4 className="mb-0">{title}</h4>}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="dashboard-content p-3 p-md-4">
                    {children}
                </div>
            </main>
        </div>
    );
}
