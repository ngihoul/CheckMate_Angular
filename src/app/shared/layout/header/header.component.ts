import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Notification } from '../../../core/models/notification.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  isAuthenticated!: boolean;
  username: string = '';

  notification: Notification | null = null;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private notificationService: NotificationService 
  ) {
    this.isAuthenticated = this.authService.isAuthenticated;

    this.authService.isAuthenticated$.subscribe({
      next: (data: boolean) => (this.isAuthenticated = data),
    });
  }

  logout(): void {
    this.authService.logout();
    this.notificationService.set({
      type: 'success',
      message: 'Vous êtes déconnecté',
    })
    this.router.navigate(['']);
  }
}
