export function Icon({
    name,
    type = "fas",
    size,
    color,
    className = "",
    onClick,
    style = {}
}) {
    const sizeClasses = {
        xs: "fa-xs",
        sm: "fa-sm",
        lg: "fa-lg",
        xl: "fa-2x",
        "2xl": "fa-3x"
    };

    const classes = [
        type,
        name.startsWith("fa-") ? name : `fa-${name}`,
        size && sizeClasses[size],
        className
    ].filter(Boolean).join(" ");

    const iconStyle = {
        ...style,
        ...(color && { color })
    };

    return (
        <i
            className={classes}
            style={iconStyle}
            onClick={onClick}
            aria-hidden="true"
        />
    );
}
