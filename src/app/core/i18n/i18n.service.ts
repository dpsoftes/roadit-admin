import { Injectable, signal } from '@angular/core';

// Importar directamente las traducciones
import esTranslations from '../../../assets/i18n/es.json';
import enTranslations from '../../../assets/i18n/en.json';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private translations = {
    es: esTranslations,
    en: enTranslations
  };
  
  currentLanguage = signal<'es' | 'en'>('es');

  constructor() {
    // Ya no necesitamos cargar nada
  }

  translate(key: string, params?: Record<string, any>): string {
    const keys = key.split('.');
    let value: any = this.translations[this.currentLanguage()];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value !== 'string') {
      return key;
    }
    
    if (params) {
      return Object.keys(params).reduce((text, param) => 
        text.replace(`{{${param}}}`, params[param]), value
      );
    }
    
    return value;
  }

  setLanguage(lang: 'es' | 'en') {
    this.currentLanguage.set(lang);
  }
}