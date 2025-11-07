import { Component, signal, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterBase } from '../../shared/filter-base';
import { FilterOption } from '../../../../dp-datagrid.interfaces';

/**
 * COMPONENTE ATOMICO PARA FILTRO DE SELECT
 * RESPONSABILIDAD UNICA: DROPDOWN SIMPLE DE SELECCION CON ESTILOS PERSONALIZADOS DE FIGMA
 * SOPORTA ICONOS COMO SVG INLINE O RUTAS A ARCHIVOS
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
        @if (isIconPath(chevronIcon)) {
          <img class="select-arrow" [src]="chevronIcon" alt="chevron">
        } @else {
          <div class="select-arrow" [innerHTML]="chevronIcon"></div>
        }

        <!-- ICONO DE LA OPCION SELECCIONADA (SI EXISTE) -->
        @if (selectedOptionIcon()) {
          @if (isIconPath(selectedOptionIcon())) {
            <!-- ICONO DESDE RUTA DE ARCHIVO -->
            <img class="option-icon" [src]="selectedOptionIcon()" alt="icon">
          } @else {
            <!-- ICONO SVG INLINE -->
            <div class="option-icon" [innerHTML]="selectedOptionIcon()"></div>
          }
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
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      color: #5F6368;

      /* PARA SVG INLINE */
      ::ng-deep svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }
    }

    /* ESTILOS ESPECIFICOS PARA IMG (CHEVRON) */
    img.select-arrow {
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
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;

      /* PARA SVG INLINE */
      ::ng-deep svg {
        width: 20px;
        height: 20px;
        fill: currentColor;
      }
    }

    /* ESTILOS ESPECIFICOS PARA IMG (OPCION) */
    img.option-icon {
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

  //ICONO DE CHEVRON DOWN (FONT AWESOME) CON FILL INCLUIDO
  chevronIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#5F6368"><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>`;

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

  /**
   * DETECTAR SI EL ICONO ES UNA RUTA DE ARCHIVO O SVG INLINE
   * RETORNA TRUE SI ES UNA RUTA DE ARCHIVO
   * METODO MEJORADO PARA EVITAR FALSOS POSITIVOS
   */
  isIconPath(icon: string): boolean {
    if (!icon) return false;

    //SI EMPIEZA CON '<' ES DEFINITIVAMENTE SVG INLINE
    if (icon.trim().startsWith('<')) {
      return false;
    }

    //DETECTAR RUTAS ABSOLUTAS Y RELATIVAS
    if (icon.startsWith('/') ||
      icon.startsWith('./') ||
      icon.startsWith('../') ||
      icon.startsWith('http://') ||
      icon.startsWith('https://')) {
      return true;
    }

    //DETECTAR RUTAS QUE EMPIEZAN CON 'assets'
    if (icon.startsWith('assets/')) {
      return true;
    }

    //DETECTAR EXTENSIONES DE ARCHIVO AL FINAL DEL STRING
    const fileExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico'];
    if (fileExtensions.some(ext => icon.toLowerCase().endsWith(ext))) {
      return true;
    }

    //SI NO CUMPLE NINGUNA CONDICION, ASUMIR QUE ES SVG INLINE
    return false;
  }
}
