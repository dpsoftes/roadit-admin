/**
 * Servicio para formatear valores en el grid
 */

import { Injectable } from '@angular/core';
import { GridFormat } from './db-grid.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GridFormatterService {

  /**
   * Formatea un valor según el tipo especificado
   */
  formatValue(value: any, format: GridFormat): string {
    if (value === null || value === undefined) {
      return '';
    }

    switch (format) {
      case 'DATE':
        return this.formatDate(value);
      
      case 'DATETIME':
        return this.formatDateTime(value);
      
      case 'N0':
        return this.formatNumber(value, 0);
      
      case 'N1':
        return this.formatNumber(value, 1);
      
      case 'N2':
        return this.formatNumber(value, 2);

      case 'N.0':
        return this.formatNumberWithThousands(value, 0);

      case 'N.1':
        return this.formatNumberWithThousands(value, 1);

      case 'N.2':
        return this.formatNumberWithThousands(value, 2);

      case 'CHECK':
        return this.formatBoolean(value);      case 'STRING':
      default:
        return this.formatString(value);
    }
  }

  /**
   * Formatea fecha en formato dd-mm-yyyy
   */
  private formatDate(value: any): string {
    const date = this.parseDate(value);
    if (!date || isNaN(date.getTime())) {
      return '';
    }
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  }

  /**
   * Formatea fecha y hora en formato dd-mm-yyyy hh:mm
   */
  private formatDateTime(value: any): string {
    const date = this.parseDate(value);
    if (!date || isNaN(date.getTime())) {
      return '';
    }
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  /**
   * Formatea números con decimales específicos
   */
  private formatNumber(value: any, decimals: number): string {
    const num = parseFloat(value);
    if (isNaN(num)) {
      return '';
    }
    
    return num.toFixed(decimals);
  }

  /**
   * Formatea número con separador de miles y decimales específicos
   * @param value Valor a formatear
   * @param decimals Número de decimales
   */
  private formatNumberWithThousands(value: any, decimals: number): string {
    if (value === null || value === undefined) {
      return '';
    }

    const num = Number(value);
    if (isNaN(num)) {
      return '';
    }

    return num.toLocaleString('es-ES', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  /**
   * Formatea valores booleanos como checkbox
   */
  private formatBoolean(value: any): string {
    const isTrue = value === true || value === 'true' || value === 1 || value === '1';
    return isTrue ? '✓' : '';
  }

  /**
   * Formatea como string
   */
  private formatString(value: any): string {
    return String(value);
  }

  /**
   * Parsea diferentes tipos de fecha
   */
  private parseDate(value: any): Date | null {
    if (value instanceof Date) {
      return value;
    }
    
    if (typeof value === 'string' || typeof value === 'number') {
      const date = new Date(value);
      return isNaN(date.getTime()) ? null : date;
    }
    
    return null;
  }
}