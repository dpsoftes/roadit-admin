import { Component, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBase } from '../../shared/filter-base';
import { FilterOption } from '../../../../dp-datagrid.interfaces';

/**
 * Componente atómico para filtro de chips (selección única)
 * Responsabilidad única: Botones de chip con selección única
 */
@Component({
  selector: 'dp-chips-filter',
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
            [class.selected]="selectedValue() === option.value"
            (click)="selectValue(option.value)">
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
export class ChipsFilterComponent extends FilterBase {
  options = input.required<FilterOption[]>();
  selectedValue = signal<string | null>(null);
  valueInput = input<string | null>(null);

  ngOnInit() {
    this.selectedValue.set(this.valueInput() ?? null);
  }

  ngOnChanges() {
    if (this.selectedValue() !== this.valueInput()) {
      this.selectedValue.set(this.valueInput() ?? null);
    }
  }

  /**
   * Método público para actualizar el valor programáticamente
   */
  setValue(newValue: string | null): void {
    this.selectedValue.set(newValue ?? null);
  }

  selectValue(value: string): void {
    // Toggle: si ya está seleccionado, deseleccionar
    const newValue = this.selectedValue() === value ? null : value;
    this.selectedValue.set(newValue);
    this.emitFilterChange(newValue);
  }
}
