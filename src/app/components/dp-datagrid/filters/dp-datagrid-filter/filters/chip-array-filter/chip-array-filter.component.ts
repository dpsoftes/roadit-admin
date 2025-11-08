import { Component, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBase } from '../../shared/filter-base';
import { FilterOptionChipArray } from '../../../../dp-datagrid.interfaces';

/**
 * Componente atómico para filtro de chip-array (selección múltiple)
 * Responsabilidad única: Botones de chip con selección múltiple
 */
@Component({
  selector: 'dp-chip-array-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="filter-field" [style.width]="getWidth()">
      <label class="filter-label">{{ label() }}</label>
      <div class="chip-select-wrapper">
        @for (option of options(); track option.value) {
          <button
            type="button"
            class="chip-button"
            [class.selected]="selectedValues().includes(option.value)"
            (click)="toggleValue(option.value)">
            {{ option.label }}
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .filter-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .filter-label {
      font-size: 12px;
      font-weight: 500;
      color: #666;
    }

    .chip-select-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .chip-button {
      padding: 6px 16px;
      border: 1px solid #ddd;
      border-radius: 16px;
      background-color: white;
      color: #666;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;
      outline: none;
    }

    .chip-button:hover {
      border-color: #1976d2;
      color: #1976d2;
    }

    .chip-button.selected {
      background-color: #1976d2;
      border-color: #1976d2;
      color: white;
    }
  `]
})
export class ChipArrayFilterComponent extends FilterBase {
  options = input.required<FilterOptionChipArray[]>();
  selectedValues = signal<string[]>([]);
  valueInput = input<string[] | null>(null);

  ngOnInit() {
    this.selectedValues.set(this.valueInput() ?? []);
  }

  ngOnChanges() {
    if (JSON.stringify(this.selectedValues()) !== JSON.stringify(this.valueInput())) {
      this.selectedValues.set(this.valueInput() ?? []);
    }
  }

  /**
   * Método público para actualizar el valor programáticamente
   */
  setValue(newValue: string[] | null): void {
    this.selectedValues.set(newValue ?? []);
  }

  toggleValue(value: string): void {
    const current = this.selectedValues();
    const index = current.indexOf(value);

    let newValues: string[];
    if (index > -1) {
      newValues = current.filter(v => v !== value);
    } else {
      newValues = [...current, value];
    }

    this.selectedValues.set(newValues);
    this.emitFilterChange(newValues);
  }
}
