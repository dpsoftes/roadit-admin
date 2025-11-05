import { Component, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilterBase } from '../../shared/filter-base';

/**
 * Componente atómico para filtro de checkbox
 * Responsabilidad única: Checkbox simple de selección
 */
@Component({
  selector: 'dp-checkbox-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCheckboxModule],
  template: `
    <div class="filter-field" [style.width]="getWidth()">
      <mat-checkbox
        [checked]="value()"
        (change)="onValueChange($event.checked)">
        {{ label() }}
      </mat-checkbox>
    </div>
  `,
  styles: [`
    .filter-field {
      display: flex;
      align-items: center;
      padding: 4px 0;
    }
  `]
})
export class CheckboxFilterComponent extends FilterBase {
  value = signal<boolean>(false);
  valueInput = input<boolean>(false);

  ngOnInit() {
    this.value.set(this.valueInput() ?? false);
  }

  ngOnChanges() {
    if (this.value() !== this.valueInput()) {
      this.value.set(this.valueInput() ?? false);
    }
  }

  /**
   * Método público para actualizar el valor programáticamente
   */
  setValue(newValue: boolean): void {
    this.value.set(newValue ?? false);
  }

  onValueChange(value: boolean): void {
    this.value.set(value);
    this.emitFilterChange(value);
  }
}
