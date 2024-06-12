import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '@app/interfaces/account.interface';
import { Token } from '@app/interfaces/token.interface';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { API_URL } from '@app/config/apiurl.config';
import {
  getAccessToken,
  getRefreshToken,
  removeToken,
  setToken,
} from '@app/functions/token-storage.function';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = API_URL.auth;
  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  login(account: Account): Observable<Token> {
    return this.http.post<Token>(this.url + '/login', account).pipe(
      tap((response) => {
        setToken(response);
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(this.url + '/forgot-password', {
      email: email,
    });
  }

  resetPassword(newPassword: string, token: string): Observable<any> {
    return this.http.post<any>(this.url + '/reset-password', {
      token: token,
      newPassword: newPassword,
    });
  }

  resfreshToken(): Observable<Token> {
    return this.http
      .post<Token>(this.url + '/refresh-token', {
        refreshToken: getRefreshToken(),
      })
      .pipe(
        tap((response) => {
          setToken(response);
        })
      );
  }

  isAuthenticated() {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (accessToken) {
      try {
        const isTokenExpired = this.jwtHelper.isTokenExpired(accessToken);
        if (isTokenExpired) {
          if (refreshToken) {
            const isRefreshTokenExpired =
              this.jwtHelper.isTokenExpired(refreshToken);
            if (isRefreshTokenExpired) {
              this.logout();
              return false;
            } else {
              this.resfreshToken().subscribe((res) => {
                console.log(res);
                // window.location.reload();
                this.router.navigateByUrl('private/categories');
                return true;
              });
            }
          }
        } else {
          return true;
        }
      } catch (error) {
        console.log('hhaa');
        if (refreshToken) {
          const isRefreshTokenExpired =
            this.jwtHelper.isTokenExpired(refreshToken);
          if (isRefreshTokenExpired) {
            this.logout();
            return false;
          } else {
            this.resfreshToken().subscribe((res) => {
              console.log(res);
              // window.location.reload();
              this.router.navigateByUrl('private/categories');
              return true;
            });
          }
        }
        return false;
      }
    }
    return false;
  }

  logout() {
    removeToken();
    this.router.navigateByUrl('/login');
  }
}
