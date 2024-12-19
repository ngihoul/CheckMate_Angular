import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  
  templateUrl: './nav-bar.component.html',
  styles: ``
})
export class NavBarComponent {
  private destroy$ = new Subject<void>();

  constructor(public authService: AuthService) {}
}
