import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Tournament } from '../../core/models/tournament.model';
import { TournamentService } from '../../core/services/tournament.service';
import { NotificationService } from '../../core/services/notification.service';
import { Notification } from '../../core/models/notification.model';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  tournaments: Tournament[] = [];
  notification!: Notification | null;

  constructor(
    private authService: AuthService, 
    private tournamentService: TournamentService,
    private notificationService: NotificationService
  ) {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.isAuthenticated$.subscribe(data => this.isAuthenticated = data);

    this.tournamentService.getAll().subscribe(data => this.tournaments = data);
  }

  ngOnInit(): void {
    this.notification = this.notificationService.get();
  }
}
