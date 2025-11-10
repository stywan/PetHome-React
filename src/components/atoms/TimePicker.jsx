export function TimePicker({
    value,
    onChange,
    name,
    id,
    min,
    max,
    step,
    className = "",
    disabled = false,
    required = false
}) {
    const classes = `form-control ${className}`.trim();

    return (
        <input
            type="time"
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            className={classes}
            disabled={disabled}
            required={required}
        />
    );
}
