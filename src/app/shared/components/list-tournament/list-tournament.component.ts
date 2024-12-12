import { Component, Input } from '@angular/core';
import { Tournament } from '../../../core/models/tournament.model';

@Component({
  selector: 'app-list-tournament',
  standalone: false,
  
  templateUrl: './list-tournament.component.html',
  styles: ``
})
export class ListTournamentComponent {
  @Input() tournaments: Tournament[] = [];
  @Input() isAuthenticated: boolean = false;
}
