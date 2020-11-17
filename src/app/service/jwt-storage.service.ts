import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from '../model/user';

const TOKEN_KEY = 'auth-token';
const JWT_USER_KEY = 'auth-user';
const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class JwtStorageService {

  constructor() { }

  public saveJwtUser(user: User) {
    window.localStorage.removeItem(JWT_USER_KEY);
    window.localStorage.setItem(JWT_USER_KEY, JSON.stringify(user));
  }

  public getJwtUser(): User {
    return JSON.parse(localStorage.getItem(JWT_USER_KEY));
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public removeJwtData() {
    // window.localStorage.clear();
    window.localStorage.removeItem(JWT_USER_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
  }

  public isTokenNotExpired(): boolean {
    const token = this.getToken();
    return !jwtHelper.isTokenExpired(token);
  }

  tokenExpiresOn(): Date {
    const token = this.getToken();
    return jwtHelper.getTokenExpirationDate(token);
  }
}
