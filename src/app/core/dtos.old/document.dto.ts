import { DocumentType } from '../enums/additional.enum';
import { BaseEntity } from './base.dto';

export class DriverDocumentDto extends BaseEntity {
    driver_name: string;
    title: string;
    file: string | null;
    doc_type: string; // Display value from get_doc_type_display()
    validated: boolean;
    approved: boolean;
    expiration_date: string | null;
    invalidation_reason: string | null;

    constructor(data: any = {}) {
        super(data);
        this.driver_name = data.driver_name || '';
        this.title = data.title || '';
        this.file = data.file;
        this.doc_type = data.doc_type || '';
        this.validated = data.validated || false;
        this.approved = data.approved || false;
        this.expiration_date = data.expiration_date;
        this.invalidation_reason = data.invalidation_reason;
    }

    static fromJson(json: any): DriverDocumentDto {
        return new DriverDocumentDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            driver_name: this.driver_name,
            title: this.title,
            file: this.file,
            doc_type: this.doc_type,
            validated: this.validated,
            approved: this.approved,
            expiration_date: this.expiration_date,
            invalidation_reason: this.invalidation_reason
        };
    }

    copyWith(updates: Partial<DriverDocumentDto>): DriverDocumentDto {
        return new DriverDocumentDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateDriverDocumentDto {
    file: File;
    title: string;
    doc_type: DocumentType;
    validated?: boolean;
    approved?: boolean;
    expiration_date?: string | null;
    invalidation_reason?: string | null;
    driver: string; // UUID

    constructor(data: any = {}) {
        this.file = data.file;
        this.title = data.title || '';
        this.doc_type = data.doc_type;
        this.validated = data.validated;
        this.approved = data.approved;
        this.expiration_date = data.expiration_date;
        this.invalidation_reason = data.invalidation_reason;
        this.driver = data.driver || '';
    }

    static fromJson(json: any): CreateDriverDocumentDto {
        return new CreateDriverDocumentDto(json);
    }

    toJson(): any {
        return {
            file: this.file,
            title: this.title,
            doc_type: this.doc_type,
            validated: this.validated,
            approved: this.approved,
            expiration_date: this.expiration_date,
            invalidation_reason: this.invalidation_reason,
            driver: this.driver
        };
    }

    copyWith(updates: Partial<CreateDriverDocumentDto>): CreateDriverDocumentDto {
        return new CreateDriverDocumentDto({
            ...this.toJson(),
            ...updates
        });
    }
}


