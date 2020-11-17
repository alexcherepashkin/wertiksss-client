import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtStorageService } from '../service/jwt-storage.service';
import { AuthService } from '../service/auth.service';

const JWT_HEADER_KEY = 'Authorization';
const JWT_PREFIX = 'Bearer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storageService: JwtStorageService, private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add auth header with jwt if user is logged in and request is to the api url
    // const isApiUrl = request.url.startsWith(environment.apiUrl);
    let authRequest = request;

    const userValue = this.authService.jwtUserValue;
    const token = this.storageService.getToken();
    // const isLoggedIn = userValue && this.storageService.isTokenNotExpired();

    if (userValue) {
      authRequest = request.clone({ headers: request.headers.set(JWT_HEADER_KEY, `${JWT_PREFIX} ${token}`) });
    }

    return next.handle(authRequest);
  }
}
