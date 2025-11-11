import { LegPointType, TransportPrincipalType, TransportStatus } from '../enums/transport.enum';
import { BaseEntity } from './base.dto';

export class AdditionalServiceBaseDto extends BaseEntity {
    default_selected: boolean;
    name: string;
    client_price: number;
    driver_payment: number;
    visible_by_driver: boolean;
    transport_status: TransportStatus;
    leg_point_type: LegPointType;
    transport_principal_types: TransportPrincipalType[];
    requires_certification: boolean;
    requires_image: boolean;
    requires_location: boolean;
    charging_time: number;

    constructor(data: any = {}) {
        super(data);
        this.default_selected = data.default_selected || false;
        this.name = data.name || '';
        this.client_price = data.client_price || 0;
        this.driver_payment = data.driver_payment || 0;
        this.visible_by_driver = data.visible_by_driver || false;
        this.transport_status = data.transport_status;
        this.leg_point_type = data.leg_point_type;
        this.transport_principal_types = data.transport_principal_types || [];
        this.requires_certification = data.requires_certification || false;
        this.requires_image = data.requires_image || false;
        this.requires_location = data.requires_location || false;
        this.charging_time = data.charging_time || 0;
    }

    static fromJson(json: any): AdditionalServiceBaseDto {
        return new AdditionalServiceBaseDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            default_selected: this.default_selected,
            name: this.name,
            client_price: this.client_price,
            driver_payment: this.driver_payment,
            visible_by_driver: this.visible_by_driver,
            transport_status: this.transport_status,
            leg_point_type: this.leg_point_type,
            transport_principal_types: this.transport_principal_types,
            requires_certification: this.requires_certification,
            requires_image: this.requires_image,
            requires_location: this.requires_location,
            charging_time: this.charging_time
        };
    }

    copyWith(updates: Partial<AdditionalServiceBaseDto>): AdditionalServiceBaseDto {
        return new AdditionalServiceBaseDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class ClientAdditionalServiceDto extends AdditionalServiceBaseDto {
    client: number;
    client_name: string;

    constructor(data: any = {}) {
        super(data);
        this.client = data.client || 0;
        this.client_name = data.client_name || '';
    }

    static override fromJson(json: any): ClientAdditionalServiceDto {
        return new ClientAdditionalServiceDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            client: this.client,
            client_name: this.client_name
        };
    }

    override copyWith(updates: Partial<ClientAdditionalServiceDto>): ClientAdditionalServiceDto {
        return new ClientAdditionalServiceDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class TransportAdditionalServiceDto extends AdditionalServiceBaseDto {
    transport: number;
    selected: boolean;
    completed: boolean;
    image: string | null;

    constructor(data: any = {}) {
        super(data);
        this.transport = data.transport || 0;
        this.selected = data.selected || false;
        this.completed = data.completed || false;
        this.image = data.image;
    }

    static override fromJson(json: any): TransportAdditionalServiceDto {
        return new TransportAdditionalServiceDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            transport: this.transport,
            selected: this.selected,
            completed: this.completed,
            image: this.image
        };
    }

    override copyWith(updates: Partial<TransportAdditionalServiceDto>): TransportAdditionalServiceDto {
        return new TransportAdditionalServiceDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateClientAdditionalServiceDto {
    default_selected?: boolean;
    name: string;
    client_price?: number;
    driver_payment?: number;
    visible_by_driver?: boolean;
    transport_status?: TransportStatus;
    leg_point_type?: LegPointType;
    transport_principal_types?: TransportPrincipalType[];
    requires_certification?: boolean;
    requires_image?: boolean;
    requires_location?: boolean;
    charging_time?: number;
    client: number;

    constructor(data: any = {}) {
        this.default_selected = data.default_selected;
        this.name = data.name || '';
        this.client_price = data.client_price;
        this.driver_payment = data.driver_payment;
        this.visible_by_driver = data.visible_by_driver;
        this.transport_status = data.transport_status;
        this.leg_point_type = data.leg_point_type;
        this.transport_principal_types = data.transport_principal_types;
        this.requires_certification = data.requires_certification;
        this.requires_image = data.requires_image;
        this.requires_location = data.requires_location;
        this.charging_time = data.charging_time;
        this.client = data.client || 0;
    }

    static fromJson(json: any): CreateClientAdditionalServiceDto {
        return new CreateClientAdditionalServiceDto(json);
    }

    toJson(): any {
        return {
            default_selected: this.default_selected,
            name: this.name,
            client_price: this.client_price,
            driver_payment: this.driver_payment,
            visible_by_driver: this.visible_by_driver,
            transport_status: this.transport_status,
            leg_point_type: this.leg_point_type,
            transport_principal_types: this.transport_principal_types,
            requires_certification: this.requires_certification,
            requires_image: this.requires_image,
            requires_location: this.requires_location,
            charging_time: this.charging_time,
            client: this.client
        };
    }

    copyWith(updates: Partial<CreateClientAdditionalServiceDto>): CreateClientAdditionalServiceDto {
        return new CreateClientAdditionalServiceDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateTransportAdditionalServiceDto {
    default_selected?: boolean;
    name: string;
    client_price?: number;
    driver_payment?: number;
    visible_by_driver?: boolean;
    transport_status?: TransportStatus;
    leg_point_type?: LegPointType;
    transport_principal_types?: TransportPrincipalType[];
    requires_certification?: boolean;
    requires_image?: boolean;
    requires_location?: boolean;
    charging_time?: number;
    transport?: number;
    selected?: boolean;
    completed?: boolean;
    image?: File | null;

    constructor(data: any = {}) {
        this.default_selected = data.default_selected;
        this.name = data.name || '';
        this.client_price = data.client_price;
        this.driver_payment = data.driver_payment;
        this.visible_by_driver = data.visible_by_driver;
        this.transport_status = data.transport_status;
        this.leg_point_type = data.leg_point_type;
        this.transport_principal_types = data.transport_principal_types;
        this.requires_certification = data.requires_certification;
        this.requires_image = data.requires_image;
        this.requires_location = data.requires_location;
        this.charging_time = data.charging_time;
        this.transport = data.transport;
        this.selected = data.selected;
        this.completed = data.completed;
        this.image = data.image;
    }

    static fromJson(json: any): CreateTransportAdditionalServiceDto {
        return new CreateTransportAdditionalServiceDto(json);
    }

    toJson(): any {
        return {
            default_selected: this.default_selected,
            name: this.name,
            client_price: this.client_price,
            driver_payment: this.driver_payment,
            visible_by_driver: this.visible_by_driver,
            transport_status: this.transport_status,
            leg_point_type: this.leg_point_type,
            transport_principal_types: this.transport_principal_types,
            requires_certification: this.requires_certification,
            requires_image: this.requires_image,
            requires_location: this.requires_location,
            charging_time: this.charging_time,
            transport: this.transport,
            selected: this.selected,
            completed: this.completed,
            image: this.image
        };
    }

    copyWith(updates: Partial<CreateTransportAdditionalServiceDto>): CreateTransportAdditionalServiceDto {
        return new CreateTransportAdditionalServiceDto({
            ...this.toJson(),
            ...updates
        });
    }
}


