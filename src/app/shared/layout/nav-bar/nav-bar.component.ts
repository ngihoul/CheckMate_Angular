import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  
  templateUrl: './nav-bar.component.html',
  styles: ``
})
export class NavBarComponent implements OnDestroy {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService) {
    this.authService.initializeAuthState();
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.isAuthenticated = data);
    this.authService.isAdmin$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.isAdmin = data);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
