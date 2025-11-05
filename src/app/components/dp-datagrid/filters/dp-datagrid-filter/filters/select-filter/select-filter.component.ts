import { Component, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FilterBase } from '../../shared/filter-base';
import { FilterOption } from '../../../../dp-datagrid.interfaces';

/**
 * Componente atómico para filtro de select
 * Responsabilidad única: Dropdown simple de selección
 */
@Component({
  selector: 'dp-select-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  template: `
    <div class="filter-field" [style.width]="getWidth()">
      <label class="filter-label">{{ label() }}</label>
      <div class="select-wrapper">
        <select 
          class="filter-select"
          [(ngModel)]="value"
          (ngModelChange)="onValueChange($event)">
          <option value="">{{ getEmptyOptionText() }}</option>
          @for (option of options(); track option.value) {
            <option [value]="option.value">{{ option.label }}</option>
          }
        </select>
        <mat-icon class="select-arrow">arrow_drop_down</mat-icon>
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

    .select-wrapper {
      position: relative;
    }

    .filter-select {
      width: 100%;
      padding: 8px 32px 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      outline: none;
      appearance: none;
      background-color: white;
      cursor: pointer;
      transition: border-color 0.2s;
    }

    .filter-select:focus {
      border-color: #1976d2;
    }

    .select-arrow {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: #666;
      font-size: 20px;
    }
  `]
})
export class SelectFilterComponent extends FilterBase {
  options = input.required<FilterOption[]>();
  value = signal<string | null>(null);
  valueInput = input<string | null>(null);

  ngOnInit() {
    this.value.set(this.valueInput() ?? null);
  }

  ngOnChanges() {
    if (this.value() !== this.valueInput()) {
      this.value.set(this.valueInput() ?? null);
    }
  }

  /**
   * Método público para actualizar el valor programáticamente
   */
  setValue(newValue: string | null): void {
    this.value.set(newValue ?? null);
  }

  onValueChange(value: string | null): void {
    // Convertir cadena vacía a null
    const normalizedValue = (value === '' || value === 'null') ? null : value;
    this.value.set(normalizedValue);
    this.emitFilterChange(normalizedValue);
  }
}
