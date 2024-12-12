import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../../../core/services/tournament.service';
import { Tournament } from '../../../core/models/tournament.model';
import { Notification } from '../../../core/models/notification.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-detail-tournament',
  standalone: false,
  
  templateUrl: './detail-tournament.component.html',
  styles: ``
})
export class DetailTournamentComponent implements OnInit {
  id: number;
  tournament!: Tournament;
  notification!: Notification | null;

  constructor(
    private route: ActivatedRoute, 
    private tournamentService: TournamentService,
    private notificationService: NotificationService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.tournamentService.get(this.id).subscribe(data => this.tournament = data);
  }

  ngOnInit(): void {
    this.notification = this.notificationService.get();
  }
}
