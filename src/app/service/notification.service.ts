import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private ERROR_OPTION = { classname: 'bg-danger  rounded-lg shadow text-light' };
  private SUCCESS_OPTION = { classname: 'bg-success rounded-lg shadow text-light', delay: 7000 };
  private WARN_OPTION = { classname: 'bg-warning rounded-lg shadow ' };
  notifications: any[] = [];

  constructor() { }

  showError(header: string, body: string, options: any = this.ERROR_OPTION) {
    this.notifications.push({ header, body, ...options });
  }

  showSuccess(header: string, body: string, options: any = this.SUCCESS_OPTION) {
    this.notifications.push({ header, body, ...options });
  }

  showWarn(header: string, body: string, options: any = this.WARN_OPTION) {
    this.notifications.push({ header, body, ...options });
  }

  remove(notice: any) {
    this.notifications = this.notifications.filter(n => n !== notice);
  }

  // show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
  //   this.notifications.push({ textOrTpl, ...options });
  // }
}
