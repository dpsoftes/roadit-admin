import { Component, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterBase } from '../../shared/filter-base';

/**
 * Componente atómico para filtro de texto
 * Responsabilidad única: Input de texto simple
 */
@Component({
  selector: 'dp-text-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-field" [style.width]="getWidth()">
      <label class="filter-label">{{ label() }}</label>
      <input 
        type="text"
        class="filter-input"
        placeholder="Escriba aquí..."
        [(ngModel)]="value"
        (ngModelChange)="onValueChange($event)">
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

    .filter-input {
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

    .filter-input::placeholder {
      color: #999;
    }
  `]
})
export class TextFilterComponent extends FilterBase {
  value = signal('');
  valueInput = input<string>('');

  ngOnInit() {
    this.value.set(this.valueInput() ?? '');
  }

  ngOnChanges() {
    // Update signal if input changes externally
    if (this.value() !== this.valueInput()) {
      this.value.set(this.valueInput() ?? '');
    }
  }

  /**
   * Método público para actualizar el valor programáticamente
   */
  setValue(newValue: string): void {
    this.value.set(newValue ?? '');
  }

  onValueChange(value: string): void {
    this.value.set(value);
    this.emitFilterChange(value);
  }
}
