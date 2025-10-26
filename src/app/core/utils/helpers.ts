/**
 * Servicio estático con métodos helper utilitarios
 * Para funciones comunes que no requieren inyección de dependencias
 */

import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarCustomComponent } from '../../components/snackbar-custom.component';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class Helpers {
  /**
   * Convierte un string base64 (dataURL) en un objeto File
   * @param base64 Cadena base64 tipo dataURL
   * @param filename Nombre del archivo resultante
   * @returns File
   */
  static base64ToFile(base64: string, filename: string): File {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  /**
   * Instancia singleton para acceso a dependencias
   */
  
  private snackBar: MatSnackBar;
  static Instance: Helpers;
  constructor(snackBar: MatSnackBar) {
    this.snackBar = snackBar;
    Helpers.Instance = this;
  }

  /**
   * Mostrar un mensaje tipo toast usando MatSnackBar
   * @param message Mensaje a mostrar
   * @param type Tipo de mensaje: 'OK' | 'ERROR' | 'ALERT'
   * @param duration Duración en ms (opcional)
   */
  showToast(message: string, type: 'OK' | 'ERROR' | 'ALERT', duration: number = 3000): void {
    this.snackBar.openFromComponent(SnackbarCustomComponent, {
      data: { message, type },
      duration
    });
  }

  /**
   * Valida un archivo según formato y tamaño máximopref
   * @param file Archivo a validar
   * @param allowedFormats Array de extensiones permitidas (ej: ["JPG", "PNG"])
   * @param maxKb Tamaño máximo en KB
   * @returns { valid: boolean, error?: string, base64?: string }
   */
  static async validateAndReadFile(file: File, allowedFormats: string[], maxKb: number): Promise<{ valid: boolean, error?: string, base64?: string }> {
    const ext = file.name.split('.').pop()?.toUpperCase() || '';
    if (!allowedFormats.includes(ext)) {
      return { valid: false, error: `Formato no permitido (${ext}). Permitidos: ${allowedFormats.join(', ')}` };
    }
    const sizeKb = file.size / 1024;
    if (sizeKb > maxKb) {
      return { valid: false, error: `El archivo supera el tamaño máximo de ${maxKb} KB` };
    }
    // Leer como base64
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve({ valid: true, base64 });
      };
      reader.onerror = () => {
        resolve({ valid: false, error: 'Error leyendo el archivo' });
      };
      reader.readAsDataURL(file);
    });
  }
  
  /**
   * Verificar si un valor está vacío (null, undefined, string vacío, array vacío, objeto vacío)
   */
  static isEmpty(value: any): boolean {
    if (value == null) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  }

  /**
   * Verificar si un valor NO está vacío
   */
  static isNotEmpty(value: any): boolean {
    return !this.isEmpty(value);
  }

  /**
   * Generar ID único
   */
  static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Formatear fecha a string legible
   */
  static formatDate(date: Date | string, locale: string = 'es-ES'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString(locale);
  }

  /**
   * Formatear fecha y hora a string legible
   */
  static formatDateTime(date: Date | string, locale: string = 'es-ES'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleString(locale);
  }

  /**
   * Capitalizar primera letra de string
   */
  static capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  /**
   * Convertir string a kebab-case
   */
  static toKebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase()
      .replace(/\s+/g, '-');
  }

  /**
   * Convertir string a camelCase
   */
  static toCamelCase(str: string): string {
    return str
      .replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '')
      .replace(/^[A-Z]/, char => char.toLowerCase());
  }

  /**
   * Clonar objeto profundamente
   */
  static deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
    if (obj instanceof Array) return obj.map(item => this.deepClone(item)) as unknown as T;
    if (typeof obj === 'object') {
      const copy = {} as T;
      Object.keys(obj).forEach(key => {
        (copy as any)[key] = this.deepClone((obj as any)[key]);
      });
      return copy;
    }
    return obj;
  }

  /**
   * Debounce function - retrasa la ejecución
   */
  static debounce<T extends (...args: any[]) => any>(
    func: T, 
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: number;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait) as any;
    };
  }

  /**
   * Throttle function - limita la frecuencia de ejecución
   */
  static throttle<T extends (...args: any[]) => any>(
    func: T, 
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Formatear número como moneda
   */
  static formatCurrency(
    amount: number, 
    currency: string = 'EUR', 
    locale: string = 'es-ES'
  ): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  /**
   * Validar email
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Obtener valor anidado de objeto usando path con puntos
   */
  static getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  /**
   * Establecer valor anidado en objeto usando path con puntos
   */
  static setNestedValue(obj: any, path: string, value: any): void {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    const target = keys.reduce((current, key) => {
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      return current[key];
    }, obj);
    target[lastKey] = value;
  }

  /**
   * Guardar valor en localStorage con conversión automática a JSON
   */
  static setStorage(key: string, value: any): void {
    try {
      const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Leer valor de localStorage con conversión automática desde JSON
   */
  static getStorage<T = any>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue ?? null;
      }

      // Intentar parsear como JSON, si falla devolver como string
      try {
        return JSON.parse(item) as T;
      } catch {
        // Si no es JSON válido, devolver como string
        return item as unknown as T;
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue ?? null;
    }
  }

  /**
   * Eliminar valor de localStorage
   */
  static removeStorage(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  /**
   * Verificar si una clave existe en localStorage
   */
  static hasStorage(key: string): boolean {
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error('Error checking localStorage:', error);
      return false;
    }
  }

  /**
   * Limpiar todo el localStorage
   */
  static clearStorage(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * Obtener todas las claves del localStorage
   */
  static getStorageKeys(): string[] {
    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error('Error getting localStorage keys:', error);
      return [];
    }
  }

  /**
   * Obtener el tamaño usado del localStorage en bytes (aproximado)
   */
  static getStorageSize(): number {
    try {
      let total = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
      return total;
    } catch (error) {
      console.error('Error calculating localStorage size:', error);
      return 0;
    }
  }

  /**
   * Detectar si estamos en modo desarrollo
   */
  static isDevelopment(): boolean {
    // Método 1: Verificar hostname
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
        return true;
      }
    }

    // Método 2: Verificar puerto de desarrollo
    if (typeof window !== 'undefined') {
      const port = window.location.port;
      const devPorts = ['4200', '3000', '8080', '5173', '3001', '8000'];
      if (devPorts.includes(port)) {
        return true;
      }
    }

    // Método 3: Verificar URL de desarrollo
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      if (url.includes('localhost') || url.includes('dev.') || url.includes('staging.')) {
        return true;
      }
    }

    // Método 4: Variable de entorno inyectada en build
    try {
      // @ts-ignore - process puede no estar disponible en el navegador
      if (typeof process !== 'undefined' && process.env && process.env['NODE_ENV'] === 'development') {
        return true;
      }
    } catch {
      // Ignorar error si process no está disponible
    }

    return false;
  }

  /**
   * Detectar si estamos en modo producción
   */
  static isProduction(): boolean {
    return !this.isDevelopment();
  }

  /**
   * Detectar si estamos en modo staging
   */
  static isStaging(): boolean {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      return url.includes('staging.') || url.includes('test.') || url.includes('pre.');
    }
    return false;
  }
  static toSrc(source: string | File | null, def: string = "assets/images/sample_user_icon.png"): string {
    if (!source) return def;
    if (typeof source === 'string') {
      if (source.startsWith('http') || source.startsWith('data:')) {
        return source;
      }else{
        return environment.apiUrl + source;
      }
    }
    if (source instanceof File) {
      const blobUrl = URL.createObjectURL(source);
      return blobUrl;
    }
    return def;
  }
  /**
   * Obtener el entorno actual
   */
  static getEnvironment(): 'development' | 'staging' | 'production' {
    if (this.isStaging()) return 'staging';
    if (this.isDevelopment()) return 'development';
    return 'production';
  }

  /**
   * Verificar si las DevTools están abiertas (solo funciona en algunos navegadores)
   */
  static areDevToolsOpen(): boolean {
    if (typeof window === 'undefined') return false;
    
    let devtools = { open: false };
    const threshold = 160;

    // Método para Chrome/Firefox
    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        devtools.open = true;
      } else {
        devtools.open = false;
      }
    }, 500);

    return devtools.open;
  }

  /**
   * Obtener información del build/entorno
   */
  static getBuildInfo(): {
    environment: string;
    timestamp: string;
    hostname: string;
    userAgent: string;
    isDevelopment: boolean;
    isProduction: boolean;
    isStaging: boolean;
  } {
    return {
      environment: this.getEnvironment(),
      timestamp: new Date().toISOString(),
      hostname: typeof window !== 'undefined' ? window.location.hostname : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      isDevelopment: this.isDevelopment(),
      isProduction: this.isProduction(),
      isStaging: this.isStaging()
    };
  }
}