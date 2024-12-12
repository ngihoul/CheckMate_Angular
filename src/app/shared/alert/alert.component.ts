import { Component, Input } from '@angular/core';
import { Notification } from '../../core/models/notification.model';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-alert',
  standalone: false,
  
  templateUrl: './alert.component.html',
  styles: ``
})
export class AlertComponent {
  @Input({ required: true }) notification!: Notification;
  visible: boolean = true;

  constructor(private notificationService: NotificationService) { }

  close() {
    this.visible = false;
    this.notificationService.clear();
  }
}
