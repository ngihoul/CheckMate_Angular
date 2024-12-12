import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Tournament, TournamentForm } from '../models/tournament.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
   }

  create(tournamentForm: TournamentForm): Observable<Tournament> {
    return this.http.post<Tournament>(`${this.apiUrl}/Tournaments`, tournamentForm);
  }
}
