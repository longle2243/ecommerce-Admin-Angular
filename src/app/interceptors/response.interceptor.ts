import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { requestInterceptor } from './request.interceptor';
import { TokenstorageService } from '@app/services/tokenstorage.service';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tokenstorage = inject(TokenstorageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error) {
        switch (error.status) {
          case 401:
            console.log('401');
            // handleTokenExpired(req, next);
            // authService.resfreshToken().pipe(
            //   switchMap((newToken) => {
            //     console.log(newToken);
            //     return next(
            //       req.clone({
            //         setHeaders: {
            //           Authorization: 'Bearer ' + tokenstorage.getAccessToken(),
            //         },
            //       })
            //     );
            //   }),
            //   catchError((error) => {
            //     console.log('error');
            //     if (error.status == '403' || error.status === '401') {
            //       authService.logout();
            //     }
            //     return throwError(() => error);
            //   })
            // );
            authService.resfreshToken().subscribe({
              next: () => {
                next(
                  req.clone({
                    setHeaders: {
                      Authorization: 'Bearer ' + tokenstorage.getAccessToken(),
                    },
                  })
                );
              },
              error: catchError((error) => {
                if (error.status == '403' || error.status === '401') {
                  authService.logout();
                }
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

export const handleTokenExpired: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return authService.resfreshToken().pipe(
    switchMap(() => {
      console.log('switch');

      // return requestInterceptor(req, next);
      return next(req);
    }),
    catchError((error) => {
      authService.logout();
      return throwError(() => error);
    })
  );
};
