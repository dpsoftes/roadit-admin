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
        children: [
        {
          path: '',
          loadComponent: () => import('./pages/users/users').then(m => m.Users)
        },
          {
            path: 'edit-user/:id',
            loadComponent: () => import('./pages/users/profile/profile').then(m => m.Profile)
          },
          {
          path: 'profile',
          loadComponent: () => import('./pages/users/profile/profile').then(m => m.Profile)
          },
        ]
      },
      
      {
        path: 'clients/create-group',
        loadComponent: () => import('./pages/clients/create-group/create-group').then(m => m.CreateGroup)
      },
      {
        path: 'clients/create',
        loadComponent: () => import('./pages/clients/create-client/create-client').then(m => m.CreateClient)
      },
      {
        path: 'clients/:tab',
        loadComponent: () => import('./pages/clients/clients').then(m => m.Clients)
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
