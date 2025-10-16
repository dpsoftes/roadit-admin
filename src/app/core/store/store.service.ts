import { Injectable, computed, inject } from '@angular/core';
import { GlobalStore } from '@store/global';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UsersState } from './users.state';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  
  // Singleton estático
  public static instance: StoreService | null = null;
  
  // Propiedad estática global para acceso desde cualquier lugar

  
  // Store global de la aplicación
  readonly global = inject(GlobalStore);
  readonly router = inject(Router)
  readonly users = inject(UsersState);

  get isDebug() {
    return !environment.production;
  }

  constructor() {
    // Establecer la instancia singleton
    if (StoreService.instance) {
      return StoreService.instance;
    }
    StoreService.instance = this;
    
    // Inicializar desde localStorage al arrancar la aplicación
    this.global.initializeFromStorage();
  }

  // Método para obtener el estado completo de todos los stores (útil para debugging)
  getFullState() {
    return {
      global: {
        user: this.global.user(),
        language: this.global.language(),
        userFull: this.global.userFull(),
        menuCollapsed: this.global.menuCollapsed(),
        isAuthenticated: this.global.isAuthenticated()
      }
    };
  }

  // Método para resetear todos los stores
  resetAllStores() {
    this.global.logout();
  }


}