import { Icon } from '../atoms/Icon';
import { Button } from '../atoms/Button';

export function EmptyState({
    icon = "inbox",
    title,
    message,
    actionLabel,
    onAction,
    variant = "default"
}) {
    return (
        <div className="text-center py-5">
            <div className="mb-4">
                <Icon
                    name={icon}
                    size="2xl"
                    className="text-muted"
                    style={{ fontSize: '4rem', opacity: 0.5 }}
                />
            </div>

            <h4 className="mb-2">{title}</h4>

            {message && (
                <p className="text-muted mb-4">
                    {message}
                </p>
            )}

            {actionLabel && onAction && (
                <Button
                    variant={variant === "primary" ? "primary" : "outline"}
                    onClick={onAction}
                >
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
