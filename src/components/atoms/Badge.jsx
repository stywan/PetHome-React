export function Badge({ children, variant = "primary", className = "" }) {
    const variantClasses = {
        primary: "badge bg-primary",
        secondary: "badge bg-secondary",
        price: "badge price-badge",
        duration: "badge duration-badge",
        light: "badge bg-light text-dark",
        animal: "animal-tag"
    };

    return (
        <span className={`${variantClasses[variant]} ${className}`}>
            {children}
        </span>
    );
}