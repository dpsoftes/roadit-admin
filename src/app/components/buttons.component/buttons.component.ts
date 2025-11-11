import { Component, input, output } from '@angular/core';
import { MatAnchor, MatButton, MatIconButton } from "@angular/material/button";
import { MatRippleModule } from '@angular/material/core';
import { TranslatePipe } from '@i18n/translate.pipe';
import { MatIcon } from '@angular/material/icon';

interface ButtonConfig {
  matType: 'button' | 'icon-button';
  cssClass: string;
  htmlType?: 'submit' | 'button';
  icon?: string;
  iconPosition?: 'before' | 'after';
  hasRipple?: boolean;
}

@Component({
  selector: 'app-buttons',
  imports: [
    MatAnchor,
    MatButton,
    MatIconButton,
    MatRippleModule,
    TranslatePipe,
    MatIcon
  ],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {
  type = input<string>();
  text = input<string>();
  disabled = input<boolean>(false);
  onClick = output<void>();

  // Configuración de botones
  buttonConfigs: Record<string, ButtonConfig> = {
    'save-changes-noform': { matType: 'button', cssClass: 'save_changes_btn' },
    'save-changes': { matType: 'button', cssClass: 'save_changes_btn' },
    'cancel': { matType: 'button', cssClass: 'cancel_btn', htmlType: 'button' },
    'save-small': { matType: 'button', cssClass: 'save-small' },
    'cancel-small': { matType: 'button', cssClass: 'cancel-small' },
    'back': { matType: 'button', cssClass: 'back-btn', icon: 'arrow_back_ios', iconPosition: 'before' },
    'swap': { matType: 'icon-button', cssClass: 'swap-btn', icon: 'swap_horiz', hasRipple: true },
    'add-stage': { matType: 'button', cssClass: 'add-stage', icon: 'add', iconPosition: 'before' },
    'import-csv': { matType: 'button', cssClass: 'import-csv', icon: 'upload', iconPosition: 'before' },
    'add-vehicle': { matType: 'button', cssClass: 'add-vehicle', icon: 'add', iconPosition: 'before' },
    'add': { matType: 'button', cssClass: 'add-btn', icon: 'add', iconPosition: 'before' }
  };

  get config(): ButtonConfig | undefined {
    return this.buttonConfigs[this.type() || ''];
  }
}
