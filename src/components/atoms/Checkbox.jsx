export function Checkbox({
    id,
    name,
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
                type="checkbox"
                id={id}
                name={name}
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
