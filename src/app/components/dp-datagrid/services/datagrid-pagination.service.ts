import { Injectable, signal, Signal } from '@angular/core';

/**
 * Servicio de paginación
 * Responsabilidad única: Gestionar estado y lógica de paginación
 */
@Injectable({
  providedIn: 'root'
})
export class DatagridPaginationService {
  private currentPage = signal<number>(0);
  private pageSize = signal<number>(10);

  /**
   * Aplica paginación a los datos
   */
  paginate<T>(data: T[], page: number, size: number): T[] {
    const start = page * size;
    const end = start + size;
    return data.slice(start, end);
  }

  /**
   * Calcula el índice de inicio para la página actual
   */
  getStartIndex(page: number, size: number): number {
    return page * size;
  }

  /**
   * Calcula el índice de fin para la página actual
   */
  getEndIndex(page: number, size: number, totalItems: number): number {
    return Math.min((page + 1) * size, totalItems);
  }

  /**
   * Calcula el número total de páginas
   */
  getTotalPages(totalItems: number, size: number): number {
    return Math.ceil(totalItems / size);
  }

  /**
   * Actualiza la página actual
   */
  setCurrentPage(page: number): void {
    this.currentPage.set(page);
  }

  /**
   * Actualiza el tamaño de página
   */
  setPageSize(size: number): void {
    this.pageSize.set(size);
    // Reset to first page when changing page size
    this.currentPage.set(0);
  }

  /**
   * Obtiene la página actual
   */
  getCurrentPage(): Signal<number> {
    return this.currentPage.asReadonly();
  }

  /**
   * Obtiene el tamaño de página
   */
  getPageSize(): Signal<number> {
    return this.pageSize.asReadonly();
  }

  /**
   * Navega a la siguiente página
   */
  nextPage(totalPages: number): void {
    const current = this.currentPage();
    if (current < totalPages - 1) {
      this.currentPage.set(current + 1);
    }
  }

  /**
   * Navega a la página anterior
   */
  previousPage(): void {
    const current = this.currentPage();
    if (current > 0) {
      this.currentPage.set(current - 1);
    }
  }

  /**
   * Va a la primera página
   */
  firstPage(): void {
    this.currentPage.set(0);
  }

  /**
   * Va a la última página
   */
  lastPage(totalPages: number): void {
    this.currentPage.set(Math.max(0, totalPages - 1));
  }

  /**
   * Resetea la paginación
   */
  reset(): void {
    this.currentPage.set(0);
    this.pageSize.set(10);
  }
}
