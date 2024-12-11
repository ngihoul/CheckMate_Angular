import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
  isAuthenticated: boolean;

  constructor(private authService: AuthService) {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.isAuthenticated$.subscribe(data => this.isAuthenticated = data);
  }
}
