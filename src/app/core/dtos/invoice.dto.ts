import { InvoiceStatus } from '../enums/additional.enum';
import { BaseEntity } from './base.dto';

export class InvoiceDto extends BaseEntity {
    invoice_status: InvoiceStatus;
    total_price: number;
    transport_included: boolean;
    adjustment_included: boolean;
    emission_datetime: string | null;
    payment_datetime: string | null;
    vat_percentage: number;
    driver: string; // UUID
    transports: number[];
    adjustments: number[];
    tags: number[];

    constructor(data: any = {}) {
        super(data);
        this.invoice_status = data.invoice_status;
        this.total_price = data.total_price || 0;
        this.transport_included = data.transport_included || false;
        this.adjustment_included = data.adjustment_included || false;
        this.emission_datetime = data.emission_datetime;
        this.payment_datetime = data.payment_datetime;
        this.vat_percentage = data.vat_percentage || 0;
        this.driver = data.driver || '';
        this.transports = data.transports || [];
        this.adjustments = data.adjustments || [];
        this.tags = data.tags || [];
    }

    static fromJson(json: any): InvoiceDto {
        return new InvoiceDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            invoice_status: this.invoice_status,
            total_price: this.total_price,
            transport_included: this.transport_included,
            adjustment_included: this.adjustment_included,
            emission_datetime: this.emission_datetime,
            payment_datetime: this.payment_datetime,
            vat_percentage: this.vat_percentage,
            driver: this.driver,
            transports: this.transports,
            adjustments: this.adjustments,
            tags: this.tags
        };
    }

    copyWith(updates: Partial<InvoiceDto>): InvoiceDto {
        return new InvoiceDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateInvoiceDto {
    invoice_status?: InvoiceStatus;
    total_price: number;
    transport_included?: boolean;
    adjustment_included?: boolean;
    emission_datetime?: string | null;
    payment_datetime?: string | null;
    vat_percentage: number;
    driver: string; // UUID
    transports?: number[];
    adjustments?: number[];
    tags?: number[];

    constructor(data: any = {}) {
        this.invoice_status = data.invoice_status;
        this.total_price = data.total_price || 0;
        this.transport_included = data.transport_included;
        this.adjustment_included = data.adjustment_included;
        this.emission_datetime = data.emission_datetime;
        this.payment_datetime = data.payment_datetime;
        this.vat_percentage = data.vat_percentage || 0;
        this.driver = data.driver || '';
        this.transports = data.transports;
        this.adjustments = data.adjustments;
        this.tags = data.tags;
    }

    static fromJson(json: any): CreateInvoiceDto {
        return new CreateInvoiceDto(json);
    }

    toJson(): any {
        return {
            invoice_status: this.invoice_status,
            total_price: this.total_price,
            transport_included: this.transport_included,
            adjustment_included: this.adjustment_included,
            emission_datetime: this.emission_datetime,
            payment_datetime: this.payment_datetime,
            vat_percentage: this.vat_percentage,
            driver: this.driver,
            transports: this.transports,
            adjustments: this.adjustments,
            tags: this.tags
        };
    }

    copyWith(updates: Partial<CreateInvoiceDto>): CreateInvoiceDto {
        return new CreateInvoiceDto({
            ...this.toJson(),
            ...updates
        });
    }
}


