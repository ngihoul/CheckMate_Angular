import { Component, Input, OnInit } from '@angular/core';
import { Tournament } from '../../../core/models/tournament.model';
import { Game } from '../../../core/models/game.model';
import { Winner } from '../../../core/models/result.model';

@Component({
  selector: 'app-detail-round',
  standalone: false,
  
  templateUrl: './detail-round.component.html',
  styles: ``
})
export class DetailRoundComponent implements OnInit {
  nbRounds: number = 0;
  games: Game[] = [];

  WinnerEnum = Winner;

  @Input({ required: true }) tournament!: Tournament;
  @Input() roundId!: number | undefined;

  constructor() {}

  ngOnInit() {
    this.nbRounds = Math.max(...this.tournament.games.map(game => game.round));
    
    this.tournament.games.forEach(game => {
      const whitePlayer = this.tournament.players!.find(player => player.id === game.whiteId);
      const blackPlayer = this.tournament.players!.find(player => player.id === game.blackId);
      game.whiteName = whitePlayer?.username || '';
      game.blackName = blackPlayer?.username || '';
    });
    
    this.updateGames();
  }

  incrementRoundId() {
    this.roundId = this.roundId ? this.roundId + 1 : 1;
    this.roundId = this.roundId > this.nbRounds ? this.nbRounds : this.roundId;
    this.updateGames();
  }

  decrementRoundId() {
    this.roundId = this.roundId ? this.roundId - 1 : 1;
    this.roundId = this.roundId <= 0 ? 1 : this.roundId;
    this.updateGames();
  }

  updateGames() {
    this.games = this.tournament.games.filter(game => game.round === this.roundId);
  }
}
