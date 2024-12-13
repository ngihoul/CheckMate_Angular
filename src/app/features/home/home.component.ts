import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Tournament } from '../../core/models/tournament.model';
import { TournamentService } from '../../core/services/tournament.service';
import { NotificationService } from '../../core/services/notification.service';
import { Notification } from '../../core/models/notification.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  tournaments: Tournament[] = [];
  notification!: Notification | null;
  notification$: Subscription;

  constructor(
    private authService: AuthService,
    private tournamentService: TournamentService,
    private notificationService: NotificationService,
  ) {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.isAuthenticated$.subscribe((data) => (this.isAuthenticated = data));

    this.tournamentService.getAll().subscribe((data) => (this.tournaments = data));

    this.notification$ = this.notificationService.message$.subscribe((notification) => (this.notification = notification));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.notification$.unsubscribe();
  }
}
