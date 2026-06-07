import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router
} from '@angular/router';

import {
  inject
} from '@angular/core';
import { AuthStateService } from '../Services/auth-state.service';



export const roleGuard:
CanActivateFn =
(route: ActivatedRouteSnapshot) => {

  const authState =
    inject(AuthStateService);

  const router =
    inject(Router);

  const user =
    authState.currentUser();

  const roles =
    route.data['roles'];

  if (
    user &&
  roles.includes(
  user[
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
  ] ?? ''
)
  ) {
    return true;
  }

  return router.createUrlTree(
    ['/login']
  );
};