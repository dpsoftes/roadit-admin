// Configuración base común para todos los entornos
export const baseEnvironment = {
  appName: 'RoadIt Admin',
  version: '1.0.0',
  defaultLanguage: 'es',
  supportedLanguages: ['es', 'en']
};

// Interfaz para tipado de environment
export interface Environment {
  production: boolean;
  development: boolean;
  environment: 'development' | 'production';
  
  // URLs de API
  apiUrl: string;
  apiVersion: string;
  baseUrl: string;
  
  // Configuración de autenticación
  auth: {
    tokenKey: string;
    tokenExpirationKey: string;
    refreshTokenKey: string;
    sessionTimeout: number; // en minutos
  };
  
  // Configuración de logging
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    enableConsole: boolean;
    enableRemote: boolean;
    remoteUrl?: string;
  };
  
  // Configuración de cache
  cache: {
    enableLocalStorage: boolean;
    enableSessionStorage: boolean;
    defaultTtl: number; // en minutos
  };
  
  // Configuración de características
  features: {
    enableDebugTools: boolean;
    enableMockData: boolean;
    enableAnalytics: boolean;
    enableErrorReporting: boolean;
  };
  
  // Configuración de la app
  app: {
    name: string;
    version: string;
    defaultLanguage: string;
    supportedLanguages: string[];
  };
}