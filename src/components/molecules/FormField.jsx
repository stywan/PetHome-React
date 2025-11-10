import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { Textarea } from '../atoms/Textarea';
import { DatePicker } from '../atoms/DatePicker';
import { TimePicker } from '../atoms/TimePicker';
import { Checkbox } from '../atoms/Checkbox';
import { Radio } from '../atoms/Radio';

export function FormField({
    type = "text",
    label,
    id,
    name,
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    error,
    helpText,
    options, // Para select
    rows, // Para textarea
    min,
    max,
    step,
    checked, // Para checkbox/radio
    className = ""
}) {
    const fieldId = id || name;

    const renderField = () => {
        switch (type) {
            case 'select':
                return (
                    <Select
                        id={fieldId}
                        name={name}
                        value={value}
                        onChange={onChange}
                        options={options}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        className={error ? 'is-invalid' : ''}
                    />
                );

            case 'textarea':
                return (
                    <Textarea
                        id={fieldId}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        rows={rows}
                        required={required}
                        disabled={disabled}
                        className={error ? 'is-invalid' : ''}
                    />
                );

            case 'date':
                return (
                    <DatePicker
                        id={fieldId}
                        name={name}
                        value={value}
                        onChange={onChange}
                        min={min}
                        max={max}
                        required={required}
                        disabled={disabled}
                        className={error ? 'is-invalid' : ''}
                    />
                );

            case 'time':
                return (
                    <TimePicker
                        id={fieldId}
                        name={name}
                        value={value}
                        onChange={onChange}
                        min={min}
                        max={max}
                        step={step}
                        required={required}
                        disabled={disabled}
                        className={error ? 'is-invalid' : ''}
                    />
                );

            case 'checkbox':
                return (
                    <Checkbox
                        id={fieldId}
                        name={name}
                        checked={checked}
                        onChange={onChange}
                        label={label}
                        disabled={disabled}
                    />
                );

            case 'radio':
                return (
                    <Radio
                        id={fieldId}
                        name={name}
                        value={value}
                        checked={checked}
                        onChange={onChange}
                        label={label}
                        disabled={disabled}
                    />
                );

            default:
                return (
                    <Input
                        type={type}
                        id={fieldId}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        className={error ? 'is-invalid' : ''}
                    />
                );
        }
    };

    // Para checkbox y radio, no usar estructura de label separado
    if (type === 'checkbox' || type === 'radio') {
        return (
            <div className={`mb-3 ${className}`}>
                {renderField()}
                {error && <div className="invalid-feedback d-block">{error}</div>}
                {helpText && !error && <small className="form-text text-muted">{helpText}</small>}
            </div>
        );
    }

    return (
        <div className={`mb-3 ${className}`}>
            {label && (
                <label htmlFor={fieldId} className="form-label">
                    {label}
                    {required && <span className="text-danger ms-1">*</span>}
                </label>
            )}
            {renderField()}
            {error && <div className="invalid-feedback d-block">{error}</div>}
            {helpText && !error && <small className="form-text text-muted">{helpText}</small>}
        </div>
    );
}
