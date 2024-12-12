import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../../../core/services/tournament.service';
import { Tournament } from '../../../core/models/tournament.model';

@Component({
  selector: 'app-detail-tournament',
  standalone: false,
  
  templateUrl: './detail-tournament.component.html',
  styles: ``
})
export class DetailTournamentComponent {
  id: number;
  tournament!: Tournament;

  constructor(private route: ActivatedRoute, private tournamentService: TournamentService) {
    this.id = this.route.snapshot.params['id'];
    this.tournamentService.get(this.id).subscribe(data => this.tournament = data);
  }
}
