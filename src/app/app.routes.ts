import { Routes } from '@angular/router';
import { Login } from './Features/Auth/login/login';
import { PlatformLayout } from './Layout/Platform-layout/platform-layout';
import { authGuard } from './Core/Auth/Guards/auth.guard';
import { Dashboard } from './Features/Platform-Admin/dashboard/dashboard';



export const routes: Routes = [

  {
    path: 'login',
    component: Login
  },

  {
    path: 'platform',
    component: PlatformLayout,
    canActivate: [
      authGuard
    ],
    children: [

      {
        path: 'dashboard',
        component: Dashboard
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }

    ]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];