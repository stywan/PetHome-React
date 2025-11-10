export function Radio({
    id,
    name,
    value,
    checked,
    onChange,
    label,
    disabled = false,
    className = ""
}) {
    const classes = `form-check ${className}`.trim();

    return (
        <div className={classes}>
            <input
                className="form-check-input"
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
            {label && (
                <label className="form-check-label" htmlFor={id}>
                    {label}
                </label>
            )}
        </div>
    );
}
