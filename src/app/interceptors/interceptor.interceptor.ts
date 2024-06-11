// token-interceptor.service.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '@app/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      request = this.addToken(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401 && accessToken) {
          return this.handleTokenExpired(request, next);
        }

        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: 'Bearer' + token,
      },
    });
  }

  private handleTokenExpired(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.resfreshToken().pipe(
      switchMap(() => {
        const newAccessToken = localStorage.getItem('accessToken');
        return next.handle(this.addToken(request, newAccessToken));
      }),
      catchError((error) => {
        console.error('Error handling expired access token:', error);
        return throwError(() => error);
      })
    );
  }
}
