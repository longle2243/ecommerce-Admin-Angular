import { Token } from "@app/interfaces/token.interface";

const storageKeyAccessToken = 'accessToken';
const storageKeyRefreshToken = 'refreshToken';

export function getAccessToken() {
  return localStorage.getItem(storageKeyAccessToken);
}

export function getRefreshToken() {
  return localStorage.getItem(storageKeyRefreshToken);
}

export function setToken(token: Token) {
  localStorage.setItem(storageKeyAccessToken, token.data.accessToken);
  localStorage.setItem(storageKeyRefreshToken, token.data.refreshToken);
}

export function removeToken() {
  localStorage.removeItem(storageKeyAccessToken);
  localStorage.removeItem(storageKeyRefreshToken);
}
