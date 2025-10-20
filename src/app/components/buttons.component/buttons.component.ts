import { Component, input, output } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { TranslatePipe } from '@i18n/translate.pipe';

@Component({
  selector: 'app-buttons',
  imports: [
    MatAnchor,
    TranslatePipe
  ],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {

  type = input<string>();
  text = input<string>();
  onClick = output<void>(); 
}
