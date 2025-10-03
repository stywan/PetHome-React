import { Link } from 'react-router-dom';

export function Button({
    children,
    variant = "primary",
    size = "md",
    onClick,
    to,
    type = "button",
    className = "",
    disabled = false
}) {
    const baseClass = "btn";

    const variantClasses = {
        primary: "btn-primary",
        secondary: "btn-outline-primary btn-second",
        service: "btn-primary-service",
        login: "btn-primary-signup btn-login",
        outline: "btn-outline-primary",
        danger: "btn-outline-danger",
        card: "btn-outline-primary"
    };

    const sizeClasses = {
        sm: "btn-sm",
        md: "",
        lg: "btn-lg"
    };

    const classes = `${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

    if (to) {
        return (
            <Link to={to} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}