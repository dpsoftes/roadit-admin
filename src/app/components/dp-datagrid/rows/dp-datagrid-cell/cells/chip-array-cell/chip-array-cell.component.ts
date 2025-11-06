import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipUtilsService } from '../../shared/chip-utils.service';
import { TableColumn, ChipValue } from '../../../../dp-datagrid.interfaces';

/**
 * Componente atómico para celdas de array de chips
 * Responsabilidad única: Renderizar múltiples chips con color y contraste automático
 * Usa HTML puro en lugar de mat-chip
 */
@Component({
  selector: 'dp-chip-array-cell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chip-array-cell">
      @for (chip of chipValues; track $index) {
        <span 
          class="custom-chip"
          [style.background-color]="getBackgroundColor(chip)"
          [style.color]="getTextColor(chip)"
          [style.border]="getBorder(chip)">
          {{ getDisplayValue(chip) }}
        </span>
      }
    </div>
  `,
  styles: [`
    .chip-array-cell {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
      min-width: 0;
      overflow: hidden;
      align-items: inherit;
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
      width: fit-content;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
      flex-shrink: 0;
    }
  `]
})
export class ChipArrayCellComponent {
  @Input() value: any;
  @Input() column!: TableColumn;

  private chipUtils = inject(ChipUtilsService);

  get chipValues(): (string | ChipValue)[] {
    return this.chipUtils.getChipArrayValues(this.value);
  }

  getDisplayValue(chip: string | ChipValue): string {
    return this.chipUtils.getChipDisplayValue(chip);
  }

  getBackgroundColor(chip: string | ChipValue): string {
    return this.chipUtils.getChipBackgroundColor(chip);
  }

  getTextColor(chip: string | ChipValue): string {
    return this.chipUtils.getChipTextColor(chip);
  }

  getBorder(chip: string | ChipValue): string {
    return this.chipUtils.getChipBorder(chip);
  }
}
