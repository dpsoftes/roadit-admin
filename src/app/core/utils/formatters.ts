export class Formatters {
  /**
   * Formats a number as currency in EUR
   */
  static currency(value: number, locale: string = 'es-ES'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  }
  
  /**
   * Formats a date in Spanish format
   */
  static date(value: Date, locale: string = 'es-ES'): string {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(value);
  }
  
  /**
   * Formats a date and time in Spanish format
   */
  static datetime(value: Date, locale: string = 'es-ES'): string {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(value);
  }
  
  /**
   * Formats a number with thousands separator
   */
  static number(value: number, locale: string = 'es-ES'): string {
    return new Intl.NumberFormat(locale).format(value);
  }
  
  /**
   * Formats a percentage
   */
  static percentage(value: number, locale: string = 'es-ES', decimals: number = 1): string {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value / 100);
  }
  
  /**
   * Truncates text and adds ellipsis
   */
  static truncate(text: string, maxLength: number = 50): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  }
  
  /**
   * Capitalizes first letter of each word
   */
  static titleCase(text: string): string {
    return text.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }
}