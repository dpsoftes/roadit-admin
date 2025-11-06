import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DpDatagridHeaderColumnComponent } from '../../columns';
import { TableColumn } from '../../dp-datagrid.interfaces';

@Component({
  selector: 'dp-datagrid-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCheckboxModule, DpDatagridHeaderColumnComponent],
  template: `
    <div class="dp-datagrid-header" [style.grid-template-columns]="gridTemplateColumns()">
      <!-- Selection checkbox column -->
      @if (selectable()) {
        <div class="header-checkbox-cell">
          <mat-checkbox
            [checked]="allSelected()"
            [indeterminate]="indeterminate()"
            (change)="onMasterToggle()">
          </mat-checkbox>
        </div>
      }

      <!-- Column headers -->
      @for (column of columns(); track column.key) {
        <dp-datagrid-header-column
          [column]="column"
          [sortDirection]="sortColumn() === column.key ? sortDirection() : null"
          (sort)="onSort($event)">
        </dp-datagrid-header-column>
      }
    </div>
  `,
  styles: [`
    .dp-datagrid-header {
      display: grid;
      background-color: #C1D2B1;
      border-radius: 16px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      font-weight: 600;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
      margin-bottom: 12px;
    }

    .header-checkbox-cell {
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
  `]
})
export class DpDatagridHeaderComponent {
  columns = input.required<TableColumn[]>();
  columnWidths = input.required<Map<string, string>>();
  selectable = input<boolean>(false);
  allSelected = input<boolean>(false);
  indeterminate = input<boolean>(false);
  sortColumn = input<string | null>(null);
  sortDirection = input<'asc' | 'desc' | null>(null);
  
  masterToggle = output<void>();
  sort = output<{ column: string; direction: 'asc' | 'desc' }>();

  gridTemplateColumns = computed(() => {
    const cols = this.columns();
    const widths = this.columnWidths();
    const checkboxCol = this.selectable() ? '60px ' : '';
    const columnWidths = cols.map(col => widths.get(col.key) || '1fr').join(' ');
    return checkboxCol + columnWidths;
  });

  onMasterToggle() {
    this.masterToggle.emit();
  }

  onSort(event: { column: string; direction: 'asc' | 'desc' }) {
    this.sort.emit(event);
  }
}
