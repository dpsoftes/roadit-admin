import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Environment } from '../../../environments/environment.interface';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  
  private _currentEnvironment: Environment = environment;

  constructor() {
    // El environment ya está definido en tiempo de compilación
    console.log(`🚀 App iniciada en modo: ${this._currentEnvironment.environment}`);
  }

  /**
   * Obtener la configuración del environment actual
   */
  get environment(): Environment {
    return this._currentEnvironment;
  }

  /**
   * Verificar si estamos en desarrollo
   */
  get isDevelopment(): boolean {
    return this._currentEnvironment.development;
  }

  /**
   * Verificar si estamos en producción
   */
  get isProduction(): boolean {
    return this._currentEnvironment.production;
  }

  /**
   * Obtener la URL base de la API
   */
  get apiUrl(): string {
    return `${this._currentEnvironment.apiUrl}/${this._currentEnvironment.apiVersion}`;
  }

  /**
   * Obtener la URL base de la aplicación
   */
  get baseUrl(): string {
    return this._currentEnvironment.baseUrl;
  }

  /**
   * Obtener configuración de autenticación
   */
  get authConfig() {
    return this._currentEnvironment.auth;
  }

  /**
   * Obtener configuración de logging
   */
  get loggingConfig() {
    return this._currentEnvironment.logging;
  }

  /**
   * Obtener configuración de cache
   */
  get cacheConfig() {
    return this._currentEnvironment.cache;
  }

  /**
   * Obtener configuración de características
   */
  get featuresConfig() {
    return this._currentEnvironment.features;
  }

  /**
   * Obtener configuración de la app
   */
  get appConfig() {
    return this._currentEnvironment.app;
  }

  /**
   * Verificar si una característica está habilitada
   */
  isFeatureEnabled(feature: keyof Environment['features']): boolean {
    return this._currentEnvironment.features[feature];
  }

  /**
   * Obtener información completa del environment (para debugging)
   */
  getEnvironmentInfo() {
    return {
      current: this._currentEnvironment.environment,
      hostname: typeof window !== 'undefined' ? window.location.hostname : 'unknown',
      config: this._currentEnvironment
    };
  }
}