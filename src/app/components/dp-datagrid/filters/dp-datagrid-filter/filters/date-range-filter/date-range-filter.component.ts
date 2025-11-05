import { Component, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterBase } from '../../shared/filter-base';

/**
 * Componente atómico para filtro de rango de fechas
 * Responsabilidad única: Dos inputs de fecha (desde/hasta)
 */
@Component({
  selector: 'dp-date-range-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-field" [style.width]="getWidth()">
      <label class="filter-label">{{ label() }}</label>
      <div class="date-range-inputs">
        <input 
          type="date"
          class="filter-input filter-date"
          placeholder="Desde"
          [(ngModel)]="fromValue"
          (ngModelChange)="onRangeChange()">
        <span class="separator">-</span>
        <input 
          type="date"
          class="filter-input filter-date"
          placeholder="Hasta"
          [(ngModel)]="toValue"
          (ngModelChange)="onRangeChange()">
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

    .date-range-inputs {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .filter-input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }

    .filter-input:focus {
      border-color: #1976d2;
    }

    .filter-date {
      cursor: pointer;
    }

    .separator {
      color: #666;
      font-weight: 500;
    }
  `]
})
export class DateRangeFilterComponent extends FilterBase {
  fromValue = signal<string>('');
  toValue = signal<string>('');
  valueInput = input<{ from: string; to: string } | null>(null);

  ngOnInit() {
    const val = this.valueInput();
    this.fromValue.set(val?.from ?? '');
    this.toValue.set(val?.to ?? '');
  }

  ngOnChanges() {
    const val = this.valueInput();
    if (this.fromValue() !== (val?.from ?? '') || this.toValue() !== (val?.to ?? '')) {
      this.fromValue.set(val?.from ?? '');
      this.toValue.set(val?.to ?? '');
    }
  }

  /**
   * Método público para actualizar el valor programáticamente
   */
  setValue(newValue: { from: string; to: string } | null): void {
    this.fromValue.set(newValue?.from ?? '');
    this.toValue.set(newValue?.to ?? '');
  }

  onRangeChange(): void {
    const range = {
      from: this.fromValue(),
      to: this.toValue()
    };
    this.emitFilterChange(range);
  }
}
