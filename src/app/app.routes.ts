import { Routes } from '@angular/router';
import { authGuard } from './authGuards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./Modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./Modules/main/main.module').then((m) => m.MainModule),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'main' },
];
