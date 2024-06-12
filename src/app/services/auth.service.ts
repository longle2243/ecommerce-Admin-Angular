import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '@app/interfaces/account.interface';
import { Token } from '@app/interfaces/token.interface';
import { Observable, map, tap } from 'rxjs';
import { TokenstorageService } from './tokenstorage.service';
import { Router } from '@angular/router';
import { API_URL } from '@app/config/apiurl.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = API_URL.auth;
  constructor(
    private http: HttpClient,
    private tokenstorage: TokenstorageService,
    private router: Router
  ) {}

  login(account: Account): Observable<Token> {
    return this.http.post<any>(this.url + '/login', account).pipe(
      map((response) => response.data as Token),
      tap((response) => {
        this.tokenstorage.setToken(response);
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

  resfreshToken(): Observable<any> {
    const refreshToken = this.tokenstorage.getRefreshToken();
    console.log('Đang cố gắng refresh token với refreshToken:', refreshToken);
    return this.http
      .post<any>(this.url + '/refresh-token', { refreshToken: refreshToken })
      .pipe(
        // map((response) => {
        //   console.log('Phản hồi nhận được từ API refresh token:', response);
        //   return response.data as Token;
        // }),
        tap((response) => {
          // console.log('set token');
          // this.tokenstorage.setToken(response);
          localStorage.setItem('accessToken', response.data.accessToken);
        })
      );
  }

  // refreshAccessToken(): Observable<any> {
  //   const refreshToken = localStorage.getItem('refreshToken');
  //   return this.http
  //     .post<any>(`${this.apiUrl}/${this.refreshTokenEndpoint}`, {
  //       refreshToken,
  //     })
  //     .pipe(
  //       tap((response) => {
  //         localStorage.setItem('accessToken', response.accessToken);
  //       }),
  //       catchError((error) => {
  //         console.error('Error refreshing access token:', error);
  //         return throwError(error);
  //       })
  //     );
  // }

  isAuthenticated() {
    const token = this.tokenstorage.getAccessToken();
    if (token) {
      return true;
    }
    return false;
  }

  logout() {
    this.tokenstorage.removeToken();
    this.router.navigateByUrl('/login');
  }
}
