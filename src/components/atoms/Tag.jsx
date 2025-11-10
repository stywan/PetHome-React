export function Tag({
    children,
    variant = "primary",
    size = "md",
    removable = false,
    onRemove,
    className = ""
}) {
    const variantClasses = {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        success: "bg-success text-white",
        danger: "bg-danger text-white",
        warning: "bg-warning text-dark",
        info: "bg-info text-white",
        light: "bg-light text-dark",
        dark: "bg-dark text-white"
    };

    const sizeClasses = {
        sm: "tag-sm",
        md: "tag-md",
        lg: "tag-lg"
    };

    const classes = `tag ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

    return (
        <span className={classes}>
            {children}
            {removable && onRemove && (
                <button
                    type="button"
                    className="tag-remove-btn"
                    onClick={onRemove}
                    aria-label="Remover"
                >
                    <i className="fas fa-times"></i>
                </button>
            )}
        </span>
    );
}
