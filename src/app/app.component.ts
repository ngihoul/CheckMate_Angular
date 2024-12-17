import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notification } from './core/models/notification.model';
import { NotificationService } from './core/services/notification.service';
import { LoadingService } from './core/services/loading.service';

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

  isLoading: boolean = false;

  constructor(private notificationService: NotificationService, private loadingService: LoadingService) {
    this.notification$ = this.notificationService.message$.subscribe((notification) => this.notification = notification);
    this.loadingService.isLoading.subscribe((isLoading) => this.isLoading = isLoading);
  }

  ngOnDestroy(): void {
    this.notification$.unsubscribe();
  }
}
