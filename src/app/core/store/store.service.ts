import { Injectable, computed, inject } from '@angular/core';
import { GlobalStore } from './global';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  
  // Singleton estático
  private static _instance: StoreService | null = null;
  
  // Propiedad estática global para acceso desde cualquier lugar

  
  // Store global de la aplicación
  readonly global = inject(GlobalStore);
  get isDebug() {
    return !environment.production;
  }

  constructor() {
    // Establecer la instancia singleton
    if (StoreService._instance) {
      return StoreService._instance;
    }
    StoreService._instance = this;
    
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