import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipUtilsService } from '../../shared/chip-utils.service';
import { TableColumn, ChipValue } from '../../../../dp-datagrid.interfaces';

/**
 * Componente atómico para celdas de chip único
 * Responsabilidad única: Renderizar un chip con color y contraste automático
 * Usa HTML puro en lugar de mat-chip
 */
@Component({
  selector: 'dp-chip-cell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chip-cell">
      <span 
        class="custom-chip"
        [style.background-color]="backgroundColor"
        [style.color]="textColor"
        [style.border]="border">
        {{ displayValue }}
      </span>
    </div>
  `,
  styles: [`
    .chip-cell {
      display: flex;
      align-items: center;
      justify-content: inherit;
      padding: 0 8px;
      width: 100%;
      min-width: 0;
    }
    
    .custom-chip {
      display: inline-flex;
      align-items: center;
      height: 26px;
      padding: 0 10px;
      font-size: 12px;
      border-radius: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      box-sizing: border-box;
    }
  `]
})
export class ChipCellComponent {
  @Input() value!: string | ChipValue;
  @Input() column!: TableColumn;

  private chipUtils = inject(ChipUtilsService);

  get displayValue(): string {
    return this.chipUtils.getChipDisplayValue(this.value);
  }

  get backgroundColor(): string {
    return this.chipUtils.getChipBackgroundColor(this.value);
  }

  get textColor(): string {
    return this.chipUtils.getChipTextColor(this.value);
  }

  get border(): string {
    return this.chipUtils.getChipBorder(this.value);
  }
}
