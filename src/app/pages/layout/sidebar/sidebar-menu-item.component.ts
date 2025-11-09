import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { I18nService } from '@i18n/i18n.service';

@Component({
  selector: 'sidebar-menu-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
   <!-- BLOQUE PARA SUBITEMS -->
   @if(isSubitem) {
     <RouterLink [routerLink]="route" style="margin:0; padding: 0" >
       <div class="sidebar-menu-item submenu-bullet" >
         <span class="label">{{ getTranslatedLabel() }}</span>
       </div>
     </RouterLink>
   }
   <!-- BLOQUE PARA ITEMS NORMALES CON RUTA -->
   @else if(route) {
     <RouterLink [routerLink]="route" style="margin:0; padding: 0" >
       <div class="sidebar-menu-item" [class.collapsed-item]="isCollapsed">
         <span class="icon">
           <ng-container *ngIf="isAssetIcon(); else materialIcon">
             <img [src]="icon" alt="icon" width="24" height="24" />
           </ng-container>
           <ng-template #materialIcon >
             <span class="material-icons">{{ icon }}</span>
           </ng-template>
         </span>
         <span *ngIf="!isCollapsed" class="label">{{ getTranslatedLabel() }}</span>
         <span *ngIf="hasSubitems && !isCollapsed" class="expand-icon">
           <span class="material-icons">
             {{ expanded ? 'expand_less' : 'expand_more' }}
           </span>
         </span>
       </div>
     </RouterLink>
   }
   <!-- BLOQUE PARA ITEMS SIN RUTA (EXPANDIBLES) -->
   @else {
     <div class="sidebar-menu-item" [class.collapsed-item]="isCollapsed">
       <span class="icon">
         <ng-container *ngIf="isAssetIcon(); else materialIcon">
           <img [src]="icon" alt="icon" width="24" height="24" />
         </ng-container>
         <ng-template #materialIcon >
           <span class="material-icons">{{ icon }}</span>
         </ng-template>
       </span>
       <span *ngIf="!isCollapsed" class="label">{{ getTranslatedLabel() }}</span>
       <span *ngIf="hasSubitems && !isCollapsed" class="expand-icon">
         <span class="material-icons">
           {{ expanded ? 'expand_less' : 'expand_more' }}
         </span>
       </span>
     </div>
   }
  `,
  styles: [`
    .sidebar-menu-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.6rem 1rem; /* REDUCIDO DE 0.75rem PARA AHORRAR ESPACIO */
      color: rgba(255,255,255,0.87);
      text-decoration: none;
      border-radius: 0.5rem;
      font-size: 16px;
      font-family: 'Geist Sans', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.15px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      margin-left: 0;
      min-height: 42px; /* ALTURA MINIMA PARA EVITAR SALTOS */
    }

    /* CUANDO ESTÁ COLAPSADO, CENTRAR EL ICONO */
    .sidebar-menu-item.collapsed-item {
      justify-content: center;
      padding: 0.6rem 0.5rem;
    }

    .sidebar-menu-item:hover {
      background-color: rgba(255, 255, 255, 0.1);
      cursor: pointer;
    }
    .sidebar-menu-item.has-subitems {
      margin-left: 0;
      position: relative;
    }
    .expand-icon {
      margin-left: auto;
      color: #F5F5F5;
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      min-width: 24px;
      min-height: 24px;
      flex-shrink: 0;
    }
    .icon .material-icons {
      color: #C7D944 !important;
      font-size: 24px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon img {
      width: 24px;
      height: 24px;
      object-fit: contain;
      display: block;
      margin-top: 0px;
      margin-bottom: 0px;
      vertical-align: middle;
      line-height: 24px;
    }

    /* PERMITIR MULTILINEA PARA TEXTOS LARGOS */
    .label {
      flex: 1;
      white-space: normal; /* CAMBIADO DE nowrap */
      word-wrap: break-word;
      overflow-wrap: break-word;
      text-overflow: clip; /* ELIMINADO ellipsis */
      display: block;
    }

    /* BULLET ELIMINADO - DESCOMENTAR SI SE QUIERE RESTAURAR
    .bullet {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.4);
      flex-shrink: 0;
      width: 0.875rem;
      text-align: center;
    }
    */

    .submenu-bullet {
      padding: 0.5rem 1rem 0.5rem 2.5rem; /* REDUCIDO PADDING IZQUIERDO (ANTES 3rem) */
      gap: 0.5rem;
    }

    .submenu-bullet .label {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.1px;
      color: rgba(255, 255, 255, 0.7);
    }

    .submenu-bullet:hover .label {
      color: rgba(255, 255, 255, 0.87);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarMenuItemComponent {
  private i18nService = inject(I18nService);

  @Input() label: string = '';
  @Input() icon?: string;
  @Input() route?: string;
  @Input() hasSubitems: boolean = false;
  @Input() expanded: boolean = false;
  @Input() isSubitem: boolean = false;
  @Input() isCollapsed: boolean = false;

  getTranslatedLabel(): string {
    return this.i18nService.translate(this.label);
  }

  isAssetIcon(): boolean {
    return this.icon?.includes('assets/') || false;
  }
}
