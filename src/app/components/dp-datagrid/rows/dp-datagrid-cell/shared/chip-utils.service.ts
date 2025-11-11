import { Injectable, inject } from '@angular/core';
import { ChipValue } from '../../../dp-datagrid.interfaces';
import { I18nService } from '@i18n/i18n.service';

/**
 * SERVICIO COMPARTIDO PARA LOGICA DE COLORES DE CHIPS
 * RESPONSABILIDAD UNICA: MANEJO DE COLORES Y ESTILOS DE CHIPS
 *
 * SOPORTE MULTIIDIOMA: AHORA MANEJA TAGS CON ESTRUCTURA { name: { es: '...', en: '...' } }
 */
@Injectable({
  providedIn: 'root'
})
export class ChipUtilsService {
  //INYECTAR SERVICIO DE I18N PARA OBTENER IDIOMA ACTUAL
  private i18n = inject(I18nService);

  /**
   * CALCULA EL COLOR DE TEXTO CON MEJOR CONTRASTE PARA UN COLOR DE FONDO DADO
   * USA EL ALGORITMO YIQ PARA DETERMINAR LUMINOSIDAD
   */
  getContrastColor(hexColor: string): string {
    //REMOVER # SI EXISTE
    const hex = hexColor.replace('#', '');

    //CONVERTIR A RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    //CALCULAR LUMINOSIDAD (YIQ)
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    //RETORNAR BLANCO O NEGRO SEGUN LUMINOSIDAD
    return yiq >= 128 ? '#000000' : '#ffffff';
  }

  /**
   * OBTIENE EL VALOR DE DISPLAY DE UN CHIP (STRING O CHIPVALUE)
   *
   * SOPORTA MULTIPLES ESTRUCTURAS:
   * 1. { value: '...', label: '...' } - Formato estandar del sandbox
   * 2. { name: { es: '...', en: '...' } } - Formato del proyecto con multiidioma
   * 3. String simple
   */
  getChipDisplayValue(value: string | ChipValue | any): string {
    if (typeof value === 'string') {
      return value;
    }

    if (value && typeof value === 'object') {
      //CASO 1: TIENE LABEL (FORMATO ESTANDAR DEL SANDBOX)
      if ('label' in value && value.label) {
        return value.label;
      }

      //CASO 2: TIENE NAME CON MULTIIDIOMA (FORMATO DEL PROYECTO)
      if ('name' in value && typeof value.name === 'object') {
        const currentLanguage = this.i18n.currentLanguage() as 'es' | 'en';
        return value.name[currentLanguage] || value.name.es || value.name.en || '';
      }

      //CASO 3: TIENE NAME COMO STRING
      if ('name' in value && typeof value.name === 'string') {
        return value.name;
      }

      //FALLBACK: SI SOLO TIENE VALUE SIN LABEL, USAR EL VALUE
      if ('value' in value) {
        return String(value.value);
      }
    }

    return '';
  }

  /**
   * OBTIENE EL COLOR DE FONDO DE UN CHIP
   * AÑADE EL # SI NO LO TIENE
   */
  getChipBackgroundColor(value: string | ChipValue | any): string {
    if (typeof value === 'object' && value.color) {
      //AÑADIR # SI NO LO TIENE
      const color = value.color;
      return color.startsWith('#') ? color : `#${color}`;
    }
    //SI NO TIENE COLOR, USAR BLANCO
    return '#ffffff';
  }

  /**
   * OBTIENE EL BORDE DE UN CHIP
   */
  getChipBorder(value: string | ChipValue | any): string {
    //SI TIENE COLOR DEFINIDO, NO MOSTRAR BORDE
    if (typeof value === 'object' && value.color) {
      return 'none';
    }
    //SI NO TIENE COLOR, MOSTRAR BORDE GRIS CLARO
    return '1px solid #dadce0';
  }

  /**
   * OBTIENE EL COLOR DE TEXTO DE UN CHIP
   */
  getChipTextColor(value: string | ChipValue | any): string {
    const bgColor = this.getChipBackgroundColor(value);
    if (bgColor && bgColor !== '#ffffff') {
      return this.getContrastColor(bgColor);
    }
    //PARA CHIPS SIN COLOR (FONDO BLANCO), USAR TEXTO NEGRO
    return '#000000';
  }

  /**
   * PROCESA UN ARRAY DE VALORES DE CHIPS
   */
  getChipArrayValues(value: any): (string | ChipValue | any)[] {
    return Array.isArray(value) ? value : [];
  }
}
