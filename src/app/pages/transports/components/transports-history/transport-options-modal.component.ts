import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@i18n/translate.pipe';
import { Subject } from 'rxjs';

export interface TransportOption {
  id: string;
  label: string;
  icon?: string;
  iconColor?: 'primary' | 'accent' | 'warn' | 'info';
  hasChevron?: boolean;
}

@Component({
  selector: 'app-transport-options-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslatePipe],
  templateUrl: './transport-options-modal.component.html',
  styleUrl: './transport-options-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransportOptionsModalComponent {
  transport = input<any>(null);
  options = input<TransportOption[]>([]);
  onOptionClick = new Subject<{ optionId: string; transport: any }>();

  handleOptionClick(option: TransportOption) {
    this.onOptionClick.next({ optionId: option.id, transport: this.transport() });
  }
}

