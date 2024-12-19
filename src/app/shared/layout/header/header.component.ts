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
  notification: Notification | null = null;

  constructor(
    public authService: AuthService, 
    private router: Router,
    private notificationService: NotificationService 
  ) {}

  logout(): void {
    this.authService.logout();
    this.notificationService.setSuccess('Vous êtes déconnecté');
    this.router.navigate(['']);
  }
}
