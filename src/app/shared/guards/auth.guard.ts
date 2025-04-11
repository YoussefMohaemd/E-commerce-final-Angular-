import { CanActivateFn, Router } from '@angular/router';
import { AuthhService } from '../services/auth/authh.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let _AuthhService: AuthhService = inject(AuthhService)
  let _Router: Router = inject(Router)
  if (_AuthhService.userData.getValue() != null) {
    return true

  }
  _Router.navigate(['/login'])
  return false;
};
