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
  tournaments!: Tournament[];

  constructor(
    public authService: AuthService,
    private tournamentService: TournamentService,
  ) {
    this.tournamentService.getAll().subscribe((data) => (this.tournaments = data));
  }
}
