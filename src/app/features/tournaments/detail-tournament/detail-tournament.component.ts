import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../../../core/services/tournament.service';
import { Tournament, TournamentStatus } from '../../../core/models/tournament.model';
import { Notification } from '../../../core/models/notification.model';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-detail-tournament',
  standalone: false,

  templateUrl: './detail-tournament.component.html',
  styles: ``,
})
export class DetailTournamentComponent {
  id: number;
  userId: number | null;

  tournament!: Tournament;

  notification!: Notification | null;
  errorMessage: string = '';

  isBtnLoading: boolean = false;
  isPageLoading: boolean = false;

  isAdmin: boolean = false;
  today: Date = new Date();

  nbRound: number = 0;
  fakeArray: number[] = []

  isStarted!: boolean;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.userId = this.authService.getUserId();

    this.authService.isAdmin$.subscribe((data) => (this.isAdmin = data));

    this.tournamentService.get(this.id).subscribe((data) => {
      this.tournament = data,
      this.isStarted = this.tournament.status === TournamentStatus.onGoing;
      this.nbRound = Math.max(...this.tournament.games.map(game => game.round));
      this.fakeArray = Array(this.nbRound).fill(0);
    });
  }

  register() {
    this.isBtnLoading = true;

    if (!this.userId) {
      this.errorMessage = 'Vous devez être connecté pour vous inscrire à un tournoi';
      this.notificationService.set({ type: 'error', message: this.errorMessage });

      return;
    }

    return this.tournamentService.register(this.id, this.userId).subscribe({
      next: () => {
        this.notificationService.set({
          type: 'success',
          message: 'Vous êtes inscrit au tournoi',
        }),

        this.tournamentService.get(this.id).subscribe((data) => (this.tournament = data));
      },
      error: (error: any) => {
        this.errorMessage = error.error || 'Une erreur est survenue';
        this.notificationService.set({
          type: 'error',
          message: this.errorMessage,
        }),

        this.isBtnLoading = false
      },
      complete: () => (this.isBtnLoading = false),
    });
  }

  unregister() {
    this.isBtnLoading = true;

    if (!this.userId) {
      this.errorMessage = 'Vous devez être connecté pour vous inscrire à un tournoi';
      this.notificationService.set({ type: 'error', message: this.errorMessage });

      return;
    }

    return this.tournamentService.unregister(this.id, this.userId).subscribe({
      next: () => {
        this.notificationService.set({
          type: 'success',
          message: 'Vous êtes désinscrit du tournoi',
        }),

        this.tournamentService.get(this.id).subscribe((data) => (this.tournament = data));
      },
      error: (error: any) => {
        this.errorMessage = error.error || 'Une erreur est survenue';
        this.notificationService.set({
          type: 'error',
          message: this.errorMessage,
        }),

        this.isBtnLoading = false
      },
      complete: () => (this.isBtnLoading = false),
    });
  }

  startTournament() {
    this.isPageLoading = true;

    this.tournamentService.start(this.id).subscribe({
      next: () => {
        this.notificationService.set({
          type: 'success',
          message: 'Le tournoi a commencé',
        }),

        this.tournamentService.get(this.id).subscribe((data) => (this.tournament = data));
      },
      error: (error: any) => {
        this.errorMessage = error.error || 'Une erreur est survenue';
        this.notificationService.set({
          type: 'error',
          message: this.errorMessage,
        }),

        this.isPageLoading = false
      }
    });
  }
}
