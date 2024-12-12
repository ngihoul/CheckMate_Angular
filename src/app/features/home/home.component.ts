import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Tournament } from '../../core/models/tournament.model';
import { TournamentService } from '../../core/services/tournament.service';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
  isAuthenticated: boolean;
  tournaments: Tournament[] = [];

  constructor(private authService: AuthService, private tournamentService: TournamentService) {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.isAuthenticated$.subscribe(data => this.isAuthenticated = data);

    this.tournamentService.getAll().subscribe(data => this.tournaments = data);
  }
}
