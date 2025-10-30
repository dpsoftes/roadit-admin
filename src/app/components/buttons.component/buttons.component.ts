import { Component, input, output } from '@angular/core';
import { MatAnchor, MatButton, MatIconButton } from "@angular/material/button";
import { MatRippleModule } from '@angular/material/core';
import { TranslatePipe } from '@i18n/translate.pipe';
import { MatIcon } from '@angular/material/icon';

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
  onClick = output<void>(); 
}
