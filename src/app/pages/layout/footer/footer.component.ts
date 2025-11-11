import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  // Inputs
  appVersion = input<string>('1.0.0');
  companyName = input<string>('Roadit SL');
  
  // Año actual
  currentYear = new Date().getFullYear();

  // Links del footer
  footerLinks = [
    { label: 'Cookies', href: '#' },
    { label: 'Privacidad', href: '#' },
    { label: 'Términos y condiciones', href: '#' }
  ];
}