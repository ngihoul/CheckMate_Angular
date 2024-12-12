import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  
  templateUrl: './nav-bar.component.html',
  styles: ``
})
export class NavBarComponent {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  /**
   *
   */
  constructor(private authService: AuthService) {
    this.authService.isAuthenticated$.subscribe(data => this.isAuthenticated = data);
    this.authService.isAdmin$.subscribe(data => this.isAdmin = data);
  }
}
