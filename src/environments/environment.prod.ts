// Este es el environment de producción
import { Environment } from './environment.interface';

export const environment: Environment = {
  production: true,
  development: false,
  environment: 'production',
  
  apiUrl: 'https://roadit-api.bluumi.net/',
  apiVersion: 'v1',
  baseUrl: 'https://admin.roadit.com',
  
  auth: {
    tokenKey: 'roadit_admin_token',
    tokenExpirationKey: 'roadit_admin_token_exp',
    refreshTokenKey: 'roadit_admin_refresh_token',
    sessionTimeout: 240
  },
  
  logging: {
    level: 'error',
    enableConsole: false,
    enableRemote: true,
    remoteUrl: 'https://logs.roadit.com/api/logs'
  },
  
  cache: {
    enableLocalStorage: true,
    enableSessionStorage: true,
    defaultTtl: 120
  },
  
  features: {
    enableDebugTools: false,
    enableMockData: false,
    enableAnalytics: true,
    enableErrorReporting: true
  },
  
  app: {
    name: 'RoadIt Admin',
    version: '1.0.0',
    defaultLanguage: 'es',
    supportedLanguages: ['es', 'en']
  }
};