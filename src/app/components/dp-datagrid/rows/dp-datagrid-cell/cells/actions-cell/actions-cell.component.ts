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
    <div class="actions-cell" [style.--actions-count]="actions.length">
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
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 4px !important;
      width: 100% !important;
      min-width: 0 !important;
      flex-wrap: nowrap !important;
      box-sizing: border-box !important;
    }
    .actions-cell button {
      width: calc((100% - (var(--actions-count, 1) - 1) * 4px) / var(--actions-count, 1)) !important;
      min-width: 24px !important;
      max-width: 32px !important;
      height: 28px !important;
      flex-shrink: 1 !important;
      flex-grow: 0 !important;
      flex-basis: auto !important;
      padding: 0 !important;
      margin: 0 !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
      
      mat-icon {
        font-size: 16px !important;
        width: 16px !important;
        height: 16px !important;
        line-height: 16px !important;
        display: inline-block !important;
      }
    }
    @media (max-width: 600px) {
      .actions-cell button {
        min-width: 20px !important;
        max-width: 28px !important;
        height: 24px !important;
        
        mat-icon {
          font-size: 14px !important;
          width: 14px !important;
          height: 14px !important;
        }
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
