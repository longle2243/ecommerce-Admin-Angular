import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@app/config/url.api';
import { Account } from '@app/interfaces/account.interface';
import { Token } from '@app/interfaces/token.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = API_URL.auth;
  constructor(private http: HttpClient) {}

  login(account: Account): Observable<Token> {
    return this.http.post<Token>(this.url + '/login', account).pipe(
      tap((response) => {
        this.setToken(response);
      })
    );
  }

  forgot(email: string): Observable<string> {
    return this.http.post<string>(this.url + '/forgot-password', {
      email: email,
    });
  }

  resfreshToken(): Observable<Token> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<Token>(this.url, { refreshToken: refreshToken }).pipe(
      tap((response) => {
        this.setToken(response);
      })
    );
  }

  setToken(token: Token) {
    localStorage.setItem('accessToken', token.data.accessToken);
    localStorage.setItem('refreshToken', token.data.refreshToken);
  }

  isAuthenticated() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return true;
    }
    return false;
  }
}
