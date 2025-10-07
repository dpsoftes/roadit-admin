/**
 * Servicio API principal para manejo de llamadas HTTP
 * Servicio singleton para todas las operaciones con el backend Django
 */

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpMethod } from './EndPoints';

export interface ApiCallConfig<T = any> {
    type: HttpMethod;
    endpoint: string;
    params?: Record<string, any>;
    body?: T;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly http = inject(HttpClient);
    private baseUrl = 'http://localhost:8000/api'; // URL base del backend Django

    /**
     * Permite cambiar la URL base dinámicamente
     */
    setBaseUrl(url: string): void {
        this.baseUrl = url.replace(/\/+$/, ''); // Eliminar barras al final
    }

    /**
     * Obtiene la URL base actual
     */
    getBaseUrl(): string {
        return this.baseUrl;
    }

    /**
     * Construye la URL completa concatenando baseUrl + endpoint
     */
    private buildFullUrl(endpoint: string): string {
        // Eliminar barras duplicadas y asegurar formato correcto
        const cleanBaseUrl = this.baseUrl.replace(/\/+$/, '');
        const cleanEndpoint = endpoint.replace(/^\/+/, '');
        return `${cleanBaseUrl}/${cleanEndpoint}`;
    }

    /**
     * Realiza una petición GET
     */
    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        try {
            const url = this.buildFullUrl(endpoint);
            const httpParams = this.buildHttpParams(params);
            const response = await firstValueFrom(
                this.http.get<T>(url, { params: httpParams })
            );
            return response;
        } catch (error) {
            this.handleError(error, HttpMethod.GET, endpoint);
            throw error;
        }
    }

    /**
     * Realiza una petición POST
     */
    async post<T>(endpoint: string, body?: any, params?: Record<string, any>): Promise<T> {
        try {
            const url = this.buildFullUrl(endpoint);
            const httpParams = this.buildHttpParams(params);
            const response = await firstValueFrom(
                this.http.post<T>(url, body, { params: httpParams })
            );
            return response;
        } catch (error) {
            this.handleError(error, HttpMethod.POST, endpoint);
            throw error;
        }
    }

    /**
     * Realiza una petición PATCH
     */
    async patch<T>(endpoint: string, body?: any, params?: Record<string, any>): Promise<T> {
        try {
            const url = this.buildFullUrl(endpoint);
            const httpParams = this.buildHttpParams(params);
            const response = await firstValueFrom(
                this.http.patch<T>(url, body, { params: httpParams })
            );
            return response;
        } catch (error) {
            this.handleError(error, HttpMethod.PATCH, endpoint);
            throw error;
        }
    }

    /**
     * Realiza una petición PUT
     */
    async put<T>(endpoint: string, body?: any, params?: Record<string, any>): Promise<T> {
        try {
            const url = this.buildFullUrl(endpoint);
            const httpParams = this.buildHttpParams(params);
            const response = await firstValueFrom(
                this.http.put<T>(url, body, { params: httpParams })
            );
            return response;
        } catch (error) {
            this.handleError(error, HttpMethod.PUT, endpoint);
            throw error;
        }
    }

    /**
     * Realiza una petición DELETE
     */
    async delete<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        try {
            const url = this.buildFullUrl(endpoint);
            const httpParams = this.buildHttpParams(params);
            const response = await firstValueFrom(
                this.http.delete<T>(url, { params: httpParams })
            );
            return response;
        } catch (error) {
            this.handleError(error, HttpMethod.DELETE, endpoint);
            throw error;
        }
    }

    /**
     * Método universal que llama al método HTTP correspondiente
     */
    async call<T>(config: ApiCallConfig): Promise<T> {
        const { type, endpoint, params, body } = config;

        switch (type) {
            case HttpMethod.GET:
                return this.get<T>(endpoint, params);
            case HttpMethod.POST:
                return this.post<T>(endpoint, body, params);
            case HttpMethod.PATCH:
                return this.patch<T>(endpoint, body, params);
            case HttpMethod.PUT:
                return this.put<T>(endpoint, body, params);
            case HttpMethod.DELETE:
                return this.delete<T>(endpoint, params);
            default:
                throw new Error(`Método HTTP no soportado: ${type}`);
        }
    }

    /**
     * Construye los parámetros HTTP desde un objeto
     */
    private buildHttpParams(params?: Record<string, any>): HttpParams {
        let httpParams = new HttpParams();

        if (params) {
            Object.keys(params).forEach(key => {
                const value = params[key];
                if (value !== null && value !== undefined) {
                    httpParams = httpParams.set(key, value.toString());
                }
            });
        }

        return httpParams;
    }

    /**
     * Maneja los errores de las peticiones HTTP
     */
    private handleError(error: any, method: HttpMethod, endpoint: string): void {
        const fullUrl = this.buildFullUrl(endpoint);
        console.error(`Error en ${method} ${fullUrl}:`, error);

        if (error instanceof HttpErrorResponse) {
            // Aquí puedes personalizar el manejo de errores según el código de estado
            switch (error.status) {
                case 401:
                    console.error('Error de autenticación - Token inválido o expirado');
                    break;
                case 403:
                    console.error('Acceso denegado - Sin permisos suficientes');
                    break;
                case 404:
                    console.error('Recurso no encontrado');
                    break;
                case 500:
                    console.error('Error interno del servidor');
                    break;
                default:
                    console.error(`Error HTTP ${error.status}: ${error.message}`);
            }
        }
    }
}