export function DatePicker({
    value,
    onChange,
    name,
    id,
    min,
    max,
    className = "",
    disabled = false,
    required = false
}) {
    const classes = `form-control ${className}`.trim();

    return (
        <input
            type="date"
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            className={classes}
            disabled={disabled}
            required={required}
        />
    );
}
