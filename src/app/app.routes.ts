import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'Dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/users/users').then(m => m.Users)
      },
      {
        path: 'users/profile',
        loadComponent: () => import('./pages/users/profile/profile').then(m => m.Profile)
      },
      {
        path: 'users/new',
        loadComponent: () => import('./pages/users/create-user/create-user').then(m => m.CreateUser)
      },
      {
        path: 'users/edit-user/:id',
        loadComponent: () => import('./pages/users/edit-user/edit-user').then(m => m.EditUser)
      },
      // {
      //  path: '**', 
      //   loadComponent: () => import('./pages/construction/construction').then(m => m.Construction),
      // }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: '**', 
    loadComponent: () => import('./pages/construction/construction').then(m => m.Construction),
  }
];
