import { Card } from '../atoms/Card';
import { Avatar } from '../atoms/Avatar';
import { Icon } from '../atoms/Icon';

export function ClientInfoCard({ client, address }) {
    return (
        <Card shadow="sm">
            <Card.Body>
                <div className="d-flex align-items-start gap-3">
                    <Avatar
                        src={client.photo}
                        alt={client.name}
                        size="lg"
                        shape="circle"
                    />

                    <div className="flex-grow-1">
                        <h5 className="mb-2">{client.name}</h5>

                        <div className="d-flex flex-column gap-2">
                            <div className="d-flex align-items-center gap-2">
                                <Icon name="envelope" className="text-muted" size="sm" />
                                <a href={`mailto:${client.email}`} className="text-decoration-none">
                                    {client.email}
                                </a>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                <Icon name="phone" className="text-muted" size="sm" />
                                <a href={`tel:${client.phone}`} className="text-decoration-none">
                                    {client.phone}
                                </a>
                            </div>

                            {address && (
                                <div className="d-flex align-items-start gap-2">
                                    <Icon name="map-marker-alt" className="text-muted mt-1" size="sm" />
                                    <div>
                                        <p className="mb-0">{address.street}</p>
                                        <small className="text-muted">
                                            {address.neighborhood ? `${address.neighborhood}, ` : ''}{address.city}
                                        </small>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
