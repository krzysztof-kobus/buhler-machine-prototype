import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'machine/:id',
    loadComponent: () =>
      import('./features/machine-details/machine-details.component').then(m => m.MachineDetailsComponent),
  },
];
