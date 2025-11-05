import { Injectable } from '@angular/core';
import { ChipValue } from '../../../dp-datagrid.interfaces';

/**
 * Servicio compartido para lógica de colores de chips
 * Responsabilidad única: Manejo de colores y estilos de chips
 */
@Injectable({
  providedIn: 'root'
})
export class ChipUtilsService {
  /**
   * Calcula el color de texto con mejor contraste para un color de fondo dado
   * Usa el algoritmo YIQ para determinar luminosidad
   */
  getContrastColor(hexColor: string): string {
    // Remover # si existe
    const hex = hexColor.replace('#', '');
    
    // Convertir a RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calcular luminosidad (YIQ)
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    
    // Retornar blanco o negro según luminosidad
    return yiq >= 128 ? '#000000' : '#ffffff';
  }

  /**
   * Obtiene el valor de display de un chip (string o ChipValue)
   * Si es un objeto ChipValue, retorna el label (lo que se muestra)
   * Si es un string, retorna el string directamente
   */
  getChipDisplayValue(value: string | ChipValue): string {
    if (typeof value === 'string') {
      return value;
    }
    if (value && typeof value === 'object') {
      // Si tiene label, usarlo (es lo que se muestra visualmente)
      if ('label' in value && value.label) {
        return value.label;
      }
      // Fallback: si solo tiene value sin label, usar el value
      if ('value' in value) {
        return String(value.value);
      }
    }
    return '';
  }

  /**
   * Obtiene el color de fondo de un chip
   */
  getChipBackgroundColor(value: string | ChipValue): string {
    if (typeof value === 'object' && value.color) {
      return value.color;
    }
    // Si no tiene color, usar blanco
    return '#ffffff';
  }

  /**
   * Obtiene el borde de un chip
   */
  getChipBorder(value: string | ChipValue): string {
    // Si tiene color definido, no mostrar borde
    if (typeof value === 'object' && value.color) {
      return 'none';
    }
    // Si no tiene color, mostrar borde gris claro
    return '1px solid #dadce0';
  }

  /**
   * Obtiene el color de texto de un chip
   */
  getChipTextColor(value: string | ChipValue): string {
    const bgColor = this.getChipBackgroundColor(value);
    if (bgColor && bgColor !== '#ffffff') {
      return this.getContrastColor(bgColor);
    }
    // Para chips sin color (fondo blanco), usar texto negro
    return '#000000';
  }

  /**
   * Procesa un array de valores de chips
   */
  getChipArrayValues(value: any): (string | ChipValue)[] {
    return Array.isArray(value) ? value : [];
  }
}
