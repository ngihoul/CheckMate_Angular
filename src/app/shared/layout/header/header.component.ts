import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  isAuthenticated!: boolean;
  username: string = "";

  constructor(private authService: AuthService, private router: Router) {
    this.isAuthenticated = this.authService.isAuthenticated;
    
    this.authService.isAuthenticated$.subscribe({
      next: (data: boolean) => this.isAuthenticated = data
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['home']);
  }
}
