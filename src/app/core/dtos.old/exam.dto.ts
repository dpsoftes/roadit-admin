import { ExamQuestionType } from '../enums/additional.enum';
import { BaseEntity } from './base.dto';

export class ExamOptionDto {
    title: string;
    is_correct: boolean;

    constructor(data: any = {}) {
        this.title = data.title || '';
        this.is_correct = data.is_correct || false;
    }

    static fromJson(json: any): ExamOptionDto {
        return new ExamOptionDto(json);
    }

    toJson(): any {
        return {
            title: this.title,
            is_correct: this.is_correct
        };
    }

    copyWith(updates: Partial<ExamOptionDto>): ExamOptionDto {
        return new ExamOptionDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class ExamQuestionDto extends BaseEntity {
    title: string;
    type: ExamQuestionType;
    required: boolean;
    order: number;
    requires_manual_review: boolean;
    options: ExamOptionDto[];

    constructor(data: any = {}) {
        super(data);
        this.title = data.title || '';
        this.type = data.type;
        this.required = data.required || false;
        this.order = data.order || 0;
        this.requires_manual_review = data.requires_manual_review || false;
        this.options = (data.options || []).map((option: any) => ExamOptionDto.fromJson(option));
    }

    static fromJson(json: any): ExamQuestionDto {
        return new ExamQuestionDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            title: this.title,
            type: this.type,
            required: this.required,
            order: this.order,
            requires_manual_review: this.requires_manual_review,
            options: this.options.map(option => option.toJson())
        };
    }

    copyWith(updates: Partial<ExamQuestionDto>): ExamQuestionDto {
        return new ExamQuestionDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class ExamQuestionCreateDto {
    title: string;
    type: ExamQuestionType;
    required?: boolean;
    order: number;
    requires_manual_review?: boolean;
    options?: ExamOptionDto[];

    constructor(data: any = {}) {
        this.title = data.title || '';
        this.type = data.type;
        this.required = data.required;
        this.order = data.order || 0;
        this.requires_manual_review = data.requires_manual_review;
        this.options = data.options ? data.options.map((option: any) => ExamOptionDto.fromJson(option)) : undefined;
    }

    static fromJson(json: any): ExamQuestionCreateDto {
        return new ExamQuestionCreateDto(json);
    }

    toJson(): any {
        return {
            title: this.title,
            type: this.type,
            required: this.required,
            order: this.order,
            requires_manual_review: this.requires_manual_review,
            options: this.options?.map(option => option.toJson())
        };
    }

    copyWith(updates: Partial<ExamQuestionCreateDto>): ExamQuestionCreateDto {
        return new ExamQuestionCreateDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class ExamDto extends BaseEntity {
    title: string;
    allow_new_drivers: boolean;
    max_tries_per_week: number;
    client: number | null;
    client_additional_service: number | null;
    questions: ExamQuestionDto[];

    constructor(data: any = {}) {
        super(data);
        this.title = data.title || '';
        this.allow_new_drivers = data.allow_new_drivers || false;
        this.max_tries_per_week = data.max_tries_per_week || 0;
        this.client = data.client;
        this.client_additional_service = data.client_additional_service;
        this.questions = (data.questions || []).map((question: any) => ExamQuestionDto.fromJson(question));
    }

    static fromJson(json: any): ExamDto {
        return new ExamDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            title: this.title,
            allow_new_drivers: this.allow_new_drivers,
            max_tries_per_week: this.max_tries_per_week,
            client: this.client,
            client_additional_service: this.client_additional_service,
            questions: this.questions.map(question => question.toJson())
        };
    }

    copyWith(updates: Partial<ExamDto>): ExamDto {
        return new ExamDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class ExamCreateDto {
    title: string;
    allow_new_drivers?: boolean;
    max_tries_per_week?: number;
    client?: number | null;
    client_additional_service?: number | null;
    questions: ExamQuestionCreateDto[];

    constructor(data: any = {}) {
        this.title = data.title || '';
        this.allow_new_drivers = data.allow_new_drivers;
        this.max_tries_per_week = data.max_tries_per_week;
        this.client = data.client;
        this.client_additional_service = data.client_additional_service;
        this.questions = (data.questions || []).map((question: any) => ExamQuestionCreateDto.fromJson(question));
    }

    static fromJson(json: any): ExamCreateDto {
        return new ExamCreateDto(json);
    }

    toJson(): any {
        return {
            title: this.title,
            allow_new_drivers: this.allow_new_drivers,
            max_tries_per_week: this.max_tries_per_week,
            client: this.client,
            client_additional_service: this.client_additional_service,
            questions: this.questions.map(question => question.toJson())
        };
    }

    copyWith(updates: Partial<ExamCreateDto>): ExamCreateDto {
        return new ExamCreateDto({
            ...this.toJson(),
            ...updates
        });
    }
}


