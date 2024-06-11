import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@app/config/url.api';
import { Account } from '@app/interfaces/account.interface';
import { Token } from '@app/interfaces/token.interface';
import { Observable, tap } from 'rxjs';
import { TokenstorageService } from './tokenstorage.service';
import { Router } from '@angular/router';

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
    return this.http.post<Token>(this.url + '/login', account).pipe(
      tap((response) => {
        this.tokenstorage.setToken(response);
      })
    );
  }

  forgotPassword(email: string): Observable<string> {
    return this.http.post<string>(this.url + '/forgot-password', {
      email: email,
    });
  }

  resfreshToken(): Observable<Token> {
    const refreshToken = this.tokenstorage.getRefreshToken();
    return this.http.post<Token>(this.url, { refreshToken: refreshToken }).pipe(
      tap((response) => {
        this.tokenstorage.setToken(response);
      })
    );
  }

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
