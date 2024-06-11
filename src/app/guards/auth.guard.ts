import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authSV = inject(AuthService);
  const router = inject(Router);
  
  if (!authSV.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
