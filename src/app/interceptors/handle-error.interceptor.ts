import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { getAccessToken } from '@app/functions/token-storage.function';
import { AuthService } from '@app/services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const handleErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error) {
        switch (error.status) {
          case 401:
            authService.resfreshToken().subscribe({
              next: () => {
                next(
                  req.clone({
                    setHeaders: {
                      Authorization: 'Bearer ' + getAccessToken(),
                    },
                  })
                );
              },
              error: catchError((error) => {
                authService.logout();
                return throwError(() => error);
              }),
            });
            break;
        }
      }
      return throwError(() => error);
    })
  );
};
