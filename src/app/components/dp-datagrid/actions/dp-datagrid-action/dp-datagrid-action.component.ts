import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableAction, ActionClickEvent } from '../../dp-datagrid.interfaces';

@Component({
  selector: 'dp-datagrid-action',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    @if (shouldShow()) {
      <button 
        mat-raised-button
        [color]="color()"
        [disabled]="!shouldEnable()"
        (click)="handleClick()"
        class="action-button">
        @if (icon()) {
          <mat-icon>{{ icon() }}</mat-icon>
        }
        <span>{{ text() }}</span>
      </button>
    }
  `,
  styles: [`
    .action-button {
      display: flex;
      align-items: center;
      gap: 8px;
      
      mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
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
  
  // Output - Evento onClick
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
