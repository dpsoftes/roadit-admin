import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../../../../dp-datagrid.interfaces';

/**
 * Componente atómico para celdas de texto
 * Responsabilidad única: Renderizar texto simple con control de overflow
 */
@Component({
  selector: 'dp-text-cell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-cell" [title]="value">
      {{ value }}
    </div>
  `,
  styles: [`
    .text-cell {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      min-width: 0;
    }
  `]
})
export class TextCellComponent {
  @Input() value: any;
  @Input() column!: TableColumn;
}
