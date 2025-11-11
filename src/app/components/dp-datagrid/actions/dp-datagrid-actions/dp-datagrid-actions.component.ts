import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dp-datagrid-actions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dp-datagrid-actions">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .dp-datagrid-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }
  `]
})
export class DpDatagridActionsComponent {}
