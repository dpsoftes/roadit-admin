import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
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
  ImageConfig 
} from './dynamic-table.interfaces';

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
  @Input() config!: TableConfig;
  @Output() tableEvent = new EventEmitter<TableEvent>();

  displayedColumns: string[] = [];
  selection = new SelectionModel<any>(true, []);
  showFilters = signal(false);
  searchTerm = signal('');
  filters = signal<{[key: string]: string}>({});

  ngOnInit() {
    this.initializeColumns();
  }

  private initializeColumns() {
    const columnKeys = this.config.columns.map(col => col.key);
    
    if (this.config.selectable) {
      this.displayedColumns = ['select', ...columnKeys];
    } else {
      this.displayedColumns = columnKeys;
    }
  }

  // Selection methods
  isAllSelected(): boolean {
    const selected = this.selection.selected.length;
    const total = this.config.data.length;
    return selected === total && total > 0;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.config.data);
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
  onActionClick(action: string, row: any) {
    this.emitEvent('action', { action, row });
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
    this.emitEvent('filter', { filters: this.filters() });
  }

  // Search methods
  onSearchChange(searchTerm: string) {
    this.searchTerm.set(searchTerm);
    this.emitEvent('search', { searchTerm });
  }

  // Pagination methods
  onPageChange(event: any) {
    this.emitEvent('page', { 
      page: event.pageIndex, 
      pageSize: event.pageSize 
    });
  }

  // Cell rendering methods
  getCellValue(row: any, column: TableColumn): any {
    return this.getNestedValue(row, column.key);
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  getChipClass(chipConfig: ChipConfig | {}, value: any): string {
    if ('type' in chipConfig && chipConfig.type === 'custom' && chipConfig.customClass) {
      return chipConfig.customClass;
    }
    if ('type' in chipConfig) {
      return `${chipConfig.type}-chip ${value?.toString().toLowerCase()}`;
    }
    return `chip ${value?.toString().toLowerCase()}`;
  }

  getChipText(chipConfig: ChipConfig | {}, value: any): string {
    if ('translateKey' in chipConfig && chipConfig.translateKey) {
      return `${chipConfig.translateKey}.${value}`;
    }
    return value;
  }

  shouldShowAction(action: ActionButton, row: any): boolean {
    return !action.condition || action.condition(row);
  }

  getActionButtonClass(color?: string): string {
    const baseClass = 'action-button';
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

  // Create action
  onCreateClick() {
    if (this.config.actions?.create?.action) {
      this.config.actions.create.action();
    }
    this.emitEvent('action', { action: 'create' });
  }

  // Export CSV action
  onExportCSV() {
    this.emitEvent('export', { data: this.config.data });
  }

  private emitEvent(type: TableEvent['type'], data?: any) {
    this.tableEvent.emit({ type, data });
  }
}
