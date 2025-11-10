import { Card } from '../atoms/Card';
import { Icon } from '../atoms/Icon';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

export function AddressCard({ address, onEdit, onDelete, onSetDefault, showActions = true }) {
    return (
        <Card className="mb-3" hoverable={showActions} shadow="sm">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex align-items-center gap-2">
                        <Icon name="map-marker-alt" className="text-primary" />
                        <h6 className="mb-0">{address.label}</h6>
                        {address.isDefault && (
                            <Badge variant="primary">Por defecto</Badge>
                        )}
                    </div>
                </div>

                <div className="ms-4">
                    <p className="mb-1">{address.street}</p>
                    <p className="mb-1 text-muted small">
                        {address.neighborhood}, {address.city}
                    </p>
                    {address.zipCode && (
                        <p className="mb-0 text-muted small">
                            Código Postal: {address.zipCode}
                        </p>
                    )}
                </div>

                {showActions && (
                    <div className="d-flex gap-2 mt-3">
                        {!address.isDefault && onSetDefault && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onSetDefault(address.id)}
                                className="flex-grow-1"
                            >
                                <Icon name="check" className="me-1" />
                                Predeterminada
                            </Button>
                        )}
                        {onEdit && (
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => onEdit(address)}
                            >
                                <Icon name="edit" />
                            </Button>
                        )}
                        {onDelete && !address.isDefault && (
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => onDelete(address.id)}
                            >
                                <Icon name="trash" />
                            </Button>
                        )}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
}
