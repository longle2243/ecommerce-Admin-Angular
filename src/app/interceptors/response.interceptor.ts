import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getAccessToken } from '@app/functions/token-storage.function';
import { AuthService } from '@app/services/auth.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable()
export class responseInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      req = this.addToken(req, accessToken);
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          switch (error.status) {
            case 401:
              this.handleTokenExpired(req, next);
          }
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  private handleTokenExpired(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.resfreshToken().pipe(
      switchMap(() => {
        const newAccessToken = getAccessToken();
        return next.handle(this.addToken(request, newAccessToken!));
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
