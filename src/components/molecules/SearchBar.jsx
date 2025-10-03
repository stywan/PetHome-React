import { Input } from '../atoms/Input';

export function SearchBar({ value, onChange, placeholder = "Buscar servicios..." }) {
    return (
        <section className="bg-light py-3 mb-4">
            <div className="container d-flex justify-content-center">
                <div className="search-container position-relative" style={{width: '400px'}}>
                    <Input
                        type="text"
                        id="searchInput"
                        className="pe-5"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                    <i className="fas fa-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
                </div>
            </div>
        </section>
    );
}