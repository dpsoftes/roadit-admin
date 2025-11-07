import { Injectable, signal, Signal } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

/**
 * Servicio de selección de filas
 * Responsabilidad única: Gestionar selección múltiple de items
 */
@Injectable({
  providedIn: 'root'
})
export class DatagridSelectionService<T = any> {
  private selection = new SelectionModel<T>(true, []);
  private isAllSelected = signal<boolean>(false);

  /**
   * Selecciona un item
   */
  select(item: T): void {
    this.selection.select(item);
    this.updateAllSelectedState();
  }

  /**
   * Deselecciona un item
   */
  deselect(item: T): void {
    this.selection.deselect(item);
    this.updateAllSelectedState();
  }

  /**
   * Alterna la selección de un item
   */
  toggle(item: T): void {
    this.selection.toggle(item);
    this.updateAllSelectedState();
  }

  /**
   * Verifica si un item está seleccionado
   */
  isSelected(item: T): boolean {
    return this.selection.isSelected(item);
  }

  /**
   * Selecciona todos los items de una página
   */
  selectAll(items: T[]): void {
    items.forEach(item => this.selection.select(item));
    this.updateAllSelectedState();
  }

  /**
   * Deselecciona todos los items
   */
  clearSelection(): void {
    this.selection.clear();
    this.isAllSelected.set(false);
  }

  /**
   * Alterna la selección de todos los items de una página
   */
  toggleAll(items: T[]): void {
    const allSelected = this.areAllSelected(items);
    
    if (allSelected) {
      // Deselect all items from current page
      items.forEach(item => this.selection.deselect(item));
    } else {
      // Select all items from current page
      items.forEach(item => this.selection.select(item));
    }
    
    this.updateAllSelectedState();
  }

  /**
   * Verifica si todos los items de una página están seleccionados
   */
  areAllSelected(items: T[]): boolean {
    if (items.length === 0) return false;
    return items.every(item => this.selection.isSelected(item));
  }

  /**
   * Verifica si algunos (pero no todos) items están seleccionados
   */
  isSomeSelected(items: T[]): boolean {
    const selectedCount = items.filter(item => this.selection.isSelected(item)).length;
    return selectedCount > 0 && selectedCount < items.length;
  }

  /**
   * Obtiene los items seleccionados
   */
  getSelected(): T[] {
    return this.selection.selected;
  }

  /**
   * Obtiene el número de items seleccionados
   */
  getSelectedCount(): number {
    return this.selection.selected.length;
  }

  /**
   * Verifica si hay items seleccionados
   */
  hasSelection(): boolean {
    return !this.selection.isEmpty();
  }

  /**
   * Obtiene el modelo de selección (para uso avanzado)
   */
  getSelectionModel(): SelectionModel<T> {
    return this.selection;
  }

  /**
   * Actualiza el estado de "todos seleccionados"
   */
  private updateAllSelectedState(): void {
    // This could be enhanced to track page-specific selection
    this.isAllSelected.set(this.selection.selected.length > 0);
  }

  /**
   * Obtiene el signal de "todos seleccionados"
   */
  getIsAllSelected(): Signal<boolean> {
    return this.isAllSelected.asReadonly();
  }

  /**
   * Resetea la selección
   */
  reset(): void {
    this.clearSelection();
  }
}
