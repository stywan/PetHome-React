export function Select({
    options = [],
    value,
    onChange,
    placeholder = "Seleccionar...",
    name,
    id,
    className = "",
    disabled = false,
    required = false,
    size = "md"
}) {
    const sizeClasses = {
        sm: "form-select-sm",
        md: "",
        lg: "form-select-lg"
    };

    const classes = `form-select ${sizeClasses[size]} ${className}`.trim();

    return (
        <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={classes}
            disabled={disabled}
            required={required}
        >
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}
            {options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
}
