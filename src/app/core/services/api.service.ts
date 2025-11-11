
/**
 * Servicio API principal para manejo de llamadas HTTP
 * Servicio singleton para todas las operaciones con el backend Django
 */

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EndPoints, HttpMethod } from './EndPoints';
import { Helpers } from '@utils/helpers';
import { GlobalStore } from '@store/global.state';


export interface ApiRequestOptions {
    url: string;
    queryParams?: Record<string, any>;
    formParams?: Record<string, any>;
    fileParams?: { [key: string]: File };
    body?: any;
    withoutAuth?: boolean;
}


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly http = inject(HttpClient);
    private baseUrl = 'http://localhost:8000/api'; // URL base del backend Django
    private globalStore = inject(GlobalStore);
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


    async get<T>(options: ApiRequestOptions): Promise<T> {
        try {
            const { headers, params, url } = await this.buildRequestOptions(options);
            const response = await firstValueFrom(
                this.http.get<T>(url, { params, headers })
            );
            return response;
        } catch (error) {
            this.handleError(error, HttpMethod.GET, options.url);
            throw error;
        }
    }
    async post<T>(options: ApiRequestOptions): Promise<T> {
        try {
            const { headers, params, body, url } = await this.buildRequestOptions(options);
            const response = await firstValueFrom(
                this.http.post<T>(url, body, { params, headers })
            );
            return response;
        } catch (error) {
            this.handleError(error, HttpMethod.POST, options.url);
            throw error;
        }
    }


    async patch<T>(options: ApiRequestOptions): Promise<T> {
        try {
            const { headers, params, body, url } = await this.buildRequestOptions(options);
            const response = await firstValueFrom(
                this.http.patch<T>(url, body, { params, headers })
            );
            return response;
        } catch (error) {
            this.handleError(error, HttpMethod.PATCH, options.url);
            throw error;
        }
    }


    async put<T>(options: ApiRequestOptions): Promise<T> {
        try {
            const { headers, params, body, url } = await this.buildRequestOptions(options);
            const response = await firstValueFrom(
                this.http.put<T>(url, body, { params, headers })
            );
            return response;
        } catch (error) {
            this.handleError(error, HttpMethod.PUT, options.url);
            throw error;
        }
    }


    async delete<T>(options: ApiRequestOptions): Promise<T> {
        try {
            const { headers, params, url } = await this.buildRequestOptions(options);
            const response = await firstValueFrom(
                this.http.delete<T>(url, { params, headers })
            );
            return response;
        } catch (error) {
            this.handleError(error, HttpMethod.DELETE, options.url);
            throw error;
        }
    }


    async call<T>(type: HttpMethod, options: ApiRequestOptions): Promise<T> {
        switch (type) {
            case HttpMethod.GET:
                return this.get<T>(options);
            case HttpMethod.POST:
                return this.post<T>(options);
            case HttpMethod.PATCH:
                return this.patch<T>(options);
            case HttpMethod.PUT:
                return this.put<T>(options);
            case HttpMethod.DELETE:
                return this.delete<T>(options);
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
    async getHeader(): Promise<{ [header: string]: string }> {
        
        if (this.globalStore.isAuthenticated()) {
            let token = this.globalStore.token();
            if (token === "expired") {
                // Obtener refresh token
                const refreshToken = this.globalStore.user()['refresh-token'];
                // Llamar a refresh endpoint usando el nuevo formato
                const response = await this.post<{ token: string; ['refresh-token']: string }>({
                    url: EndPoints.refreshToken,
                    body: { refresh: refreshToken },
                    withoutAuth: true
                });
                token = response.token;
                // Actualizar token y refresh-token en global.user
                const user = this.globalStore.user();
                user.token = response.token;
                user['refresh-token'] = response['refresh-token'];
                this.globalStore.setUser(user); // Asume que existe setUser para actualizar el usuario
                // Actualizar en storage
                Helpers.setStorage('roadit_user', user);
            }
            return { Authorization: `Bearer ${token}` };
        }
        return {};
    }
    private async buildRequestOptions(options: ApiRequestOptions): Promise<{ headers: any; params: HttpParams; body: any; url: string }> {
        let { url, queryParams, formParams, fileParams, body, withoutAuth } = options;
        let headers: any = withoutAuth ? {} : await this.getHeader();
        let requestBody: any = body;

        // Substitute URL params from queryParams
        const subst = this.substituteUrlParams(url, queryParams);
        url = subst.url;
        queryParams = subst.remainingQueryParams;

        // Build full URL with baseUrl
        url = this.buildFullUrl(url);
        if (fileParams || formParams) {
            const formData = new FormData();
            this.objectToFormData(formParams, formData);
/*             if (formParams) {
                Object.entries(formParams).forEach(([key, value]) => formData.append(key, value));
            }
 */ 
           if (fileParams) {
                Object.entries(fileParams).forEach(([key, file]) => formData.append(key, file));
            }
            requestBody = formData;
            //if (headers['Content-Type']) delete headers['Content-Type'];
        } else if (body) {
            headers['Content-Type'] = 'application/json';
        }

        const params = this.buildHttpParams(queryParams);
        return { headers, params, body: requestBody, url };
    }

    // Substitute {key} in url with values from queryParams, return new url and remaining queryParams
    private substituteUrlParams(url: string, queryParams?: Record<string, any>): { url: string; remainingQueryParams: Record<string, any> } {
        if (!queryParams) return { url, remainingQueryParams: {} };
        let newUrl = url;
        const remainingQueryParams: Record<string, any> = { ...queryParams };
        Object.keys(queryParams).forEach((key) => {
            const regex = new RegExp(`{${key}}`, 'g');
            if (regex.test(newUrl)) {
                newUrl = newUrl.replace(regex, encodeURIComponent(queryParams[key]));
                delete remainingQueryParams[key];
            }
        });
        return { url: newUrl, remainingQueryParams };
    }

        /**
     * Convierte un objeto JavaScript complejo (con anidamiento, arrays y archivos)
     * en un objeto FormData, utilizando recursividad para aplanar la estructura.
     *
     * @param obj El objeto JavaScript a convertir.
     * @param [form] Objeto FormData existente (opcional).
     * @param [namespace] Clave base para la recursividad (opcional), usada para construir la notación de corchetes.
     * @returns El objeto FormData poblado.
     */
    objectToFormData(
    obj: any,
    form?: FormData,
    namespace?: string
    ): FormData {
    const fd = form || new FormData();
    let formKey: string;

    for (const property in obj) {
        // 1. Control de Propiedades
        // Ignorar propiedades heredadas, nulas o indefinidas.
        if (!Object.prototype.hasOwnProperty.call(obj, property) || obj[property] === undefined || obj[property] === null) {
        continue;
        }

        const value = obj[property];

        // 2. Construcción de la Clave
        // Usa notación de corchetes para anidamiento (Ej: 'config[activo]').
        if (namespace) {
        formKey = namespace + '[' + property + ']';
        } else {
        formKey = property;
        }

        // 3. Caso Base: Primitivos y Archivos
        if (value instanceof File || value instanceof Blob || typeof value !== 'object') {
        // Caso de archivo (File/Blob) o valor primitivo (string, number, boolean)
        // Se hace append directo con la clave construida (incluyendo anidamiento si existe).
        fd.append(formKey, value);

        } 
        // 4. Caso Recursivo: Array
        else if (Array.isArray(value)) {
        value.forEach((element: any, index: number) => {
            
            // Si el elemento del array es un objeto anidado (Ej: un array de productos)
            if (typeof element === 'object' && element !== null && !(element instanceof File) && !(element instanceof Blob)) {
                // Usa el índice en la clave para la recursión (Ej: 'detalles[0][id]')
                this.objectToFormData(element, fd, `${formKey}[${index}]`);
            } else {
                // Si el array contiene primitivos (Ej: un array de etiquetas ['a', 'b'])
                // Se usa '[]' al final para que el backend lo agrupe. (Ej: 'etiquetas[]')
                fd.append(`${formKey}[]`, element);
            }
        });
        }
        // 5. Caso Recursivo: Objeto Anidado
        else if (typeof value === 'object' && !(value instanceof File) && !(value instanceof Blob)) {
        // Llamada recursiva usando la clave actual como nuevo namespace
        // (Ej: 'config' se convierte en el namespace para los campos dentro de 'config')
        this.objectToFormData(value, fd, formKey);
        }
    }

    return fd;
    }
}