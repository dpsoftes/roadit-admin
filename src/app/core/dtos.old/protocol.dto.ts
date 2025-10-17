import { DirectionType, ProtocolType } from '../enums/additional.enum';
import { TransportPrincipalType } from '../enums/transport.enum';
import { BaseEntity } from './base.dto';

export class ProtocolOptionDto extends BaseEntity {
    title: string;

    constructor(data: any = {}) {
        super(data);
        this.title = data.title || '';
    }

    static fromJson(json: any): ProtocolOptionDto {
        return new ProtocolOptionDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            title: this.title
        };
    }

    copyWith(updates: Partial<ProtocolOptionDto>): ProtocolOptionDto {
        return new ProtocolOptionDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class ProtocolDto extends BaseEntity {
    title: string;
    protocol_type: ProtocolType;
    direction_type: DirectionType;
    transport_principal_type: TransportPrincipalType[];
    options: ProtocolOptionDto[];

    constructor(data: any = {}) {
        super(data);
        this.title = data.title || '';
        this.protocol_type = data.protocol_type;
        this.direction_type = data.direction_type;
        this.transport_principal_type = data.transport_principal_type || [];
        this.options = (data.options || []).map((option: any) => ProtocolOptionDto.fromJson(option));
    }

    static fromJson(json: any): ProtocolDto {
        return new ProtocolDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            title: this.title,
            protocol_type: this.protocol_type,
            direction_type: this.direction_type,
            transport_principal_type: this.transport_principal_type,
            options: this.options.map(option => option.toJson())
        };
    }

    copyWith(updates: Partial<ProtocolDto>): ProtocolDto {
        return new ProtocolDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class ClientProtocolDto extends ProtocolDto {
    client: number;

    constructor(data: any = {}) {
        super(data);
        this.client = data.client || 0;
    }

    static override fromJson(json: any): ClientProtocolDto {
        return new ClientProtocolDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            client: this.client
        };
    }

    override copyWith(updates: Partial<ClientProtocolDto>): ClientProtocolDto {
        return new ClientProtocolDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class TransportProtocolDto extends ProtocolDto {
    transport: number;

    constructor(data: any = {}) {
        super(data);
        this.transport = data.transport || 0;
    }

    static override fromJson(json: any): TransportProtocolDto {
        return new TransportProtocolDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            transport: this.transport
        };
    }

    override copyWith(updates: Partial<TransportProtocolDto>): TransportProtocolDto {
        return new TransportProtocolDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateProtocolDto {
    title: string;
    protocol_type: ProtocolType;
    direction_type: DirectionType;
    transport_principal_type: TransportPrincipalType[];

    constructor(data: any = {}) {
        this.title = data.title || '';
        this.protocol_type = data.protocol_type;
        this.direction_type = data.direction_type;
        this.transport_principal_type = data.transport_principal_type || [];
    }

    static fromJson(json: any): CreateProtocolDto {
        return new CreateProtocolDto(json);
    }

    toJson(): any {
        return {
            title: this.title,
            protocol_type: this.protocol_type,
            direction_type: this.direction_type,
            transport_principal_type: this.transport_principal_type
        };
    }

    copyWith(updates: Partial<CreateProtocolDto>): CreateProtocolDto {
        return new CreateProtocolDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateClientProtocolDto extends CreateProtocolDto {
    client: number;

    constructor(data: any = {}) {
        super(data);
        this.client = data.client || 0;
    }

    static override fromJson(json: any): CreateClientProtocolDto {
        return new CreateClientProtocolDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            client: this.client
        };
    }

    override copyWith(updates: Partial<CreateClientProtocolDto>): CreateClientProtocolDto {
        return new CreateClientProtocolDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateTransportProtocolDto extends CreateProtocolDto {
    transport: number;

    constructor(data: any = {}) {
        super(data);
        this.transport = data.transport || 0;
    }

    static override fromJson(json: any): CreateTransportProtocolDto {
        return new CreateTransportProtocolDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            transport: this.transport
        };
    }

    override copyWith(updates: Partial<CreateTransportProtocolDto>): CreateTransportProtocolDto {
        return new CreateTransportProtocolDto({
            ...this.toJson(),
            ...updates
        });
    }
}


