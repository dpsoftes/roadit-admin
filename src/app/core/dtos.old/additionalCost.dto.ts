import { RequestStatus, RequestType } from '../enums/additional.enum';
import { BaseEntity } from './base.dto';

export class AdditionalCostDto extends BaseEntity {
    amount_requested: number;
    amount_quoted: string;
    ticket: string | null; // File upload URL
    rejected_reason: string;
    request_status: RequestStatus;
    request_type: RequestType;
    solicitude_datetime: string;
    invoiced: boolean;
    driver: string | null; // UUID
    transport: number | null;

    constructor(data: any = {}) {
        super(data);
        this.amount_requested = data.amount_requested || 0;
        this.amount_quoted = data.amount_quoted || '';
        this.ticket = data.ticket;
        this.rejected_reason = data.rejected_reason || '';
        this.request_status = data.request_status;
        this.request_type = data.request_type;
        this.solicitude_datetime = data.solicitude_datetime || '';
        this.invoiced = data.invoiced || false;
        this.driver = data.driver;
        this.transport = data.transport;
    }

    static fromJson(json: any): AdditionalCostDto {
        return new AdditionalCostDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            amount_requested: this.amount_requested,
            amount_quoted: this.amount_quoted,
            ticket: this.ticket,
            rejected_reason: this.rejected_reason,
            request_status: this.request_status,
            request_type: this.request_type,
            solicitude_datetime: this.solicitude_datetime,
            invoiced: this.invoiced,
            driver: this.driver,
            transport: this.transport
        };
    }

    copyWith(updates: Partial<AdditionalCostDto>): AdditionalCostDto {
        return new AdditionalCostDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateAdditionalCostDto {
    amount_requested: number;
    amount_quoted?: string;
    ticket?: File | null;
    rejected_reason?: string;
    request_status?: RequestStatus;
    request_type: RequestType;
    invoiced?: boolean;
    driver?: string | null;
    transport?: number | null;

    constructor(data: any = {}) {
        this.amount_requested = data.amount_requested || 0;
        this.amount_quoted = data.amount_quoted;
        this.ticket = data.ticket;
        this.rejected_reason = data.rejected_reason;
        this.request_status = data.request_status;
        this.request_type = data.request_type;
        this.invoiced = data.invoiced;
        this.driver = data.driver;
        this.transport = data.transport;
    }

    static fromJson(json: any): CreateAdditionalCostDto {
        return new CreateAdditionalCostDto(json);
    }

    toJson(): any {
        return {
            amount_requested: this.amount_requested,
            amount_quoted: this.amount_quoted,
            ticket: this.ticket,
            rejected_reason: this.rejected_reason,
            request_status: this.request_status,
            request_type: this.request_type,
            invoiced: this.invoiced,
            driver: this.driver,
            transport: this.transport
        };
    }

    copyWith(updates: Partial<CreateAdditionalCostDto>): CreateAdditionalCostDto {
        return new CreateAdditionalCostDto({
            ...this.toJson(),
            ...updates
        });
    }
}


