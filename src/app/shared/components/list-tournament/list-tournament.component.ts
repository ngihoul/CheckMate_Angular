import { Component, Input } from '@angular/core';
import { Tournament } from '../../../core/models/tournament.model';
import { TournamentService } from '../../../core/services/tournament.service';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-list-tournament',
  standalone: false,

  templateUrl: './list-tournament.component.html',
  styles: ``,
})
export class ListTournamentComponent {
  @Input() tournaments: Tournament[] = [];
  @Input() isAuthenticated: boolean = false;

  errorMessage: string = '';

  constructor() {}
}
