import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DpDatagridCellComponent } from '../dp-datagrid-cell';
import { TableColumn } from '../../dp-datagrid.interfaces';

@Component({
  selector: 'dp-datagrid-row',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, DpDatagridCellComponent],
  template: `
    <div 
      class="dp-datagrid-row"
      [class.selected]="isSelected()"
      [class.hoverable]="hoverable()"
      [style.grid-template-columns]="gridTemplateColumns()">
      
      <!-- Selection checkbox cell -->
      @if (selectable()) {
        <div class="row-checkbox-cell">
          <mat-checkbox
            [checked]="isSelected()"
            (change)="onToggleSelection()">
          </mat-checkbox>
        </div>
      }

      <!-- Data cells -->
      @for (column of columns(); track column.key) {
        <dp-datagrid-cell
          [column]="column"
          [rowData]="rowData()"
          [onCellClick]="onCellClick()"
          [onCellRender]="onCellRender()">
        </dp-datagrid-cell>
      }
    </div>
  `,
  styles: [`
    .dp-datagrid-row {
      display: grid;
      background-color: #ffffff;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
      margin-bottom: 8px;
      font-size: 13px;
      
      &.hoverable:hover {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      }
      
      &.selected {
        background-color: #e3f2fd;
        box-shadow: 0 2px 6px rgba(33, 150, 243, 0.3);
      }
    }

    .row-checkbox-cell {
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
  `]
})
export class DpDatagridRowComponent {
  columns = input.required<TableColumn[]>();
  columnWidths = input.required<Map<string, string>>();
  rowData = input.required<any>();
  isSelected = input<boolean>(false);
  hoverable = input<boolean>(true);
  selectable = input<boolean>(false);
  onCellClick = input<(columnKey: string, row: any) => void>();
  onCellRender = input<(columnKey: string, row: any) => void>();
  
  toggleSelection = output<void>();

  gridTemplateColumns = computed(() => {
    const cols = this.columns();
    const widths = this.columnWidths();
    const checkboxCol = this.selectable() ? '60px ' : '';
    const columnWidths = cols.map(col => widths.get(col.key) || '1fr').join(' ');
    return checkboxCol + columnWidths;
  });

  onToggleSelection() {
    this.toggleSelection.emit();
  }
}
