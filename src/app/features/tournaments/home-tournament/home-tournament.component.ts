import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { TournamentService } from '../../../core/services/tournament.service';
import { Tournament } from '../../../core/models/tournament.model';
import { NotificationService } from '../../../core/services/notification.service';
import { Notification } from '../../../core/models/notification.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-tournament',
  standalone: false,

  templateUrl: './home-tournament.component.html',
  styles: ``,
})
export class HomeTournamentComponent implements OnDestroy {
  isAuthenticated!: boolean;
  tournaments!: Tournament[];
  notification!: Notification | null;
  notification$: Subscription;

  constructor(
    private authService: AuthService,
    private tournamentService: TournamentService,
    private notificationService: NotificationService,
  ) {
    this.authService.initializeAuthState();
    this.authService.isAuthenticated$.subscribe((data) => (this.isAuthenticated = data));

    this.tournamentService.getAll().subscribe((data) => (this.tournaments = data));

    this.notification$ = this.notificationService.message$.subscribe((notification) => (this.notification = notification));
  }

  ngOnDestroy(): void {
    this.notification$.unsubscribe();
  }
}
