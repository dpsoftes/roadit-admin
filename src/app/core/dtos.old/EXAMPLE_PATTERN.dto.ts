// EJEMPLO de cÃ³mo deberÃ­an ser TODAS las clases DTO
// Basado en tus instrucciones iniciales

import { BaseEntity } from './base.dto';

export class ExampleDto extends BaseEntity {
    name: string;
    status: string;
    count: number;
    optional_field?: string;

    constructor(data: any = {}) {
        super(data); // Para BaseEntity
        this.name = data.name || '';
        this.status = data.status || '';
        this.count = data.count || 0;
        this.optional_field = data.optional_field;
    }

    static fromJson(json: any): ExampleDto {
        return new ExampleDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(), // Para BaseEntity
            name: this.name,
            status: this.status,
            count: this.count,
            optional_field: this.optional_field
        };
    }

    copyWith(updates: Partial<ExampleDto>): ExampleDto {
        return new ExampleDto({
            ...this.toJson(),
            ...updates
        });
    }
}

// Para DTOs que NO extienden BaseEntity (ej: CreateDto)
export class CreateExampleDto {
    name: string;
    status: string;
    count?: number;

    constructor(data: any = {}) {
        this.name = data.name || '';
        this.status = data.status || '';
        this.count = data.count;
    }

    static fromJson(json: any): CreateExampleDto {
        return new CreateExampleDto(json);
    }

    toJson(): any {
        return {
            name: this.name,
            status: this.status,
            count: this.count
        };
    }

    copyWith(updates: Partial<CreateExampleDto>): CreateExampleDto {
        return new CreateExampleDto({
            ...this.toJson(),
            ...updates
        });
    }
}

// PATRÃ“N A SEGUIR:
// 1. Todas las clases (no interfaces)
// 2. Constructor que acepta data: any = {}
// 3. static fromJson(json: any): ClaseDto
// 4. toJson(): any
// 5. copyWith(updates: Partial<ClaseDto>): ClaseDto
// 6. Si extiende BaseEntity, llamar super() en constructor y toJson()


