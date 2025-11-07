import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableColumn } from '../../../../dp-datagrid.interfaces';

/**
 * Componente atómico para celdas de acciones
 * Responsabilidad única: Renderizar botones de acción con íconos
 */
@Component({
  selector: 'dp-actions-cell',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    <div class="actions-cell">
      @for (action of actions; track action.label) {
        <button 
          mat-icon-button
          [matTooltip]="action.label"
          [disabled]="action.disabled || false"
          (click)="onActionClick(action, $event)">
          <mat-icon>{{ action.icon }}</mat-icon>
        </button>
      }
    </div>
  `,
  styles: [`
    .actions-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      width: 100%;
      min-width: 0;
      flex-shrink: 0;
    }
    button {
      width: 32px;
      height: 32px;
      flex-shrink: 0;
      
      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    }
  `]
})
export class ActionsCellComponent {
  @Input() value: any;
  @Input() column!: TableColumn;
  @Input() rowData: any;
  @Output() actionClick = new EventEmitter<{ action: any; rowData: any; event: MouseEvent }>();

  get actions(): any[] {
    return this.column.actionConfig?.actions || [];
  }

  onActionClick(action: any, event: MouseEvent): void {
    event.stopPropagation();
    this.actionClick.emit({
      action,
      rowData: this.rowData,
      event
    });
  }
}
