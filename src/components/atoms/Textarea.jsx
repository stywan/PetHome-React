export function Textarea({
    value,
    onChange,
    placeholder,
    name,
    id,
    rows = 3,
    className = "",
    disabled = false,
    required = false,
    maxLength,
    showCharCount = false
}) {
    const classes = `form-control ${className}`.trim();
    const charCount = value ? value.length : 0;

    return (
        <div className="textarea-wrapper">
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className={classes}
                disabled={disabled}
                required={required}
                maxLength={maxLength}
            />
            {showCharCount && maxLength && (
                <small className="text-muted d-block text-end mt-1">
                    {charCount} / {maxLength}
                </small>
            )}
        </div>
    );
}
