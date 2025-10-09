import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { StoreService } from '../store/store.service';

/**
 * Guard de autenticación que usa el singleton del StoreService
 * Protege rutas verificando si el usuario está logueado
 */
export const authGuard: CanActivateFn = (route, state) => {
  console.log("entra");
  const router = inject(Router);
  // Inyectar el servicio normalmente para asegurar inicialización
  const storeService = inject(StoreService);
  console.log(storeService.global.isAuthenticated());
  // Verificar si el usuario está autenticado usando el computed del store
  const isAuthenticated = storeService.global.isAuthenticated();
  if (isAuthenticated) {
    return true;
  } else {
    // Redirigir al login si no está autenticado
    router.navigate(['/login']);
    return true;
  }
};

/**
 * Guard inverso - para rutas que solo deben ser accesibles si NO está logueado (como login)
 * Redirige al app si ya está autenticado
 */
export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Usar el singleton del StoreService
  const storeService = inject(StoreService);
  
  // Verificar si el usuario está autenticado
  const isAuthenticated = storeService.global.isAuthenticated();
  
  if (!isAuthenticated) {
    return true;
  } else {
    // Redirigir al app si ya está autenticado
    router.navigate(['/app']);
    return false;
  }
};