import { Component, Input, OnInit } from '@angular/core';
import { Tournament } from '../../../core/models/tournament.model';
import { TournamentService } from '../../../core/services/tournament.service';
import { Result } from '../../../core/models/result.model';

@Component({
  selector: 'app-ranking',
  standalone: false,
  
  templateUrl: './ranking.component.html',
  styles: ``
})
export class RankingComponent implements OnInit {
  results!: Result[];

  @Input({ required : true }) tournament!: Tournament;

  constructor(private tournamentService: TournamentService) {
    
  }

  ngOnInit() {
    this.tournamentService.getResult(this.tournament.id).subscribe((data) => (this.results = data));
  }
}
