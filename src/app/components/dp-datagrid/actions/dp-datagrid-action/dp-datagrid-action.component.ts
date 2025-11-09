import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableAction, ActionClickEvent } from '../../dp-datagrid.interfaces';

/**
 * COMPONENTE DE BOTON DE ACCION PARA DP-DATAGRID
 * DISEÑO PERSONALIZADO SEGUN ESPECIFICACIONES DE FIGMA
 * SOPORTA 3 VARIANTES: PRIMARY, ACCENT Y WARN
 */
@Component({
  selector: 'dp-datagrid-action',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (shouldShow()) {
      <button
        [class]="'action-button action-button--' + color()"
        [disabled]="!shouldEnable()"
        (click)="handleClick()">
        @if (icon()) {
          <span class="action-button__icon">{{ icon() }}</span>
        }
        <span class="action-button__text">{{ text() }}</span>
      </button>
    }
  `,
  styles: [`
    .action-button {
      //ESTILOS BASE SEGUN FIGMA
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 46px;
      width: auto;
      border-radius: 8px;
      padding: 18px 20px;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      outline: none;
      position: relative;

      //TIPOGRAFIA SEGUN FIGMA
      font-family: 'Geist', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 0.056px; // 0.4% DE 14PX
      text-transform: uppercase;

      //SOMBRA BASE
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

      //EFECTO HOVER
      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
      }

      //EFECTO ACTIVE (CLICK)
      &:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
      }

      //ESTADO DISABLED
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        box-shadow: none;
      }

      //ESTILOS DEL ICONO
      &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      //ESTILOS DEL TEXTO
      &__text {
        white-space: nowrap;
      }

      //VARIANTE PRIMARY: VERDE LIMA
      &--primary {
        background-color: #C7D944;
        color: #2D3D32;

        &:hover:not(:disabled) {
          background-color: #D4E45F;
        }

        &:active:not(:disabled) {
          background-color: #B8CC33;
        }
      }

      //VARIANTE ACCENT: VERDE OSCURO
      &--accent {
        background-color: #2D3D32;
        color: #FFFFFF;

        &:hover:not(:disabled) {
          background-color: #3D4D42;
        }

        &:active:not(:disabled) {
          background-color: #1D2D22;
        }
      }

      //VARIANTE WARN: ROJO
      &--warn {
        background-color: #E74C3C;
        color: #FFFFFF;

        &:hover:not(:disabled) {
          background-color: #EC5F4F;
        }

        &:active:not(:disabled) {
          background-color: #D43F2F;
        }
      }
    }
  `]
})
export class DpDatagridActionComponent {
  key = input.required<string>();
  text = input.required<string>();
  icon = input<string>();
  color = input<'primary' | 'accent' | 'warn'>('primary');
  isVisible = input<boolean>(true);
  isEnabled = input<boolean>(true);
  data = input<any>();

  //OUTPUT - EVENTO ONCLICK
  onClick = output<ActionClickEvent>();

  shouldShow(): boolean {
    return this.isVisible();
  }

  shouldEnable(): boolean {
    return this.isEnabled();
  }

  handleClick() {
    this.onClick.emit({
      key: this.key(),
      data: this.data()
    });
  }

  getActionConfig(): TableAction {
    return {
      key: this.key(),
      text: this.text(),
      icon: this.icon(),
    };
  }
}
