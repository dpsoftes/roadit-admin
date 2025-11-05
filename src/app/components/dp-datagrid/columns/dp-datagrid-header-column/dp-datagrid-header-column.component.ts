import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TableColumn } from '../../dp-datagrid.interfaces';

@Component({
  selector: 'dp-datagrid-header-column',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div 
      class="dp-datagrid-header-column"
      [class.sortable]="column().sortable"
      [attr.data-color]="column().headerColor"
      [style.text-align]="column().align || 'left'"
      [style.justify-content]="column().align === 'center' ? 'center' : column().align === 'right' ? 'flex-end' : 'flex-start'"
      [style.background-color]="column().headerBackground"
      [style.color]="column().headerColor"
      [style.font-size]="column().headerFontSize"
      [style.font-weight]="column().headerFontWeight"
      [style.font-family]="column().headerFontFamily"
      (click)="onSort()">
      
      <span class="header-label" [style.color]="column().headerColor">{{ column().label }}</span>
      
      @if (column().sortable) {
        <mat-icon class="sort-icon" [style.color]="column().headerColor">
          @if (sortDirection() === 'asc') {
            arrow_upward
          } @else if (sortDirection() === 'desc') {
            arrow_downward
          } @else {
            unfold_more
          }
        </mat-icon>
      }
    </div>
  `,
  styles: [`
    .dp-datagrid-header-column {
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 52px;
      box-sizing: border-box;
      overflow: hidden;
      min-width: 0;
      transition: filter 0.2s ease;
    }
    
    .dp-datagrid-header-column.sortable {
      cursor: pointer;
      user-select: none;
    }
    
    .dp-datagrid-header-column.sortable:hover {
      filter: brightness(0.9);
    }
    
    .dp-datagrid-header-column .header-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
    }
    
    .dp-datagrid-header-column .sort-icon {
      font-size: 18px !important;
      width: 18px !important;
      height: 18px !important;
      flex-shrink: 0;
    }
  `]
})
export class DpDatagridHeaderColumnComponent {
  column = input.required<TableColumn>();
  sortDirection = input<'asc' | 'desc' | null>(null);
  sort = output<{ column: string; direction: 'asc' | 'desc' }>();

  onSort() {
    if (!this.column().sortable) return;
    
    const currentDirection = this.sortDirection();
    const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
    
    this.sort.emit({
      column: this.column().key,
      direction: newDirection
    });
  }

  getColumnWidth(): string {
    const col = this.column();
    if (col.width) {
      return typeof col.width === 'number' ? `${col.width}px` : col.width;
    }
    return 'auto';
  }

  getColumnMinWidth(): string {
    const col = this.column();
    if (col.minWidth) {
      return typeof col.minWidth === 'number' ? `${col.minWidth}px` : col.minWidth;
    }
    return '100px';
  }

  getColumnFlex(): string {
    const col = this.column();
    if (col.flex) {
      return typeof col.flex === 'number' ? `${col.flex}` : col.flex;
    }
    // Si no tiene width ni flex definidos, usar flex 1
    if (!col.width) {
      return '1 1 0';
    }
    return '0 0 auto';
  }

  getWidth(): string {
    const width = this.column().width;
    if (!width) return 'auto';
    return typeof width === 'number' ? `${width}px` : width;
  }

  getMinWidth(): string | undefined {
    const minWidth = this.column().minWidth;
    if (!minWidth) return '100px'; // Valor mínimo por defecto
    return typeof minWidth === 'number' ? `${minWidth}px` : minWidth;
  }

  getMaxWidth(): string | undefined {
    const maxWidth = this.column().maxWidth;
    if (!maxWidth) return undefined;
    return typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
  }

  getFlex(): string | undefined {
    const flex = this.column().flex;
    // Si no hay flex ni width definidos, usar flex 1 para distribuir espacio
    if (!flex && !this.column().width) return '1';
    if (!flex) return undefined;
    return typeof flex === 'number' ? `${flex}` : flex;
  }
}
