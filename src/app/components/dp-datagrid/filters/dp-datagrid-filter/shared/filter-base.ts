import { Directive, input, output } from '@angular/core';
import { FilterConfig } from '../../../dp-datagrid.interfaces';

/**
 * Clase base abstracta para todos los filtros
 * Responsabilidad única: Proveer estructura y comportamiento común
 */
@Directive()
export abstract class FilterBase {
  // Inputs comunes
  config = input.required<FilterConfig>();
  label = input.required<string>();
  
  // Output común
  filterChange = output<{ key: string; value: any }>();

  /**
   * Emite el evento de cambio de filtro
   */
  protected emitFilterChange(value: any): void {
    const config = this.config();
    this.filterChange.emit({
      key: config.key,
      value: value
    });
  }

  /**
   * Obtiene el ancho del filtro
   */
  getWidth(): string {
    const config = this.config();
    return config.width ? `${config.width}px` : '200px';
  }

  /**
   * Obtiene el texto de opción vacía
   */
  getEmptyOptionText(): string {
    const config = this.config();
    return config.emptyOption || 'Seleccione una opción';
  }
}
