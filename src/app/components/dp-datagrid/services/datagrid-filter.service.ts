import { Injectable, signal, Signal } from '@angular/core';

/**
 * Servicio de filtrado de datos
 * Responsabilidad única: Aplicar filtros a un dataset
 */
@Injectable({
  providedIn: 'root'
})
export class DatagridFilterService {
  private searchTerm = signal<string>('');
  private activeFilters = signal<{ [key: string]: any }>({});

  /**
   * Aplica filtros a los datos
   */
  applyFilters<T>(data: T[], searchTerm: string, filters: { [key: string]: any }): T[] {
    let filtered = [...data];

    // Aplicar búsqueda de texto
    if (searchTerm && searchTerm.trim().length > 0) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(item => {
        return Object.values(item as any).some(value => {
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(term);
        });
      });
    }

    // Aplicar filtros específicos
    Object.entries(filters).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        return; // Skip empty filters
      }

      filtered = filtered.filter(item => {
        const itemValue = (item as any)[key];

        // Handle array values (chip-array, chip-select)
        if (Array.isArray(value)) {
          if (value.length === 0) return true;
          
          // If item value is also array, check intersection
          if (Array.isArray(itemValue)) {
            return value.some(v => itemValue.includes(v));
          }
          
          // Otherwise check if item value is in the filter array
          return value.includes(itemValue);
        }

        // Handle date range
        if (typeof value === 'object' && (value.from || value.to || value.start || value.end)) {
          const from = value.from || value.start;
          const to = value.to || value.end;
          const itemDate = new Date(itemValue);
          
          if (from && to) {
            return itemDate >= new Date(from) && itemDate <= new Date(to);
          } else if (from) {
            return itemDate >= new Date(from);
          } else if (to) {
            return itemDate <= new Date(to);
          }
        }

        // Handle boolean
        if (typeof value === 'boolean') {
          return itemValue === value;
        }

        // Handle string/number exact match
        return itemValue === value;
      });
    });

    return filtered;
  }

  /**
   * Actualiza el término de búsqueda
   */
  setSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }

  /**
   * Actualiza los filtros activos
   */
  setActiveFilters(filters: { [key: string]: any }): void {
    this.activeFilters.set(filters);
  }

  /**
   * Actualiza un filtro específico
   */
  updateFilter(key: string, value: any): void {
    const current = { ...this.activeFilters() };
    if (value === null || value === undefined || value === '') {
      delete current[key];
    } else {
      current[key] = value;
    }
    this.activeFilters.set(current);
  }

  /**
   * Limpia todos los filtros
   */
  clearFilters(): void {
    this.activeFilters.set({});
    this.searchTerm.set('');
  }

  /**
   * Obtiene el término de búsqueda actual
   */
  getSearchTerm(): Signal<string> {
    return this.searchTerm.asReadonly();
  }

  /**
   * Obtiene los filtros activos
   */
  getActiveFilters(): Signal<{ [key: string]: any }> {
    return this.activeFilters.asReadonly();
  }
}
