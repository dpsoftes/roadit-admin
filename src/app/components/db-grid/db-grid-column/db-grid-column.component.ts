import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { GridAlign, GridCellClickEvent, GridFormat, GridHeaderClickEvent, GridRenderFunction } from '../db-grid.interfaces';

@Component({
  selector: 'db-grid-column',
  standalone: true,
  template: '', // Este componente no renderiza nada, solo define configuración
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DbGridColumnComponent {
  // Propiedades de configuración de la columna
  field = input.required<string>();
  width = input<string>('auto');
  header = input.required<string>();
  format = input<GridFormat>('STRING');
  align = input<GridAlign>('LEFT');

  // Función de renderizado personalizada
  onRender = input<GridRenderFunction | undefined>(undefined);

  // Eventos de la columna
  onHeaderClick = output<GridHeaderClickEvent>();
  onCellClick = output<GridCellClickEvent>();

  /**
   * Obtiene la configuración de la columna
   */
  getColumnConfig() {
    return {
      field: this.field(),
      width: this.width(),
      header: this.header(),
      format: this.format(),
      align: this.align()
    };
  }

  /**
   * Emite evento de click en header
   */
  emitHeaderClick(columnIndex: number) {
    this.onHeaderClick.emit({
      columnIndex,
      field: this.field(),
      column: this.getColumnConfig()
    });
  }

  /**
   * Emite evento de click en celda
   */
  emitCellClick(item: any, value: any, rowIndex: number, columnIndex: number) {
    this.onCellClick.emit({
      item,
      value,
      field: this.field(),
      column: this.getColumnConfig(),
      rowIndex,
      columnIndex
    });
  }

  /**
   * Ejecuta la función de render personalizado para la celda
   */
  executeRender(item: any, value: any, rowIndex: number, columnIndex: number): string | null {
    const renderFn = this.onRender();
    if (renderFn) {
      return renderFn({
        item,
        value,
        field: this.field(),
        rowIndex,
        columnIndex
      });
    }
    return null;
  }
}