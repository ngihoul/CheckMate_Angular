import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { TournamentService } from '../../../core/services/tournament.service';
import { Tournament } from '../../../core/models/tournament.model';

@Component({
  selector: 'app-home-tournament',
  standalone: false,

  templateUrl: './home-tournament.component.html',
  styles: ``,
})
export class HomeTournamentComponent {
  isAuthenticated!: boolean;
  tournaments!: Tournament[];

  constructor(
    private authService: AuthService,
    private tournamentService: TournamentService,
  ) {
    this.authService.initializeAuthState();
    this.authService.isAuthenticated$.subscribe((data) => (this.isAuthenticated = data));

    this.tournamentService.getAll().subscribe((data) => (this.tournaments = data));
  }
}
