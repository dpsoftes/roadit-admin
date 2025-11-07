import { Component, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterBase } from '../../shared/filter-base';

/**
 * COMPONENTE ATOMICO PARA FILTRO DE TEXTO
 * RESPONSABILIDAD UNICA: INPUT DE TEXTO SIMPLE CON ESTILOS PERSONALIZADOS DE FIGMA
 */
@Component({
  selector: 'dp-text-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-field" [style.width]="getWidth()">
      <!-- LABEL OPCIONAL -->
      @if (label()) {
        <label class="filter-label">{{ label() }}</label>
      }

      <!-- CONTENEDOR DEL INPUT CON ICONOS -->
      <div class="input-wrapper">
        <!-- ICONO IZQUIERDO -->
        @if (iconLeft()) {
          <div class="input-icon input-icon-left" [innerHTML]="iconLeft()"></div>
        }

        <!-- INPUT -->
        <input
          type="text"
          class="filter-input"
          [class.with-icon-left]="iconLeft()"
          [class.with-icon-right]="iconRight()"
          placeholder="Escriba aquí..."
          [(ngModel)]="value"
          (ngModelChange)="onValueChange($event)">

        <!-- ICONO DERECHO -->
        @if (iconRight()) {
          <div class="input-icon input-icon-right" [innerHTML]="iconRight()"></div>
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

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
    }

    .filter-input {
      height: 38px;
      width: 100%;
      border-radius: 8px;
      padding: 9px 12px;
      border: 1px solid #D0D0D0;
      font-family: 'Geist', sans-serif;
      font-size: 14px;
      color: #2D3D32;
      background-color: #FFFFFF;
      transition: all 0.15s ease;
      outline: none;
      box-sizing: border-box;

      &::placeholder {
        color: #A0A0A0;
      }

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

      &.with-icon-left {
        padding-left: 40px;
      }

      &.with-icon-right {
        padding-right: 40px;
      }
    }

    .input-icon {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      pointer-events: none;
      color: #5F6368;

      ::ng-deep svg {
        width: 20px;
        height: 20px;
        fill: currentColor;
      }
    }

    .input-icon-left {
      left: 12px;
    }

    .input-icon-right {
      right: 12px;
    }
  `]
})
export class TextFilterComponent extends FilterBase {
  value = signal('');
  valueInput = input<string>('');

  //INPUTS PARA ICONOS SVG
  iconLeft = input<string>('');
  iconRight = input<string>('');

  ngOnInit() {
    this.value.set(this.valueInput() ?? '');
  }

  ngOnChanges() {
    //ACTUALIZAR SIGNAL SI EL INPUT CAMBIA EXTERNAMENTE
    if (this.value() !== this.valueInput()) {
      this.value.set(this.valueInput() ?? '');
    }
  }

  /**
   * METODO PUBLICO PARA ACTUALIZAR EL VALOR PROGRAMATICAMENTE
   */
  setValue(newValue: string): void {
    this.value.set(newValue ?? '');
  }

  onValueChange(value: string): void {
    this.value.set(value);
    this.emitFilterChange(value);
  }
}
