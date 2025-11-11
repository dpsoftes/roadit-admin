import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dp-datagrid-filter-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dp-datagrid-filter-container-wrapper" [class.hidden]="!isVisible()">
      <div class="dp-datagrid-filter-container">
        <div class="filters-grid">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dp-datagrid-filter-container-wrapper {
      margin-top: 24px;

      &.hidden {
        display: none;
      }
    }

    .dp-datagrid-filter-container {
      margin: 0;

      .filters-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        padding: 0;
      }
    }
  `]
})
export class DpDatagridFilterContainerComponent {
  isVisible = input<boolean>(true);
}
