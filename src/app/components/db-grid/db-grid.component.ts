import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  contentChildren,
  inject,
  input,
  Input,
  output,
  signal
} from '@angular/core';
import { DbGridColumnComponent } from './db-grid-column/db-grid-column.component';
import {
  GridColumn,
  GridPageChangeEvent,
  GridPaginationInfo,
  GridRowSelectEvent
} from './db-grid.interfaces';
import { GridFormatterService } from './grid-formatter.service';

@Component({
  selector: 'db-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './db-grid.component.html',
  styleUrl: './db-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DbGridComponent implements OnInit {

  // Servicios inyectados
  private formatter = inject(GridFormatterService);

  // Propiedades de entrada
  dataSource = input<any[]>([]);
  rows = input<number>(20);
  rowHeight = input<string>('32px');
  rowFontSize = input<string>('14px');
  totalRows = input<number>(0);
  currentPage = input<number>(1);
  hasFooter = input<boolean>(true);

  // Eventos de salida
  onRowSelected = output<GridRowSelectEvent>();
  onPageChange = output<GridPageChangeEvent>();

  // Columnas definidas mediante content projection
  columns = contentChildren(DbGridColumnComponent);

  // Estado interno
  selectedRowIndex = signal<number>(-1);

  // Computed properties
  displayedData = computed(() => {
    const data = this.dataSource();
    const pageSize = this.rows();
    const page = this.currentPage();

    // Si hay totalRows definido, asumimos paginación servidor
    // Si no, hacemos paginación cliente
    if (this.totalRows() > 0) {
      return data; // Los datos ya vienen paginados del servidor
    } else {
      // Paginación en cliente
      const startIndex = (page - 1) * pageSize;
      return data.slice(startIndex, startIndex + pageSize);
    }
  });

  paginationInfo = computed((): GridPaginationInfo => {
    const totalRows = this.totalRows() || this.dataSource().length;
    const pageSize = this.rows();
    const currentPage = this.currentPage();
    const totalPages = Math.ceil(totalRows / pageSize);
    const startRow = (currentPage - 1) * pageSize + 1;
    const endRow = Math.min(startRow + pageSize - 1, totalRows);

    return {
      currentPage,
      totalPages,
      totalRows,
      startRow,
      endRow,
      hasNext: currentPage < totalPages,
      hasPrevious: currentPage > 1
    };
  });

  visiblePages = computed(() => {
    const info = this.paginationInfo();
    const current = info.currentPage;
    const total = info.totalPages;
    const pages: (number | string)[] = [];

    if (total <= 7) {
      // Si hay 7 o menos páginas, mostrar todas
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Lógica compleja: atrás, 2 atrás, actual, 2 adelante, puntos, última
      pages.push(1); // Primera página

      if (current > 4) {
        pages.push('...');
      }

      // Páginas alrededor de la actual
      const start = Math.max(2, current - 2);
      const end = Math.min(total - 1, current + 2);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 3) {
        pages.push('...');
      }

      if (total > 1) {
        pages.push(total); // Última página
      }
    }

    return pages;
  });

  ngOnInit() {
    // Configuración inicial si es necesaria
  }

  /**
   * Obtiene el valor formateado de una celda
   */
  getCellValue(item: any, column: GridColumn): string {
    const rawValue = this.getRawCellValue(item, column.field);
    return this.formatter.formatValue(rawValue, column.format);
  }

  /**
   * Obtiene el contenido de una celda (puede ser HTML personalizado o valor formateado)
   */
  getCellContent(item: any, column: DbGridColumnComponent, rowIndex: number, columnIndex: number): string {
    const field = column.field();
    const rawValue = this.getRawCellValue(item, field);

    // Intentar obtener contenido personalizado
    const customContent = column.executeRender(item, rawValue, rowIndex, columnIndex);

    // Si hay contenido personalizado, usarlo, si no, usar el valor formateado
    if (customContent !== null && customContent !== undefined) {
      return customContent;
    }

    // Valor formateado normal
    return this.formatter.formatValue(rawValue, column.format());
  }

  /**
   * Obtiene el valor raw de una celda
   */
  getRawCellValue(item: any, field: string): any {
    return field.split('.').reduce((obj, prop) => obj?.[prop], item);
  }

  /**
   * Maneja el click en una fila
   */
  onRowClick(item: any, index: number) {
    this.selectedRowIndex.set(index);
    this.onRowSelected.emit({ item, index });
  }

  /**
   * Maneja el click en un header
   */
  onHeaderClick(column: DbGridColumnComponent, columnIndex: number) {
    column.emitHeaderClick(columnIndex);
  }

  /**
   * Maneja el click en una celda
   */
  onCellClick(item: any, column: DbGridColumnComponent, rowIndex: number, columnIndex: number) {
    const field = column.field();
    const value = this.getRawCellValue(item, field);
    column.emitCellClick(item, value, rowIndex, columnIndex);
  }

  /**
   * Cambia a una página específica
   */
  goToPage(page: number) {
    if (page !== this.currentPage() && page >= 1 && page <= this.paginationInfo().totalPages) {
      const previousPage = this.currentPage();
      this.onPageChange.emit({ page, previousPage });
    }
  }

  /**
   * Va a la página anterior
   */
  previousPage() {
    const info = this.paginationInfo();
    if (info.hasPrevious) {
      this.goToPage(info.currentPage - 1);
    }
  }

  /**
   * Va a la página siguiente
   */
  nextPage() {
    const info = this.paginationInfo();
    if (info.hasNext) {
      this.goToPage(info.currentPage + 1);
    }
  }

  /**
   * Obtiene las clases CSS para el alineamiento
   */
  getAlignClass(align: string): string {
    return `text-align-${align.toLowerCase()}`;
  }

  /**
   * Obtiene la configuración de las columnas
   */
  getColumnsConfig(): GridColumn[] {
    return this.columns().map(col => col.getColumnConfig());
  }
}