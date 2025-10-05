import { Component, ChangeDetectionStrategy, input, output, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem, SubMenuItem } from './sidebar.types';
import { MENU_ITEMS } from './sidebar-menu.config';
import { I18nService } from '../../i18n/i18n.service';
import { SidebarMenuItemComponent } from './sidebar-menu-item.component';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, SidebarMenuItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  private i18nService = inject(I18nService);

  // Inputs
  isCollapsed = input<boolean>(false);
  
  // Outputs
  toggleMenu = output<void>();

  // Estructura del menú importada desde archivo de configuración
  menuItems: MenuItem[] = MENU_ITEMS;

  // Computed para obtener las traducciones actualizadas
  translatedMenuItems = computed(() => {
    return this.menuItems.map(item => ({
      ...item,
      label: this.i18nService.translate(item.label),
      submenus: item.submenus?.map(submenu => ({
        ...submenu,
        label: this.i18nService.translate(submenu.label)
      }))
    }));
  });

  onToggleMenu(): void {
    this.toggleMenu.emit();
  }

  toggleSubmenu(index: number): void {
    this.menuItems[index].collapsed = !this.menuItems[index].collapsed;
  }
}