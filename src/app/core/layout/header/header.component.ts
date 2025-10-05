import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface User {
  name?: string;
  email?: string;
  avatar?: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  // Inputs
  currentUser = input<User>();
  currentLanguage = input<string>('ES');
  
  // Outputs
  logout = output<void>();
  toggleMenu = output<void>();
  changeLanguage = output<string>();

  // Idiomas disponibles
  languages = [
    { code: 'ES', label: 'Español' },
    { code: 'EN', label: 'English' }
  ];

  onLogout(): void {
    this.logout.emit();
  }

  onToggleMenu(): void {
    this.toggleMenu.emit();
  }

  onChangeLanguage(language: string): void {
    this.changeLanguage.emit(language);
  }

  // Obtener iniciales del usuario para el avatar
  getUserInitials(): string {
    const user = this.currentUser();
    if (!user?.name) return 'U';
    
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name[0].toUpperCase();
  }
}