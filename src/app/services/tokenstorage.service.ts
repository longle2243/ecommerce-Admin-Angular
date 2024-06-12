import { Injectable } from '@angular/core';
import { Token } from '@app/interfaces/token.interface';

@Injectable({
  providedIn: 'root',
})
export class TokenstorageService {
  private storageKeyAccessToken = 'accessToken';
  private storageKeyRefreshToken = 'refreshToken';

  constructor() {}

  getAccessToken() {
    return localStorage.getItem(this.storageKeyAccessToken);
  }

  getRefreshToken() {
    return localStorage.getItem(this.storageKeyRefreshToken);
  }

  setToken(token: Token) {
    console.log("seted");
    
    localStorage.setItem(this.storageKeyAccessToken, token.accessToken);
    localStorage.setItem(this.storageKeyRefreshToken, token.refreshToken);
  }

  removeToken() {
    localStorage.removeItem(this.storageKeyAccessToken);
    localStorage.removeItem(this.storageKeyRefreshToken);
  }
}
