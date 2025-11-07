import { Component, signal, input, HostListener, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FilterBase } from '../../shared/filter-base';
import { FilterOption } from '../../../../dp-datagrid.interfaces';

/**
 * Componente atómico para filtro chip-select (dropdown con múltiples chips)
 * Responsabilidad única: Dropdown con selección múltiple mostrada como chips
 */
@Component({
  selector: 'dp-chip-select-filter',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="filter-field" [style.width]="getWidth()">
      <label class="filter-label">{{ label() }}</label>
      <div class="chip-select-container">
        <div 
          class="chip-select-display"
          (click)="toggleDropdown()"
          [class.open]="isOpen()">
          <div class="selected-chips">
            @if (selectedValues().length === 0) {
              <span class="placeholder">{{ getEmptyOptionText() }}</span>
            } @else {
              @for (value of selectedValues(); track value) {
                <span class="display-chip">
                  {{ getOptionLabel(value) }}
                  <mat-icon class="chip-remove" (click)="removeValue(value, $event)">close</mat-icon>
                </span>
              }
            }
          </div>
          <mat-icon class="dropdown-arrow">arrow_drop_down</mat-icon>
        </div>
        @if (isOpen()) {
          <div class="chip-select-dropdown">
            @for (option of options(); track option.value) {
              <div 
                class="dropdown-option"
                [class.selected]="selectedValues().includes(option.value)"
                (click)="toggleOption(option.value)">
                <span>{{ option.label }}</span>
                @if (selectedValues().includes(option.value)) {
                  <mat-icon class="check-icon">check</mat-icon>
                }
              </div>
            }
          </div>
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

    .chip-select-container {
      position: relative;
    }

    .chip-select-display {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
      padding: 8px 32px 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
      background-color: white;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }

    .chip-select-display:hover,
    .chip-select-display.open {
      border-color: #1976d2;
    }

    .selected-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      flex: 1;
      align-items: center;
    }

    .placeholder {
      color: #999;
      font-size: 14px;
    }

    .display-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      background-color: #e3f2fd;
      color: #1976d2;
      border-radius: 12px;
      font-size: 12px;
    }

    .chip-remove {
      font-size: 16px;
      width: 16px;
      height: 16px;
      cursor: pointer;
    }

    .chip-remove:hover {
      color: #0d47a1;
    }

    .dropdown-arrow {
      position: absolute;
      right: 8px;
      top: 12px;
      pointer-events: none;
      color: #666;
      font-size: 20px;
    }

    .chip-select-dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      max-height: 200px;
      overflow-y: auto;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      z-index: 1000;
    }

    .dropdown-option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .dropdown-option:hover {
      background-color: #f5f5f5;
    }

    .dropdown-option.selected {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    .check-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #1976d2;
    }
  `]
})
export class ChipSelectFilterComponent extends FilterBase {
  options = input.required<FilterOption[]>();
  selectedValues = signal<string[]>([]);
  valueInput = input<string[] | null>(null);
  isOpen = signal(false);

  private elementRef = inject(ElementRef);

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

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  toggleDropdown(): void {
    this.isOpen.update(v => !v);
  }

  toggleOption(value: string): void {
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

  removeValue(value: string, event: MouseEvent): void {
    event.stopPropagation();
    const newValues = this.selectedValues().filter(v => v !== value);
    this.selectedValues.set(newValues);
    this.emitFilterChange(newValues);
  }

  getOptionLabel(value: string): string {
    const option = this.options().find(opt => opt.value === value);
    return option?.label || value;
  }
}
