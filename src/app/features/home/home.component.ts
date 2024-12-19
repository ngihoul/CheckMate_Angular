import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Tournament } from '../../core/models/tournament.model';
import { TournamentService } from '../../core/services/tournament.service';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent {
  tournaments: Tournament[] = [];

  constructor(
    public authService: AuthService,
    private tournamentService: TournamentService,
  ) {
    this.tournamentService.getAll().subscribe((data) => (this.tournaments = data));
  }
}
