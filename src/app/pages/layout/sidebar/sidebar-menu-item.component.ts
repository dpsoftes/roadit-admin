import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { I18nService } from '@i18n/i18n.service';

@Component({
  selector: 'sidebar-menu-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
   <RouterLink [routerLink]="route" style="margin:0; padding: 0" >
    <div class="sidebar-menu-item" >
      <span class="icon" *ngIf="!isSubitem">
        <ng-container *ngIf="isAssetIcon(); else materialIcon">
          <img [src]="icon" alt="icon" width="24" height="24" />
        </ng-container>
        <ng-template #materialIcon >
          <span class="material-icons">{{ icon }}</span>
        </ng-template>
      </span>
      <span *ngIf="!isSubitem" class="label">{{ translatedLabel }}</span>
      <span *ngIf="hasSubitems" class="expand-icon">
        <span class="material-icons">
          {{ expanded ? 'expand_less' : 'expand_more' }}
        </span>
      </span>
    </div>
    </RouterLink>
    @if(isSubitem){
      <RouterLink [routerLink]="route" style="margin:0; padding: 0" >
    <div class="sidebar-menu-item submenu-bullet" >
          <span class="bullet">•</span>
          <span class="label">{{ translatedLabel }}</span>
    </div>
    </RouterLink>
    }
    
  `,
  styles: [`
    .sidebar-menu-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
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
      color: #C7D944;
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
      margin-right: 0.75rem;
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
      /* Truco para centrar perfectamente con el texto */
      position: relative;
      top: 1px;
    }
    .submenu-bullet {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding-left: 2rem;
      color: rgba(255,255,255,0.8);
      font-size: 15px;
      font-family: 'Geist Sans', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
      font-weight: 400;
      background: none !important;
      box-shadow: none !important;
      border-radius: 0 !important;
      margin: 0 !important;
      min-height: 32px;
    }
    .submenu-bullet .bullet {
      color: #C7D944;
      font-size: 18px;
      margin-right: 0.5rem;
      display: inline-block;
      vertical-align: middle;
    }
    .label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .has-subitems {
      position: relative;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarMenuItemComponent {
  @Input() expanded?: boolean = false;
  @Input() label!: string;
  @Input() icon?: string;
  @Input() route?: string;
  @Input() hasSubitems?: boolean;
  @Input() isSubitem?: boolean = false

  private i18n = inject(I18nService);

  get translatedLabel(): string {
    return this.i18n.translate(this.label);
  }

  isAssetIcon(): boolean {
    return this.icon ? this.icon.startsWith('assets/') : false;
  }
}
