
import { Component, ChangeDetectionStrategy, input, output, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentService } from '../../../core/services/environment.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { StoreService } from '@store/store.service';
import { Router } from '@angular/router';
import { UsersProvider } from '@providers';
import { User } from '@dtos/user.dto';



@Component({
  selector: 'app-header',
  imports: [CommonModule],
  providers: [UsersProvider],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  // Inputs
  
  // Outputs
  logout = output<void>();
  toggleMenu = output<void>();
  changeLanguage = output<string>();

  // Idiomas disponibles
  readonly environmentService = inject(EnvironmentService);
  readonly i18nService = inject(I18nService);
  readonly storeService = inject(StoreService)
  readonly router = inject(Router); 
  readonly usersProvider = inject(UsersProvider);
  // Array de idiomas soportados desde environment
  readonly languages = this.environmentService.appConfig.supportedLanguages.map(code => ({
    code,
    label: code === 'es' ? 'Español' : code === 'en' ? 'English' : code.toUpperCase()
  }));

  // Signal para el idioma actual
  readonly currentLang = this.i18nService.currentLanguage;
  currentUser = this.storeService.global.user.user;
  currentLanguage = input<string>('ES');

  // Controla la visibilidad del desplegable de idiomas
  showLangs = signal(false);

  onLogout(): void {
    this.logout.emit();
  }

  onToggleMenu(): void {
    this.toggleMenu.emit();
  }

  onChangeLanguage(language: string): void {
    this.i18nService.setLanguage(language as 'es' | 'en');
    this.changeLanguage.emit(language);
    this.showLangs.set(false);
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
  async onProfile() {
    await this.usersProvider.getProfile();
    this.router.navigate(['/users/profile']);


    console.log('Ir al perfil del usuario');
  }
}