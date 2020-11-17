import { Component, TemplateRef } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styles: [':host {width: 300px; z-index: 1200; position: fixed; top: 50px; right: 0%; margin: 0.5em;}']
  // host: { '[class.ngb-toasts]': 'true' }
})
export class NotificationComponent {
  autohide = false;

  constructor(public notifier: NotificationService) { }

  // isTemplate(notice: any) {
  //   return notice.textOrTpl instanceof TemplateRef;
  // }
}
