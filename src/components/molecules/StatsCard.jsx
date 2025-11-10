import { Card } from '../atoms/Card';
import { Icon } from '../atoms/Icon';

export function StatsCard({ icon, title, value, subtitle, variant = "primary", trend }) {
    const variantColors = {
        primary: "text-primary",
        success: "text-success",
        warning: "text-warning",
        danger: "text-danger",
        info: "text-info"
    };

    const variantBg = {
        primary: "bg-primary bg-opacity-10",
        success: "bg-success bg-opacity-10",
        warning: "bg-warning bg-opacity-10",
        danger: "bg-danger bg-opacity-10",
        info: "bg-info bg-opacity-10"
    };

    return (
        <Card shadow="sm" className="h-100">
            <Card.Body>
                <div className="d-flex align-items-center gap-3">
                    {icon && (
                        <div
                            className={`rounded-circle d-flex align-items-center justify-content-center ${variantBg[variant]}`}
                            style={{ width: '48px', height: '48px' }}
                        >
                            <Icon name={icon} className={variantColors[variant]} />
                        </div>
                    )}

                    <div className="flex-grow-1">
                        <p className="text-muted mb-1 small">{title}</p>
                        <h3 className="mb-0">{value}</h3>
                        {subtitle && (
                            <small className="text-muted">{subtitle}</small>
                        )}
                        {trend && (
                            <div className="mt-1">
                                <small className={trend.direction === 'up' ? 'text-success' : 'text-danger'}>
                                    <Icon
                                        name={trend.direction === 'up' ? 'arrow-up' : 'arrow-down'}
                                        size="xs"
                                        className="me-1"
                                    />
                                    {trend.value}
                                </small>
                            </div>
                        )}
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
