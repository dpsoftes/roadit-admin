import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, signal, input, ViewChild, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { RouterModule } from '@angular/router';
import {
  TableConfig,
  TableColumn,
  TableEvent,
  ActionButton,
  ChipConfig,
  ImageConfig,
  ExportConfig
} from './dynamic-table.interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { Helpers } from '@utils/helpers';
import { GlobalStore } from '@store/global.state';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatPaginatorModule,
    TranslatePipe,
    RouterModule
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss'
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
  config = input.required<TableConfig>();
  @Output() tableEvent = new EventEmitter<TableEvent>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private globalStore = inject(GlobalStore);

  // Signals para el estado del componente
  displayedColumns = signal<string[]>([]);
  selection = new SelectionModel<any>(true, []);
  showFilters = signal(false);
  searchTerm = signal('');
  filters = signal<{ [key: string]: string | string[] | boolean }>({});
  page = signal(0);
  pageSize = signal(5);

  paginatedData = computed(() => {
    const data = this.config().data();
    if (!data || !Array.isArray(data)) {
      return [];
    }
    const pageIndex = this.page();
    const size = this.pageSize();
    const startIndex = pageIndex * size;
    const endIndex = startIndex + size;
    return data.slice(startIndex, endIndex);
  });

  ngOnInit() {
    this.initializeColumns();
  }

  ngAfterViewInit() {
    // ESTABLECER EL PAGESIZE DESPUÉS DE QUE LA VISTA SE INICIALICE
    const configPageSize = this.config().pageSize;
    if (this.paginator && configPageSize !== undefined) {
      this.pageSize.set(configPageSize);
      this.paginator.pageSize = configPageSize;
    }
  }

  hasFixedWidthColumns(): boolean {
    return this.config().columns.some(column =>
      column.width || column.minWidth || column.maxWidth || column.flex
    );
  }

  private initializeColumns() {
    const columnKeys = this.config().columns.map(col => col.key);

    if (this.config().selectable) {
      this.displayedColumns.set(['select', ...columnKeys]);
    } else {
      this.displayedColumns.set(columnKeys);
    }
  }

  // Selection methods
  isAllSelected(): boolean {
    const data = this.config().data();
    if (!data || !Array.isArray(data)) {
      return false;
    }
    const selected = this.selection.selected.length;
    const total = data.length;
    return selected === total && total > 0;
  }

  masterToggle(): void {
    const data = this.config().data();
    if (!data || !Array.isArray(data)) {
      return;
    }
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...data);
    }
    this.emitEvent('select', { selected: this.selection.selected });
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id ?? ''}`;
  }

  // Action methods
  onActionClick(action: string, row: any, actionButton: ActionButton): void {
    if (actionButton.onClick) {
      actionButton.onClick(row);
      return;
    }
    this.emitEvent('action', { action, row });
  }


  // Métodos para filtros de chips

  getChipFilterValues(filterKey: string): string[] {
    const value = this.filters()[filterKey];
    return Array.isArray(value) ? value : [];
  }

  getChipFilterLabel(filter: any, value: string): string {
    const option = filter.options?.find((opt: any) => opt.value === value);
    return option ? option.label : value;
  }

  removeChipFilter(filterKey: string, valueToRemove: string) {
    const currentValues = this.getChipFilterValues(filterKey);
    const newValues = currentValues.filter(value => value !== valueToRemove);
    this.onChipFilterChange(filterKey, newValues);
  }

  // Método para obtener estilos de ancho de filtros
  getFilterStyles(filter: any): string {
    if (!filter.width) return '';
    return `width: ${filter.width}%`;
  }


  // Filter methods
  toggleFilters(): void {
    this.showFilters.update(show => !show);
  }

  onFilterChange(filterKey: string, value: string) {
    this.filters.update(filters => ({
      ...filters,
      [filterKey]: value
    }));
    this.emit('filter');
  }

  onCheckboxFilterChange(filterKey: string, checked: boolean) {
    this.filters.update(filters => ({
      ...filters,
      [filterKey]: checked
    }));
    this.emit('filter');
  }

  onChipFilterChange(filterKey: string, values: string[]) {
    this.filters.update(filters => ({
      ...filters,
      [filterKey]: values
    }));
    this.emit('filter');
  }

  // Search methods
  onSearchChange(searchTerm: string) {
    this.searchTerm.set(searchTerm);
    this.emit('search')
  }

  // Pagination methods
  onPageChange(event: any) {
    this.page.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.emitEvent('page');
  }

  emit(type: TableEvent['type']) {
    this.emitEvent(type, {
      page: this.page(),
      pageSize: this.pageSize(),
      filters: this.filters(),
      searchTerm: this.searchTerm()
    });
  }
  // Cell rendering methods
  getCellValue(row: any, column: TableColumn): any {
    if (column.type === 'image') {
      return this.getImageUrl(column, row);
    }
    if (column.render) {
      return column.render(column, row);
    }
    const value = this.getNestedValue(row, column.key);
    // Si el valor es null o undefined, retornar string vacío o el valor según el tipo
    if (value === null || value === undefined) {
      return column.type === 'chip-array' ? [] : '';
    }
    return value;
  }
  private getImageUrl(column: TableColumn, row: any): string {
    var url = row[column.key] as string;
    if (!url) {
      return environment.images?.defaultAvatar || 'assets/images/sample_user_icon.png';
    }
    return Helpers.toUrl(url);
  }
  private getNestedValue(obj: any, path: string): any {
    if (typeof path !== 'string') {
      return obj[path];
    }
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  getChipClass(chipConfig: ChipConfig | {}, value: any): string {
    if ('type' in chipConfig && chipConfig.type === 'custom' && chipConfig.customClass) {
      return chipConfig.customClass;
    }
    if ('type' in chipConfig && chipConfig.type === 'tags') {
      return `tags-chip ${value?.toString().toLowerCase()}`;
    }
    if ('type' in chipConfig) {
      return `${chipConfig.type}-chip ${value?.toString().toLowerCase()}`;
    }
    if (value === 'nuevo' || value === 'en_riesgo' || value === 'seguro_propio') {
      return `tag-${value?.toString().toLowerCase()}`;
    }
    return `chip ${value?.toString().toLowerCase()}`;
  }

  //METODO CORREGIDO PARA EL COMPONENTE dynamic-table.component.ts
  //REEMPLAZAR EL METODO getChipText EXISTENTE CON ESTE:

  getChipText(chipConfig: ChipConfig | {}, value: any): string {
    if ('translateKey' in chipConfig && chipConfig.translateKey) {
      return `${chipConfig.translateKey}.${value}`;
    }

    //SI EL VALOR ES UN NUMERO Y EL chipConfig ES TIPO 'tags', BUSCAR EL TAG POR ID
    if (typeof value === 'number' && 'type' in chipConfig && chipConfig.type === 'tags') {
      const tag = this.globalStore.tags().find(t => t.id === value);

      if (tag) {
        //OBTENER EL IDIOMA ACTUAL DEL GLOBALSTORE
        const currentLanguage = this.globalStore.language() as 'es' | 'en';

        //SI LA TAG TIENE EL METODO getName (ES INSTANCIA DE TagDto)
        if (typeof tag.getName === 'function') {
          return tag.getName(currentLanguage);
        }

        //SI tag.name ES UN OBJETO CON TRADUCCIONES
        if (tag.name && typeof tag.name === 'object' && !Array.isArray(tag.name)) {
          return tag.name[currentLanguage] || tag.name.es || '';
        }

        //SI tag.name ES UN STRING DIRECTO (FALLBACK PARA ESTRUCTURA ANTIGUA)
        if (typeof tag.name === 'string') {
          return tag.name;
        }
      }

      return value.toString();
    }

    //SI EL VALOR ES UN OBJETO, EXTRAER EL CAMPO name O username
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      //OBTENER EL IDIOMA ACTUAL DEL GLOBALSTORE
      const currentLanguage = this.globalStore.language() as 'es' | 'en';

      //SI EL OBJETO TIENE getName COMO FUNCION
      if (typeof value.getName === 'function') {
        return value.getName(currentLanguage);
      }

      //SI value.name ES UN OBJETO CON TRADUCCIONES
      if (value.name && typeof value.name === 'object' && !Array.isArray(value.name)) {
        return value.name[currentLanguage] || value.name.es || '';
      }

      //SI value.name ES UN STRING DIRECTO
      if (typeof value.name === 'string') {
        return value.name;
      }

      //OTROS CAMPOS COMUNES
      return value.username || value.label || JSON.stringify(value);
    }

    const tagLabels: { [key: string]: string } = {
      'nuevo': 'Nuevo',
      'en_riesgo': 'En Riesgo',
      'seguro_propio': 'Seguro Propio'
    };

    return tagLabels[value] || value;
  }

  shouldShowAction(action: ActionButton, row: any): boolean {
    return !action.condition || action.condition(row);
  }

  getActionButtonClass(color?: string, hasIcon?: boolean): string {
    const baseClass = hasIcon ? 'action-button' : 'action-text-button';
    if (!color) return baseClass;

    switch (color) {
      case 'primary':
        return `${baseClass} action-primary`;
      case 'accent':
        return `${baseClass} action-accent`;
      case 'warn':
        return `${baseClass} action-warn`;
      case 'error':
        return `${baseClass} action-error`;
      default:
        return baseClass;
    }
  }

  getColumnStyles(column: TableColumn): string {
    const styles: string[] = [];

    if (column.width || column.minWidth || column.maxWidth || column.flex) {
      if (column.width) {
        let width: string;
        if (typeof column.width === 'number') {
          width = `${column.width}%`;
        } else {
          width = column.width;
        }
        styles.push(`width: ${width}`);
      }

      if (column.minWidth) {
        const minWidth = typeof column.minWidth === 'number' ? `${column.minWidth}px` : column.minWidth;
        styles.push(`min-width: ${minWidth}`);
      }

      if (column.maxWidth) {
        const maxWidth = typeof column.maxWidth === 'number' ? `${column.maxWidth}px` : column.maxWidth;
        styles.push(`max-width: ${maxWidth}`);
      }

      if (column.flex) {
        const flex = typeof column.flex === 'number' ? column.flex.toString() : column.flex;
        styles.push(`flex: ${flex}`);
      }

      // AÑADIR ALINEACIÓN
      if (column.align) {
        styles.push(`text-align: ${column.align}`);
      }

      return styles.join('; ');
    }

    return '';
  }

  getCellClass(column: TableColumn): string {
    const classes: string[] = [];

    switch (column.type) {
      case 'text':
        classes.push('text-cell');
        break;
      case 'actions':
        classes.push('actions-cell');
        break;
      case 'chip':
      case 'chip-array':
        classes.push('chip-cell');
        break;
    }

    return classes.join(' ');
  }

  getDataLength(): number {
    const data = this.config().data();
    return data && Array.isArray(data) ? data.length : 0;
  }

  onCreateClick() {
    if (this.config().actions?.create?.action) {
      this.config().actions!.create!.action!();
    }
    this.emitEvent('action', { action: 'create' });
  }

  onExportCSV() {
    if (!this.config().exportConfig) {
      console.warn('No export configuration provided');
      return;
    }

    const data = this.config().data();
    const exportConfig = this.config().exportConfig;

    if (!data || !Array.isArray(data) || data.length === 0) {
      alert('No hay datos para exportar');
      return;
    }

    const { columns, headers, filename } = exportConfig!

    let csvContent = headers.join(',') + '\n';

    data.forEach((item: any) => {
      const row = columns.map(column => {
        let value = item[column] || '';
        if (Array.isArray(value)) {
          // Si el array contiene objetos, extraer el campo name o username
          if (value.length > 0 && typeof value[0] === 'object') {
            value = value.map((v: any) => v?.name || v?.username || v?.label || JSON.stringify(v)).join('; ');
          } else if (value.length > 0 && typeof value[0] === 'number') {
            // Si el array contiene números y estamos exportando tags, mapear IDs a nombres
            if (column === 'tags') {
              value = value.map((id: number) => {
                const tag = this.globalStore.tags().find(t => t.id === id);
                return tag?.name || id.toString();
              }).join('; ');
            } else {
              value = value.join('; ');
            }
          } else {
            value = value.join('; ');
          }
        }
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          value = '"' + value.replace(/"/g, '""') + '"';
        }
        return value;
      });
      csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Emitir evento para notificar que la exportación se completó
    this.emitEvent('export', { data, filename });
  }

  private emitEvent(type: TableEvent['type'], data?: any) {
    this.tableEvent.emit({ type, data });
  }
}
