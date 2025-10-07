/**
 * Servicio de conversiones y transformaciones
 * Helper para convertir entre diferentes formatos de datos
 */

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConversionHelperService {

    /**
     * Convierte fechas ISO string a Date objects de forma segura
     */
    toDate(value: string | Date | null | undefined): Date | null {
        if (!value) return null;
        if (value instanceof Date) return value;

        const date = new Date(value);
        return isNaN(date.getTime()) ? null : date;
    }

    /**
     * Convierte Date a ISO string de forma segura
     */
    toISOString(value: Date | string | null | undefined): string | null {
        if (!value) return null;

        const date = value instanceof Date ? value : new Date(value);
        return isNaN(date.getTime()) ? null : date.toISOString();
    }

    /**
     * Convierte string a número de forma segura
     */
    toNumber(value: string | number | null | undefined, defaultValue: number = 0): number {
        if (typeof value === 'number') return value;
        if (!value) return defaultValue;

        const num = parseFloat(value.toString());
        return isNaN(num) ? defaultValue : num;
    }

    /**
     * Convierte snake_case a camelCase
     */
    toCamelCase(str: string): string {
        return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    }

    /**
     * Convierte camelCase a snake_case
     */
    toSnakeCase(str: string): string {
        return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    }

    /**
     * Convierte objeto completo de snake_case a camelCase
     */
    objectToCamelCase<T = any>(obj: any): T {
        if (obj === null || obj === undefined) return obj;
        if (Array.isArray(obj)) {
            return obj.map(item => this.objectToCamelCase(item)) as T;
        }
        if (typeof obj === 'object') {
            const converted: any = {};
            for (const [key, value] of Object.entries(obj)) {
                const camelKey = this.toCamelCase(key);
                converted[camelKey] = this.objectToCamelCase(value);
            }
            return converted;
        }
        return obj;
    }

    /**
     * Convierte objeto completo de camelCase a snake_case
     */
    objectToSnakeCase<T = any>(obj: any): T {
        if (obj === null || obj === undefined) return obj;
        if (Array.isArray(obj)) {
            return obj.map(item => this.objectToSnakeCase(item)) as T;
        }
        if (typeof obj === 'object') {
            const converted: any = {};
            for (const [key, value] of Object.entries(obj)) {
                const snakeKey = this.toSnakeCase(key);
                converted[snakeKey] = this.objectToSnakeCase(value);
            }
            return converted;
        }
        return obj;
    }

    /**
     * Formatea precio con símbolo de moneda
     */
    formatPrice(amount: number, currency: string = 'EUR', locale: string = 'es-ES'): string {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    /**
     * Formatea distancia con unidades
     */
    formatDistance(meters: number): string {
        if (meters < 1000) {
            return `${Math.round(meters)} m`;
        }
        return `${(meters / 1000).toFixed(1)} km`;
    }

    /**
     * Formatea duración en formato legible
     */
    formatDuration(milliseconds: number): string {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    }

    /**
     * Calcula diferencia de tiempo entre dos fechas
     */
    timeDifference(start: Date | string, end: Date | string): number {
        const startDate = this.toDate(start);
        const endDate = this.toDate(end);

        if (!startDate || !endDate) return 0;
        return endDate.getTime() - startDate.getTime();
    }

    /**
     * Valida formato de email
     */
    isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Valida formato de teléfono español
     */
    isValidPhoneSpain(phone: string): boolean {
        const phoneRegex = /^(?:\+34|0034|34)?[6789]\d{8}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    /**
     * Normaliza texto para búsquedas (sin acentos, minúsculas)
     */
    normalizeText(text: string): string {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    /**
     * Genera ID único simple
     */
    generateId(prefix?: string): string {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
    }
}