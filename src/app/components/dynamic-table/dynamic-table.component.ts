import { Component, Input, Output, EventEmitter, OnInit, signal, input } from '@angular/core';
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
import { environment } from 'src/environments/environment';
import { Helpers } from '@utils/helpers';

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
export class DynamicTableComponent implements OnInit {
  config= input.required<TableConfig>();
  @Output() tableEvent = new EventEmitter<TableEvent>();

  displayedColumns: string[] = [];
  selection = new SelectionModel<any>(true, []);
  showFilters = signal(false);
  searchTerm = signal('');
  filters = signal<{[key: string]: string | string[]}>({});
  page = signal(0);
  pageSize = signal(10);
      
  ngOnInit() {
    this.initializeColumns();
  }

  hasFixedWidthColumns(): boolean {
    return this.config().columns.some(column => 
      column.width || column.minWidth || column.maxWidth || column.flex
    );
  }

  private initializeColumns() {
    const columnKeys = this.config().columns.map(col => col.key);
    
    if (this.config().selectable) {
      this.displayedColumns = ['select', ...columnKeys];
    } else {
      this.displayedColumns = columnKeys;
    }
  }

  // Selection methods
  isAllSelected(): boolean {
    const selected = this.selection.selected.length;
    const total = this.config().data.length;
    return selected === total && total > 0;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.config().data());
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
    if(column.type === 'image'){
      return this.getImageUrl(column, row);
    }
    if(column.render){
      return column.render(column, row);
    }
    return this.getNestedValue(row, column.key);
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

  getChipText(chipConfig: ChipConfig | {}, value: any): string {
    if ('translateKey' in chipConfig && chipConfig.translateKey) {
      return `${chipConfig.translateKey}.${value}`;
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

    const data = this.config().data;
    const exportConfig = this.config().exportConfig;

    if (!data || data.length === 0) {
      alert('No hay datos para exportar');
      return;
    }

    const { columns, headers, filename } = exportConfig!

    let csvContent = headers.join(',') + '\n';
    
    data().forEach(item => {
      const row = columns.map(column => {
        let value = item[column] || '';
        if (Array.isArray(value)) {
          value = value.join('; ');
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
    this.emitEvent('export', { data: this.config().data, filename });
  }

  private emitEvent(type: TableEvent['type'], data?: any) {
    this.tableEvent.emit({ type, data });
  }
}
