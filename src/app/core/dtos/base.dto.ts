/**
 * DTOs base y interfaces comunes
 */

/**
 * Respuesta paginada estándar de Django REST Framework
 */
export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

/**
 * Respuesta de error estándar
 */
export interface ErrorResponse {
    error?: string;
    errors?: Record<string, string[]>;
    message?: string;
    detail?: string;
}

/**
 * Respuesta exitosa genérica
 */
export interface SuccessResponse {
    message: string;
    detail?: string;
}

/**
 * Clase base para entidades con campos comunes de Django
 */
export abstract class BaseEntity {
    id?: number;
    created_date?: string;
    modified_date?: string;

    constructor(data: any = {}) {
        this.id = data.id;
        this.created_date = data.created_date;
        this.modified_date = data.modified_date;
    }

    toJson(): any {
        return {
            id: this.id,
            created_date: this.created_date,
            modified_date: this.modified_date
        };
    }
}