import { BaseEntity } from './base.dto';

export class DocumentTemplateDto extends BaseEntity {
    title: string;
    description: string;
    template_file: string | null;
    is_active: boolean;

    constructor(data: any = {}) {
        super(data);
        this.title = data.title || '';
        this.description = data.description || '';
        this.template_file = data.template_file;
        this.is_active = data.is_active || false;
    }

    static fromJson(json: any): DocumentTemplateDto {
        return new DocumentTemplateDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            title: this.title,
            description: this.description,
            template_file: this.template_file,
            is_active: this.is_active
        };
    }

    copyWith(updates: Partial<DocumentTemplateDto>): DocumentTemplateDto {
        return new DocumentTemplateDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class CreateDocumentTemplateDto {
    title: string;
    description?: string;
    template_file?: File | null;
    is_active?: boolean;

    constructor(data: any = {}) {
        this.title = data.title || '';
        this.description = data.description;
        this.template_file = data.template_file;
        this.is_active = data.is_active;
    }

    static fromJson(json: any): CreateDocumentTemplateDto {
        return new CreateDocumentTemplateDto(json);
    }

    toJson(): any {
        return {
            title: this.title,
            description: this.description,
            template_file: this.template_file,
            is_active: this.is_active
        };
    }

    copyWith(updates: Partial<CreateDocumentTemplateDto>): CreateDocumentTemplateDto {
        return new CreateDocumentTemplateDto({
            ...this.toJson(),
            ...updates
        });
    }
}


