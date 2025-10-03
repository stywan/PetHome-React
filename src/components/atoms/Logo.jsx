import { Link } from 'react-router-dom';

export function Logo({ className = "img-logo" }) {
    return (
        <Link className="navbar-brand" to="/">
            <img className={className} src="/img/logo_pethome.svg" alt="Logo PetHome" />
        </Link>
    );
}