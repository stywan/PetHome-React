import { Card } from '../atoms/Card';
import { Icon } from '../atoms/Icon';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

// Iconos para marcas de tarjetas
const cardBrandIcons = {
    'Visa': 'fab fa-cc-visa',
    'Mastercard': 'fab fa-cc-mastercard',
    'American Express': 'fab fa-cc-amex',
    'Discover': 'fab fa-cc-discover',
    'Diners Club': 'fab fa-cc-diners-club',
    'JCB': 'fab fa-cc-jcb',
    'Débito': 'fas fa-credit-card'
};

export function PaymentMethodCard({ paymentMethod, onEdit, onDelete, onSetDefault, showActions = true }) {
    const brandIcon = cardBrandIcons[paymentMethod.cardBrand] || 'fas fa-credit-card';

    return (
        <Card className="mb-3" hoverable={showActions} shadow="sm">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center gap-3">
                        <i className={`${brandIcon} fa-2x text-primary`}></i>
                        <div>
                            <h6 className="mb-1">
                                {paymentMethod.cardBrand}
                                {paymentMethod.isDefault && (
                                    <Badge variant="primary" className="ms-2">Por defecto</Badge>
                                )}
                            </h6>
                            <p className="mb-0 text-muted">{paymentMethod.cardNumber}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-2">
                    <p className="mb-1 small">
                        <strong>Titular:</strong> {paymentMethod.holderName}
                    </p>
                    <p className="mb-0 small text-muted">
                        <strong>Vencimiento:</strong> {paymentMethod.expiryDate}
                    </p>
                </div>

                {showActions && (
                    <div className="d-flex gap-2 mt-3">
                        {!paymentMethod.isDefault && onSetDefault && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onSetDefault(paymentMethod.id)}
                                className="flex-grow-1"
                            >
                                <Icon name="check" className="me-1" />
                                Predeterminado
                            </Button>
                        )}
                        {onEdit && (
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => onEdit(paymentMethod)}
                            >
                                <Icon name="edit" />
                            </Button>
                        )}
                        {onDelete && !paymentMethod.isDefault && (
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => onDelete(paymentMethod.id)}
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
