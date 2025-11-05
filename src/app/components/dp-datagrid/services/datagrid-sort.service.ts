import { Injectable, signal, Signal } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | null;

/**
 * Servicio de ordenamiento
 * Responsabilidad única: Gestionar ordenamiento de datos
 */
@Injectable({
  providedIn: 'root'
})
export class DatagridSortService {
  private sortColumn = signal<string | null>(null);
  private sortDirection = signal<SortDirection>(null);

  /**
   * Ordena los datos según la columna y dirección especificadas
   */
  sort<T>(data: T[], column: string | null, direction: SortDirection): T[] {
    if (!column || !direction) {
      return data;
    }

    const sorted = [...data].sort((a, b) => {
      const aValue = (a as any)[column];
      const bValue = (b as any)[column];

      // Handle null/undefined values
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      // Handle numbers
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Handle dates
      const aDate = new Date(aValue);
      const bDate = new Date(bValue);
      if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
        return direction === 'asc' 
          ? aDate.getTime() - bDate.getTime() 
          : bDate.getTime() - aDate.getTime();
      }

      // Handle strings (case-insensitive)
      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();
      
      if (direction === 'asc') {
        return aString.localeCompare(bString);
      } else {
        return bString.localeCompare(aString);
      }
    });

    return sorted;
  }

  /**
   * Actualiza el ordenamiento
   */
  setSort(column: string, direction: SortDirection): void {
    this.sortColumn.set(column);
    this.sortDirection.set(direction);
  }

  /**
   * Alterna la dirección de ordenamiento para una columna
   */
  toggleSort(column: string): SortDirection {
    const currentColumn = this.sortColumn();
    const currentDirection = this.sortDirection();

    let newDirection: SortDirection;

    if (currentColumn === column) {
      // Same column, cycle through: asc -> desc -> null
      if (currentDirection === 'asc') {
        newDirection = 'desc';
      } else if (currentDirection === 'desc') {
        newDirection = null;
      } else {
        newDirection = 'asc';
      }
    } else {
      // New column, start with asc
      newDirection = 'asc';
    }

    if (newDirection === null) {
      this.sortColumn.set(null);
      this.sortDirection.set(null);
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set(newDirection);
    }

    return newDirection;
  }

  /**
   * Limpia el ordenamiento
   */
  clearSort(): void {
    this.sortColumn.set(null);
    this.sortDirection.set(null);
  }

  /**
   * Obtiene la columna de ordenamiento actual
   */
  getSortColumn(): Signal<string | null> {
    return this.sortColumn.asReadonly();
  }

  /**
   * Obtiene la dirección de ordenamiento actual
   */
  getSortDirection(): Signal<SortDirection> {
    return this.sortDirection.asReadonly();
  }

  /**
   * Verifica si una columna está siendo ordenada
   */
  isSortedBy(column: string): boolean {
    return this.sortColumn() === column;
  }

  /**
   * Obtiene la dirección de ordenamiento para una columna específica
   */
  getDirectionFor(column: string): SortDirection {
    return this.isSortedBy(column) ? this.sortDirection() : null;
  }

  /**
   * Resetea el ordenamiento
   */
  reset(): void {
    this.clearSort();
  }
}
