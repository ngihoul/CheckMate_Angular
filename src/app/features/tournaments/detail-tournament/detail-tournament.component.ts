import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../../../core/services/tournament.service';
import { Tournament } from '../../../core/models/tournament.model';
import { Notification } from '../../../core/models/notification.model';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-tournament',
  standalone: false,

  templateUrl: './detail-tournament.component.html',
  styles: ``,
})
export class DetailTournamentComponent implements OnInit, OnDestroy {
  id: number;
  tournament!: Tournament;
  notification!: Notification | null;
  notification$: Subscription;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.tournamentService.get(this.id).subscribe((data) => (this.tournament = data));

    this.notification$ = this.notificationService.message$.subscribe((notification) => this.notification = notification);
  }

  ngOnInit(): void {
  }

  register() {
    this.isLoading = true;

    const userId = this.authService.getUserId();

    if (!userId) {
      this.errorMessage = 'Vous devez être connecté pour vous inscrire à un tournoi';
      this.notificationService.set({ type: 'error', message: this.errorMessage });

      return;
    }

    return this.tournamentService.register(this.id, userId).subscribe({
      next: () => {
        this.notificationService.set({
          type: 'success',
          message: 'Vous êtes inscrit au tournoi',
        }),
        this.tournamentService.get(this.id).subscribe((data) => (this.tournament = data));
      },
      error: (error: any) => {
        this.errorMessage = error.error;
        this.notificationService.set({
          type: 'error',
          message: this.errorMessage,
        }),
        this.isLoading = false
      },
      complete: () => (this.isLoading = false),
    });
  }

  ngOnDestroy(): void {
    this.notification$.unsubscribe();
  }
}
