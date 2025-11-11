/**
 * Tipos para la configuración del sidebar
 */

export interface SubMenuItem {
  label: string;
  route: string;
  icon?: string;
  iconType?: 'material' | 'png' | 'svg';
  iconPath?: string;
  badge?: string | number;
}

export interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  active?: boolean;
  badge?: string | number;
  submenus?: SubMenuItem[];
  collapsed?: boolean;
  iconType?: 'material' | 'png' | 'svg';
  iconPath?: string;
}