// Este es el environment por defecto (development)
import { Environment } from './environment.interface';

export const environment: Environment = {
  production: false,
  development: true,
  environment: 'development',
  
  apiUrl: 'https://roadit-api.bluumi.net',
  apiVersion: 'v1',
  baseUrl: 'http://localhost:3000',
  
  auth: {
    tokenKey: 'roadit_admin_token_dev',
    tokenExpirationKey: 'roadit_admin_token_exp_dev',
    refreshTokenKey: 'roadit_admin_refresh_token_dev',
    sessionTimeout: 480
  },
  
  logging: {
    level: 'debug',
    enableConsole: true,
    enableRemote: false
  },
  
  cache: {
    enableLocalStorage: true,
    enableSessionStorage: true,
    defaultTtl: 60
  },
  
  features: {
    enableDebugTools: true,
    enableMockData: true,
    enableAnalytics: false,
    enableErrorReporting: false
  },
  
  app: {
    name: 'RoadIt Admin',
    version: '1.0.0',
    defaultLanguage: 'es',
    supportedLanguages: ['es', 'en']
  }
};