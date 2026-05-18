import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'assets',
        loadComponent: () =>
          import('./features/assets/asset-list/asset-list').then((m) => m.AssetList),
      },
      {
        path: 'assets/new',
        loadComponent: () =>
          import('./features/assets/asset-form/asset-form').then((m) => m.AssetForm),
      },
      {
        path: 'assets/:id',
        loadComponent: () =>
          import('./features/assets/asset-detail/asset-detail').then((m) => m.AssetDetail),
      },
      {
        path: 'assets/:id/edit',
        loadComponent: () =>
          import('./features/assets/asset-form/asset-form').then((m) => m.AssetForm),
      },
      { path: 'users', loadComponent: () => import('./features/users/users').then((m) => m.Users) },
      {
        path: 'employees',
        loadComponent: () => import('./features/employees/employees').then((m) => m.Employees),
      },
      {
        path: 'groups',
        loadComponent: () => import('./features/groups/groups').then((m) => m.Groups),
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/reports/reports').then((m) => m.Reports),
      },
      {
        path: 'import',
        loadComponent: () => import('./features/import/import').then((m) => m.Import),
      },
      {
        path: 'export',
        loadComponent: () => import('./features/export/export').then((m) => m.Export),
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/settings').then((m) => m.Settings),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
