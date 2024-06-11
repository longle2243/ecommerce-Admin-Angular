import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { requestInterceptor } from './request.interceptor';
import { Router } from '@angular/router';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error) {
        switch (error.status) {
          case 401:
            handleTokenExpired(req, next);
            break;
        }
      }
      return throwError(() => error);
    })
  );
};

export const handleTokenExpired: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return authService.resfreshToken().pipe(
    switchMap(() => {
      return requestInterceptor(req, next);
    }),
    catchError((error) => {
      authService.logout();
      return throwError(() => error);
    })
  );
};
