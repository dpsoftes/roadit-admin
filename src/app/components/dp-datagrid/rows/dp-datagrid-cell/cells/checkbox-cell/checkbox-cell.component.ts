import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TableColumn } from '../../../../dp-datagrid.interfaces';

/**
 * Componente atómico para celdas de checkbox
 * Responsabilidad única: Renderizar checkbox con manejo de eventos
 */
@Component({
  selector: 'dp-checkbox-cell',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule],
  template: `
    <div class="checkbox-cell">
      <mat-checkbox
        [checked]="isChecked"
        (change)="onCheckboxChange($event)">
      </mat-checkbox>
    </div>
  `,
  styles: [`
    .checkbox-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-width: 0;
    }
  `]
})
export class CheckboxCellComponent {
  @Input() value: any;
  @Input() column!: TableColumn;
  @Input() rowData: any;
  @Output() checkboxChange = new EventEmitter<{ checked: boolean; rowData: any }>();

  get isChecked(): boolean {
    return !!this.value;
  }

  onCheckboxChange(event: any): void {
    this.checkboxChange.emit({
      checked: event.checked,
      rowData: this.rowData
    });
  }
}
