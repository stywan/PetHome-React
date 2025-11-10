export function Card({
    children,
    variant = "default",
    className = "",
    onClick,
    hoverable = false,
    shadow = "sm"
}) {
    const variantClasses = {
        default: "card",
        primary: "card border-primary",
        secondary: "card border-secondary",
        outlined: "card border",
        flat: "card border-0"
    };

    const shadowClasses = {
        none: "",
        sm: "shadow-sm",
        md: "shadow",
        lg: "shadow-lg"
    };

    const classes = [
        variantClasses[variant],
        shadowClasses[shadow],
        hoverable && "card-hoverable",
        onClick && "cursor-pointer",
        className
    ].filter(Boolean).join(" ");

    return (
        <div className={classes} onClick={onClick}>
            {children}
        </div>
    );
}

Card.Header = function CardHeader({ children, className = "" }) {
    return <div className={`card-header ${className}`.trim()}>{children}</div>;
};

Card.Body = function CardBody({ children, className = "" }) {
    return <div className={`card-body ${className}`.trim()}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className = "" }) {
    return <div className={`card-footer ${className}`.trim()}>{children}</div>;
};

Card.Title = function CardTitle({ children, className = "" }) {
    return <h5 className={`card-title ${className}`.trim()}>{children}</h5>;
};

Card.Text = function CardText({ children, className = "" }) {
    return <p className={`card-text ${className}`.trim()}>{children}</p>;
};
