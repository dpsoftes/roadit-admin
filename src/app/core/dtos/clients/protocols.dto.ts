import { DirectionType, ProtocolType } from '@enums/additional.enum';
import { TransportPrincipalType } from '@enums/client.enum';

export class ProtocolOptionDto {
    id?: number;
    title?: string;
}

export class ProtocolDto {
    id?: number;
    title?: string  = "";
    protocol_type?: ProtocolType;
    direction_type?: DirectionType;
    transport_principal_types?: TransportPrincipalType[];
    client?: number | null;
    transport?: number | null;
    is_template?: boolean;
    options?: ProtocolOptionDto[];
}
