export function Input({
    type = "text",
    placeholder,
    value,
    onChange,
    className = "",
    id,
    name,
    required = false,
    min,
    max
}) {
    return (
        <input
            type={type}
            className={`form-control ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            id={id}
            name={name}
            required={required}
            min={min}
            max={max}
        />
    );
}