import { IncidenceCreator, IncidenceStatus, IncidenceType, Responsibility, Severity } from '../enums/additional.enum';
import { BaseEntity } from './base.dto';

export class IncidenceDto extends BaseEntity {
    filters: string;
    comments: string;
    incidence_type: IncidenceType;
    transport_principal_type: string;
    rating_modification: number;
    status: IncidenceStatus;
    who_created: IncidenceCreator;
    responsibility: Responsibility;
    severity: Severity;
    zendesk_link: string;
    driver: string; // UUID
    driver_username: string;
    client: number;
    client_name: string;

    constructor(data: any = {}) {
        super(data);
        this.filters = data.filters || '';
        this.comments = data.comments || '';
        this.incidence_type = data.incidence_type;
        this.transport_principal_type = data.transport_principal_type || '';
        this.rating_modification = data.rating_modification || 0;
        this.status = data.status;
        this.who_created = data.who_created;
        this.responsibility = data.responsibility;
        this.severity = data.severity;
        this.zendesk_link = data.zendesk_link || '';
        this.driver = data.driver || '';
        this.driver_username = data.driver_username || '';
        this.client = data.client || 0;
        this.client_name = data.client_name || '';
    }

    static fromJson(json: any): IncidenceDto {
        return new IncidenceDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            filters: this.filters,
            comments: this.comments,
            incidence_type: this.incidence_type,
            transport_principal_type: this.transport_principal_type,
            rating_modification: this.rating_modification,
            status: this.status,
            who_created: this.who_created,
            responsibility: this.responsibility,
            severity: this.severity,
            zendesk_link: this.zendesk_link,
            driver: this.driver,
            driver_username: this.driver_username,
            client: this.client,
            client_name: this.client_name
        };
    }

    copyWith(updates: Partial<IncidenceDto>): IncidenceDto {
        return new IncidenceDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateIncidenceDto {
    filters: string;
    comments: string;
    incidence_type: IncidenceType;
    transport_principal_type: string;
    rating_modification: number;
    status: IncidenceStatus;
    who_created: IncidenceCreator;
    responsibility: Responsibility;
    severity: Severity;
    zendesk_link: string;
    driver: string; // UUID
    client: number;

    constructor(data: any = {}) {
        this.filters = data.filters || '';
        this.comments = data.comments || '';
        this.incidence_type = data.incidence_type;
        this.transport_principal_type = data.transport_principal_type || '';
        this.rating_modification = data.rating_modification || 0;
        this.status = data.status;
        this.who_created = data.who_created;
        this.responsibility = data.responsibility;
        this.severity = data.severity;
        this.zendesk_link = data.zendesk_link || '';
        this.driver = data.driver || '';
        this.client = data.client || 0;
    }

    static fromJson(json: any): CreateIncidenceDto {
        return new CreateIncidenceDto(json);
    }

    toJson(): any {
        return {
            filters: this.filters,
            comments: this.comments,
            incidence_type: this.incidence_type,
            transport_principal_type: this.transport_principal_type,
            rating_modification: this.rating_modification,
            status: this.status,
            who_created: this.who_created,
            responsibility: this.responsibility,
            severity: this.severity,
            zendesk_link: this.zendesk_link,
            driver: this.driver,
            client: this.client
        };
    }

    copyWith(updates: Partial<CreateIncidenceDto>): CreateIncidenceDto {
        return new CreateIncidenceDto({
            ...this.toJson(),
            ...updates
        });
    }
}


