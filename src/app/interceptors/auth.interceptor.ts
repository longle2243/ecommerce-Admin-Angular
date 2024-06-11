import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('accessToken');

  const router = inject(Router);
  const authSV = inject(AuthService);

  const authRequest = req.clone({
    setHeaders: {
      Authorization: 'Bearer' + accessToken,
    },
  });

  return next(authRequest).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          authSV.resfreshToken().subscribe((res)=>{
            console.log(res);
          })
        }
      }
      return throwError(() => err);
    })
  );
};