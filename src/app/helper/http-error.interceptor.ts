import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, NEVER } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../service/notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private notifier: NotificationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Auto logout if 401 response status returned whenever user present(&& this.authService.jwtUserValue)
        if (error.status === 401) {
          console.error(error);
          const isJwtExpired = error.error?.message?.toLowerCase().includes('jwt expired');
          let message = (isJwtExpired)
            ? 'Your session has expired. Please login again to continue working!'
            : 'You are not logged in. Please login!';

          this.notifier.showWarn('Oops', message);
          this.authService.logout();
          return empty();
        }

        if (error.status === 403) {
          console.error(error);
          this.notifier.showError('Access Denied', 'You are not authorized to access this page!');
          return empty();
        }

        if (error.status >= 500) {
          console.error(error);
          this.notifier.showError('Internal Server Error', 'Something went wrong, please try again later');
          return NEVER;
        }

        return throwError(error);
      }))
  }

}
