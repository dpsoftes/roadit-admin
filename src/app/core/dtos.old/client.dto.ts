/**
 * Client DTOs - Basados en apps.client.api.serializers.client_serializer
 */

import { BaseEntity } from './base.dto';

/**
 * ClientMiniSerializer - Campos bÃ¡sicos del cliente
 */
export class ClientMiniDto {
    id?: number;
    name: string;
    CIF: string;
    client_type: string;
    client_origin: string;

    constructor(data: any = {}) {
        this.id = data.id;
        this.name = data.name || '';
        this.CIF = data.CIF || '';
        this.client_type = data.client_type || '';
        this.client_origin = data.client_origin || '';
    }

    static fromJson(json: any): ClientMiniDto {
        return new ClientMiniDto(json);
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            CIF: this.CIF,
            client_type: this.client_type,
            client_origin: this.client_origin
        };
    }
}

/**
 * ClientSerializer - Cliente completo
 */
export class ClientDto extends BaseEntity {
    name: string;
    client_group?: number;
    CIF: string;
    department?: string;
    parent?: number;
    client_type: string;
    client_origin: string;
    billing_type: string;
    invite_delay_minutes?: number;
    reminder_interval_minutes?: number;
    contact_person_name?: string;
    contact_person_email?: string;
    contact_person_phone?: string;
    tags?: any[];

    constructor(data: any = {}) {
        super(data);
        this.name = data.name || '';
        this.client_group = data.client_group;
        this.CIF = data.CIF || '';
        this.department = data.department;
        this.parent = data.parent;
        this.client_type = data.client_type || '';
        this.client_origin = data.client_origin || '';
        this.billing_type = data.billing_type || '';
        this.invite_delay_minutes = data.invite_delay_minutes;
        this.reminder_interval_minutes = data.reminder_interval_minutes;
        this.contact_person_name = data.contact_person_name;
        this.contact_person_email = data.contact_person_email;
        this.contact_person_phone = data.contact_person_phone;
        this.tags = data.tags;
    }

    static fromJson(json: any): ClientDto {
        return new ClientDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            name: this.name,
            client_group: this.client_group,
            CIF: this.CIF,
            department: this.department,
            parent: this.parent,
            client_type: this.client_type,
            client_origin: this.client_origin,
            billing_type: this.billing_type,
            invite_delay_minutes: this.invite_delay_minutes,
            reminder_interval_minutes: this.reminder_interval_minutes,
            contact_person_name: this.contact_person_name,
            contact_person_email: this.contact_person_email,
            contact_person_phone: this.contact_person_phone,
            tags: this.tags
        };
    }
}

/**
 * CreateClientSerializer - Para crear clientes
 */
export class CreateClientDto {
    name: string;
    CIF: string;
    client_group?: number;
    department?: string;
    parent?: number;
    client_type: string;
    client_origin: string;
    billing_type: string;
    contact_person_name?: string;
    contact_person_email?: string;
    contact_person_phone?: string;
    is_subentity?: boolean;
    own_insurance?: boolean;
    at_risk?: boolean;
    managers?: number[];

    constructor(data: any = {}) {
        this.name = data.name || '';
        this.CIF = data.CIF || '';
        this.client_group = data.client_group;
        this.department = data.department;
        this.parent = data.parent;
        this.client_type = data.client_type || '';
        this.client_origin = data.client_origin || '';
        this.billing_type = data.billing_type || '';
        this.contact_person_name = data.contact_person_name;
        this.contact_person_email = data.contact_person_email;
        this.contact_person_phone = data.contact_person_phone;
        this.is_subentity = data.is_subentity;
        this.own_insurance = data.own_insurance;
        this.at_risk = data.at_risk;
        this.managers = data.managers;
    }

    toJson(): any {
        return {
            name: this.name,
            CIF: this.CIF,
            client_group: this.client_group,
            department: this.department,
            parent: this.parent,
            client_type: this.client_type,
            client_origin: this.client_origin,
            billing_type: this.billing_type,
            contact_person_name: this.contact_person_name,
            contact_person_email: this.contact_person_email,
            contact_person_phone: this.contact_person_phone,
            is_subentity: this.is_subentity,
            own_insurance: this.own_insurance,
            at_risk: this.at_risk,
            managers: this.managers
        };
    }
}


