export function StatusBadge({ status, className = "" }) {
    const statusConfig = {
        confirmed: {
            label: "Confirmada",
            variant: "success",
            icon: "fa-check-circle"
        },
        completed: {
            label: "Completada",
            variant: "primary",
            icon: "fa-check-double"
        },
        cancelled: {
            label: "Cancelada",
            variant: "danger",
            icon: "fa-times-circle"
        },
        pending: {
            label: "Pendiente",
            variant: "warning",
            icon: "fa-clock"
        },
        in_progress: {
            label: "En Progreso",
            variant: "info",
            icon: "fa-spinner"
        }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const classes = `badge bg-${config.variant} ${className}`.trim();

    return (
        <span className={classes}>
            <i className={`fas ${config.icon} me-1`}></i>
            {config.label}
        </span>
    );
}
