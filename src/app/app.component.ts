import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notification } from './core/models/notification.model';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styles: ``,
})
export class AppComponent implements OnDestroy{
  title = 'CheckMate_Angular';
  notification!: Notification | null;
  notification$: Subscription;

  constructor(private notificationService: NotificationService) {
    this.notification$ = this.notificationService.message$.subscribe((notification) => this.notification = notification);
  }

  ngOnDestroy(): void {
    this.notification$.unsubscribe();
  }
}
