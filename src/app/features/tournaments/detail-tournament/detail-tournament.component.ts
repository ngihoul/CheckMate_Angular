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

  isBtnLoading: boolean = false;
  isPageLoading: boolean = false;

  isAdmin: boolean = false;
  today: Date = new Date();

  isStarted!: boolean;

  roundNumber: number | undefined = undefined;

  tournamentStatus = TournamentStatus;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.userId = this.authService.getUserId();

    this.authService.isAdmin$.subscribe((data) => { 
      this.isAdmin = data
    });

    this.tournamentService.get(this.id).subscribe((data) => {
      this.tournament = data,
      this.updateTournamentStatus();
    });
  }

  register() {
    this.isBtnLoading = true;

    if (!this.userId) {
      this.notificationService.set({ 
        type: 'error', 
        message: 'Vous devez être connecté pour vous inscrire à un tournoi' 
      });

      return;
    }

    return this.tournamentService.register(this.id, this.userId).subscribe({
      next: () => {
        this.notificationService.setSuccess('Vous êtes inscrit au tournoi'),
        this.tournamentService.get(this.id).subscribe((data) => (this.tournament = data));
      },
      error: (error: any) => {
        this.notificationService.setError(error),
        this.isBtnLoading = false
      },
      complete: () => (this.isBtnLoading = false),
    });
  }

  unregister() {
    this.isBtnLoading = true;

    if (!this.userId) {
      this.notificationService.set({ type: 'error', message: 'Vous devez être connecté pour vous inscrire à un tournoi' });

      return;
    }

    return this.tournamentService.unregister(this.id, this.userId).subscribe({
      next: () => {
        this.notificationService.setSuccess('Vous êtes désinscrit du tournoi'),
        this.tournamentService.get(this.id).subscribe((data) => (this.tournament = data));
      },
      error: (error: any) => {
        this.notificationService.setError(error),
        this.isBtnLoading = false
      },
      complete: () => (this.isBtnLoading = false),
    });
  }

  start() {
    this.isPageLoading = true;

    this.tournamentService.start(this.id).subscribe({
      next: () => {
        this.notificationService.setSuccess('Le tournoi a commencé'),

        this.tournamentService.get(this.id).subscribe((data) =>  {
          this.tournament = data
          this.updateTournamentStatus();
        });
      },
      error: (error: any) => {
        this.notificationService.setError(error),
        this.isPageLoading = false
      }
    });
  }

  roundNumberChange() {
    this.tournamentService.get(this.id).subscribe((data) => {
      this.tournament = data
    });
  }

  updateTournamentStatus() {
    this.isStarted = this.tournament.status === TournamentStatus.onGoing;

      if(this.isStarted) {
        this.roundNumber = this.tournament.currentRound 
      }
  }
}
