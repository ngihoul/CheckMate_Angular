import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Tournament } from '../../../core/models/tournament.model';
import { Game } from '../../../core/models/game.model';
import { Winner } from '../../../core/models/result.model';
import { AuthService } from '../../../core/services/auth.service';
import { GameService } from '../../../core/services/game.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Notification } from '../../../core/models/notification.model';
import { TournamentService } from '../../../core/services/tournament.service';

@Component({
  selector: 'app-detail-round',
  standalone: false,
  
  templateUrl: './detail-round.component.html',
  styles: ``
})
export class DetailRoundComponent implements OnInit, OnChanges {
  nbRounds: number = 0;
  games: Game[] = [];

  WinnerEnum = Winner;

  isAdmin: boolean = false;

  notification: Notification | null = null;
  errorMessage: string = "";

  @Input({ required: true }) tournament!: Tournament;
  @Input() roundNumber!: number | undefined;

  @Output() roundNumberChanged = new EventEmitter<number>();

  constructor(
    private authService: AuthService,
    private tournamentService: TournamentService, 
    private gameService: GameService,
    private notificationService: NotificationService
  ) {
    this.authService.isAdmin$.subscribe((data) => { this.isAdmin = data });
  }

  ngOnInit() {
    this.nbRounds = Math.max(...this.tournament.games.map(game => game.round));
    
    this.fetchUserNames();
    
    this.updateGames();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["tournament"]) {
      this.fetchUserNames();
    }
  }

  incrementRoundId(): void {
    this.roundNumber = this.roundNumber ? this.roundNumber + 1 : 1;
    this.roundNumber = this.roundNumber > this.nbRounds ? this.nbRounds : this.roundNumber;
    this.updateGames();
  }

  decrementRoundId(): void {
    this.roundNumber = this.roundNumber ? this.roundNumber - 1 : 1;
    this.roundNumber = this.roundNumber <= 0 ? 1 : this.roundNumber;
    this.updateGames();
  }

  updateGames(): void {
    this.games = this.tournament.games.filter(game => game.round === this.roundNumber);
  }

  fetchUserNames() {
    this.tournament.games.forEach(game => {
      const whitePlayer = this.tournament.players!.find(player => player.id === game.whiteId);
      const blackPlayer = this.tournament.players!.find(player => player.id === game.blackId);
      game.whiteName = whitePlayer?.username || '';
      game.blackName = blackPlayer?.username || '';
    });
  }

  updateGameResult(event: Event, game: Game) {
    const winner = Number((event.target as HTMLSelectElement).value);
    this.gameService.setResult(game.id, winner).subscribe({
      next: () => {
        this.games.find(g => g.id === game.id)!.winner = winner;
        this.notificationService.setSuccess("Le match a bien été mis à jour")
      },
      error: (error: any) => this.notificationService.setError(error)
    });
  }

  allGamesAreCompleted() {
    return this.games.every(game => game.winner !== Winner.notPlayed);
  }

  nextRound() {
    this.tournamentService.nextRound(this.tournament.id).subscribe({
      next: () => {
        this.incrementRoundId(),
        this.roundNumberChanged.emit(this.roundNumber!),
        this.notificationService.setSuccess("Le tournoi a bien été mis à jour")
      },
      error: (error: any) => {
        this.notificationService.setError(error);
      }
    })
  }
}
