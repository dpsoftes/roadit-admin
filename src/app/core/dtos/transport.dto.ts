/**
 * Transport DTOs - Basados en apps.transport.api.serializers.transport_serializer
 */

import { BaseEntity } from './base.dto';

/**
 * TransportAddress DTO para direcciones de transporte
 */
export class TransportAddressDto {
    address: string;
    latitude?: number;
    longitude?: number;
    contact_name?: string;
    contact_phone?: string;
    contact_email?: string;
    arrival_date?: string;
    departure_date?: string;
    comments?: string;

    constructor(data: any = {}) {
        this.address = data.address || '';
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.contact_name = data.contact_name;
        this.contact_phone = data.contact_phone;
        this.contact_email = data.contact_email;
        this.arrival_date = data.arrival_date;
        this.departure_date = data.departure_date;
        this.comments = data.comments;
    }

    static fromJson(json: any): TransportAddressDto {
        return new TransportAddressDto(json);
    }

    toJson(): any {
        return {
            address: this.address,
            latitude: this.latitude,
            longitude: this.longitude,
            contact_name: this.contact_name,
            contact_phone: this.contact_phone,
            contact_email: this.contact_email,
            arrival_date: this.arrival_date,
            departure_date: this.departure_date,
            comments: this.comments
        };
    }
}

/**
 * StopInSerializer para paradas
 */
export class StopDto {
    transport_address: TransportAddressDto;

    constructor(data: any = {}) {
        this.transport_address = data.transport_address ? new TransportAddressDto(data.transport_address) : new TransportAddressDto();
    }

    toJson(): any {
        return {
            transport_address: this.transport_address.toJson()
        };
    }
}

/**
 * TransportCreateSerializer - Para crear transportes
 */
export class CreateTransportDto {
    vehicles: number[];
    admin?: number;
    driver?: number;
    tags?: number[];
    stops: StopDto[];
    transport_principal_type: string;
    is_express?: boolean;
    has_additional_stage?: boolean;
    phone?: string;
    appointment_management?: boolean;
    emails?: string[];
    comment?: string;

    constructor(data: any = {}) {
        this.vehicles = data.vehicles || [];
        this.admin = data.admin;
        this.driver = data.driver;
        this.tags = data.tags;
        this.stops = data.stops ? data.stops.map((stop: any) => new StopDto(stop)) : [];
        this.transport_principal_type = data.transport_principal_type || '';
        this.is_express = data.is_express;
        this.has_additional_stage = data.has_additional_stage;
        this.phone = data.phone;
        this.appointment_management = data.appointment_management;
        this.emails = data.emails;
        this.comment = data.comment;
    }

    toJson(): any {
        return {
            vehicles: this.vehicles,
            admin: this.admin,
            driver: this.driver,
            tags: this.tags,
            stops: this.stops.map(stop => stop.toJson()),
            transport_principal_type: this.transport_principal_type,
            is_express: this.is_express,
            has_additional_stage: this.has_additional_stage,
            phone: this.phone,
            appointment_management: this.appointment_management,
            emails: this.emails,
            comment: this.comment
        };
    }
}

/**
 * Transport completo
 */
export class TransportDto extends BaseEntity {
    reservation_number?: string;
    is_express: boolean;
    has_additional_stage: boolean;
    transport_principal_type: string;
    phone?: string;
    appointment_management: boolean;
    emails: string[];
    comment?: string;
    status: string;
    cancelled_reason?: string;
    client?: number;
    vehicles: number[];
    admin?: number;
    driver?: number;
    tags: number[];

    constructor(data: any = {}) {
        super(data);
        this.reservation_number = data.reservation_number;
        this.is_express = data.is_express || false;
        this.has_additional_stage = data.has_additional_stage || false;
        this.transport_principal_type = data.transport_principal_type || '';
        this.phone = data.phone;
        this.appointment_management = data.appointment_management || false;
        this.emails = data.emails || [];
        this.comment = data.comment;
        this.status = data.status || '';
        this.cancelled_reason = data.cancelled_reason;
        this.client = data.client;
        this.vehicles = data.vehicles || [];
        this.admin = data.admin;
        this.driver = data.driver;
        this.tags = data.tags || [];
    }

    static fromJson(json: any): TransportDto {
        return new TransportDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            reservation_number: this.reservation_number,
            is_express: this.is_express,
            has_additional_stage: this.has_additional_stage,
            transport_principal_type: this.transport_principal_type,
            phone: this.phone,
            appointment_management: this.appointment_management,
            emails: this.emails,
            comment: this.comment,
            status: this.status,
            cancelled_reason: this.cancelled_reason,
            client: this.client,
            vehicles: this.vehicles,
            admin: this.admin,
            driver: this.driver,
            tags: this.tags
        };
    }
}


