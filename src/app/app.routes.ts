import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [noAuthGuard] // Solo accesible si NO está logueado
  },
  {
    path: 'app',
    loadComponent: () => import('./core/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [authGuard], // Solo accesible si está logueado
    children: [
      {
        path: 'pruebas',
        loadComponent: () => import('./pages/pruebas/pruebas.component').then(m => m.PruebasComponent)
      },
      {
        path: '',
        redirectTo: 'pruebas',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login', // Redirige por defecto al login (sin guard)
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
