import { Component, signal, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterBase } from '../../shared/filter-base';
import { FilterOption } from '../../../../dp-datagrid.interfaces';

/**
 * COMPONENTE ATOMICO PARA FILTRO DE SELECT
 * RESPONSABILIDAD UNICA: DROPDOWN SIMPLE DE SELECCION CON ESTILOS PERSONALIZADOS DE FIGMA
 * SOPORTA ICONOS COMO RUTAS A ARCHIVOS DE IMAGEN (SVG, PNG, JPG, ETC)
 */
@Component({
  selector: 'dp-select-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-field" [style.width]="getWidth()">
      <!-- LABEL OPCIONAL -->
      @if (label()) {
        <label class="filter-label">{{ label() }}</label>
      }

      <!-- CONTENEDOR DEL SELECT -->
      <div class="select-wrapper">
        <select
          class="filter-select"
          [class.with-option-icon]="hasSelectedIcon()"
          [(ngModel)]="value"
          (ngModelChange)="onValueChange($event)">
          <option value="">{{ getEmptyOptionText() }}</option>
          @for (option of options(); track option.value) {
            <option [value]="option.value">
              {{ option.label }}
            </option>
          }
        </select>

        <!-- ICONO DE CHEVRON -->
        <img class="select-arrow" [src]="chevronIcon" alt="chevron">

        <!-- ICONO DE LA OPCION SELECCIONADA (SI EXISTE) -->
        @if (selectedOptionIcon()) {
          <img class="option-icon" [src]="selectedOptionIcon()" alt="icon">
        }
      </div>
    </div>
  `,
  styles: [`
    .filter-field {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }

    .filter-label {
      font-family: 'Geist', sans-serif;
      font-weight: 700;
      font-size: 16px;
      line-height: 100%;
      color: #2D3D32;
      margin: 0;
      padding: 0;
    }

    .select-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .filter-select {
      height: 38px;
      width: 100%;
      border-radius: 8px;
      padding: 9px 40px 9px 12px;
      border: 1px solid #D0D0D0;
      font-family: 'Geist', sans-serif;
      font-size: 14px;
      color: #2D3D32;
      background-color: #FFFFFF;
      transition: all 0.15s ease;
      outline: none;
      appearance: none;
      cursor: pointer;
      box-sizing: border-box;

      &:hover:not(:disabled) {
        border-color: #B0B0B0;
      }

      &:focus {
        border-color: #2D3D32;
        box-shadow: 0 0 0 2px rgba(45, 61, 50, 0.1);
      }

      &:disabled {
        background-color: #F5F5F5;
        color: #A0A0A0;
        cursor: not-allowed;
      }

      /* SI HAY ICONO EN LA OPCION SELECCIONADA, AJUSTAR PADDING */
      &.with-option-icon {
        padding-left: 44px;
      }
    }

    .select-arrow {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      width: 16px;
      height: 16px;
      object-fit: contain;
    }

    .option-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      width: 20px;
      height: 20px;
      object-fit: contain;
    }
  `]
})
export class SelectFilterComponent extends FilterBase {
  options = input.required<FilterOption[]>();
  value = signal<string | null>(null);
  valueInput = input<string | null>(null);

  //RUTA AL ARCHIVO DE ICONO DE CHEVRON DOWN (EN CARPETA ASSETS)
  chevronIcon = 'assets/icons/chevronIcon.svg';

  //COMPUTED: OBTENER EL ICONO DE LA OPCION SELECCIONADA
  selectedOptionIcon = computed(() => {
    const currentValue = this.value();
    if (!currentValue) return '';

    const selectedOption = this.options().find(opt => opt.value === currentValue);
    return selectedOption?.icon || '';
  });

  //COMPUTED: VERIFICAR SI HAY ICONO SELECCIONADO
  hasSelectedIcon = computed(() => {
    return !!this.selectedOptionIcon();
  });

  ngOnInit() {
    this.value.set(this.valueInput() ?? null);
  }

  ngOnChanges() {
    //ACTUALIZAR SIGNAL SI EL INPUT CAMBIA EXTERNAMENTE
    if (this.value() !== this.valueInput()) {
      this.value.set(this.valueInput() ?? null);
    }
  }

  /**
   * METODO PUBLICO PARA ACTUALIZAR EL VALOR PROGRAMATICAMENTE
   */
  setValue(newValue: string | null): void {
    this.value.set(newValue ?? null);
  }

  onValueChange(value: string | null): void {
    //CONVERTIR CADENA VACIA A NULL
    const normalizedValue = (value === '' || value === 'null') ? null : value;
    this.value.set(normalizedValue);
    this.emitFilterChange(normalizedValue);
  }
}
