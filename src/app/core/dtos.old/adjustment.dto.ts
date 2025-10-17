import { AdjustmentType, ReasonType } from '../enums/additional.enum';
import { BaseEntity } from './base.dto';

export class AdjustmentDto extends BaseEntity {
    driver: string; // UUID
    transport: number | null;
    incidence: number | null;
    invoice: number | null;
    adjustment_type: AdjustmentType;
    reason: ReasonType;
    message: string;
    amount: number;
    signed_amount: number; // Calculated field
    invoiced: boolean;
    about_transport: boolean;
    driver_name: string;
    driver_last_name: string;
    driver_email: string;
    driver_tags: string[];
    driver_rating: number;

    constructor(data: any = {}) {
        super(data);
        this.driver = data.driver || '';
        this.transport = data.transport;
        this.incidence = data.incidence;
        this.invoice = data.invoice;
        this.adjustment_type = data.adjustment_type;
        this.reason = data.reason;
        this.message = data.message || '';
        this.amount = data.amount || 0;
        this.signed_amount = data.signed_amount || 0;
        this.invoiced = data.invoiced || false;
        this.about_transport = data.about_transport || false;
        this.driver_name = data.driver_name || '';
        this.driver_last_name = data.driver_last_name || '';
        this.driver_email = data.driver_email || '';
        this.driver_tags = data.driver_tags || [];
        this.driver_rating = data.driver_rating || 0;
    }

    static fromJson(json: any): AdjustmentDto {
        return new AdjustmentDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            driver: this.driver,
            transport: this.transport,
            incidence: this.incidence,
            invoice: this.invoice,
            adjustment_type: this.adjustment_type,
            reason: this.reason,
            message: this.message,
            amount: this.amount,
            signed_amount: this.signed_amount,
            invoiced: this.invoiced,
            about_transport: this.about_transport,
            driver_name: this.driver_name,
            driver_last_name: this.driver_last_name,
            driver_email: this.driver_email,
            driver_tags: this.driver_tags,
            driver_rating: this.driver_rating
        };
    }

    copyWith(updates: Partial<AdjustmentDto>): AdjustmentDto {
        return new AdjustmentDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateAdjustmentDto {
    driver: string; // UUID
    transport?: number | null;
    incidence?: number | null;
    adjustment_type: AdjustmentType;
    reason: ReasonType;
    message?: string;
    amount?: number;

    constructor(data: any = {}) {
        this.driver = data.driver || '';
        this.transport = data.transport;
        this.incidence = data.incidence;
        this.adjustment_type = data.adjustment_type;
        this.reason = data.reason;
        this.message = data.message;
        this.amount = data.amount;
    }

    static fromJson(json: any): CreateAdjustmentDto {
        return new CreateAdjustmentDto(json);
    }

    toJson(): any {
        return {
            driver: this.driver,
            transport: this.transport,
            incidence: this.incidence,
            adjustment_type: this.adjustment_type,
            reason: this.reason,
            message: this.message,
            amount: this.amount
        };
    }

    copyWith(updates: Partial<CreateAdjustmentDto>): CreateAdjustmentDto {
        return new CreateAdjustmentDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class AdjustmentReasonDto extends BaseEntity {
    reason: ReasonType;
    default_message: string;
    default_amount: number | null;

    constructor(data: any = {}) {
        super(data);
        this.reason = data.reason;
        this.default_message = data.default_message || '';
        this.default_amount = data.default_amount;
    }

    static fromJson(json: any): AdjustmentReasonDto {
        return new AdjustmentReasonDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            reason: this.reason,
            default_message: this.default_message,
            default_amount: this.default_amount
        };
    }

    copyWith(updates: Partial<AdjustmentReasonDto>): AdjustmentReasonDto {
        return new AdjustmentReasonDto({
            ...this.toJson(),
            ...updates
        });
    }
}


