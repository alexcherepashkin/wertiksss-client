import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { NotificationService } from '../service/notification.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse): void {
    const notifier = this.injector.get(NotificationService);
    const router = this.injector.get(Router);
    const zone = this.injector.get(NgZone);

    console.error(error);

    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        zone.run(() => notifier.showWarn('Holy guacamole!', 'No Internet Connection'));
      }
      else if (error.status === 401) {
        zone.run(() => router.navigate(['./auth/login'], { queryParams: { returnUrl: router.routerState.snapshot.url } }));
      }
      else if (error.status === 403) {
        zone.run(() => notifier.showError('Access Denied', 'You are not authorized to access this page!'));
      }
      else if (error.status >= 500) {
        zone.run(() => notifier.showError('Internal Server Error', 'Something went wrong, please try again later!'));
      }
      else {
        zone.run(() => notifier.showError('Oops', error.error?.message || 'Something went wrong, please try again later!'));
      }
    }

    else {
      zone.run(() => router.navigate(['/error'], { skipLocationChange: true }));
    }
  }

}
