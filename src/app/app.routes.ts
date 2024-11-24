import { Routes } from '@angular/router';

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
     },
    {path: '**', redirectTo: 'auth'}  
];
