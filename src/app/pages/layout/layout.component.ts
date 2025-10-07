import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { StoreService } from '@store/store.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent, User } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  private storeService = inject(StoreService);
  private router = inject(Router);

  // Acceso al store global a través del singleton
  get globalStore() {
    return this.storeService.global;
  }

  // Getter para el usuario actual (adaptado para el HeaderComponent)
  get currentUser(): User {
    const user = this.globalStore.user();
    return {
      name: user.user?.name || user.user?.username || 'Usuario',
      email: user.user?.email,
      avatar: undefined // Se puede agregar después
    };
  }

  // Getter para el estado del menú
  get isMenuCollapsed() {
    return this.globalStore.menuCollapsed();
  }

  // Getter para el idioma actual
  get currentLanguage() {
    return this.globalStore.language().toUpperCase();
  }

  // Método para hacer logout
  onLogout(): void {
    this.globalStore.logout();
    this.router.navigate(['/login']);
  }

  // Método para alternar menú
  onToggleMenu(): void {
    this.globalStore.toggleMenu();
  }

  // Método para cambiar idioma
  onChangeLanguage(language: string): void {
    this.globalStore.setLanguage(language.toLowerCase());
  }
}