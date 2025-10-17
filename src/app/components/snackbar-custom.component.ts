import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-snackbar-custom',
  standalone: true,
  imports: [NgStyle],
  template: `
      <div [ngStyle]="{
        'background': background,
        'color': color,
        'width': 'calc(100% + 32px)',
        'margin-left': '-16px',
        'margin-right': '-16px',
        'margin-top': '-14px',
        'margin-bottom': '-14px',
        'font-weight': 'bold',
        'border-radius': '4px',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'font-size': '1.1rem',
        'padding': '16px 24px',
        'box-shadow': 'none'
      }">
        {{ message }}
      </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class SnackbarCustomComponent {
  message: string = '';
  type: 'OK' | 'ERROR' | 'ALERT' = 'OK';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string; type: 'OK' | 'ERROR' | 'ALERT' }) {
    this.message = data.message;
    this.type = data.type;
  }

  get background(): string {
    switch (this.type) {
      case 'ERROR': return '#f00';
      case 'ALERT': return '#ffc107';
      case 'OK':
      default: return '#43a047';
    }
  }
  get color(): string {
    return this.type === 'ALERT' ? '#222' : '#fff';
  }
}
