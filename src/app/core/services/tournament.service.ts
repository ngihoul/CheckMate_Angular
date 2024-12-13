import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Tournament, TournamentForm } from '../models/tournament.model';
import { TournamentFilters } from '../models/tournamentFilters.model';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  apiUrl: string;
  errorMessage : string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  get(id: number): Observable<Tournament> {
    return this.http.get<Tournament>(`${this.apiUrl}/Tournaments/${id}`);
  }

  getAll(filters?: TournamentFilters): Observable<Tournament[]> {
    let params = new HttpParams();

    if (filters) {
      params = this.createParams(filters);
    }

    return this.http.get<Tournament[]>(`${this.apiUrl}/Tournaments`, { params });
  }

  create(tournamentForm: TournamentForm): Observable<Tournament> {
    return this.http.post<Tournament>(`${this.apiUrl}/Tournaments`, tournamentForm);
  }

  register(tournamentId: number, userId: number) {
    return this.http.post<Tournament>(`${this.apiUrl}/Tournaments/${tournamentId}/register/${userId}`, {})
  }

  createParams(filters: TournamentFilters): HttpParams {
    let params = new HttpParams();

    if (filters.name) params = params.append('name', filters.name);
    if (filters.place) params = params.append('place', filters.place);
    // TODO : if (filters.categories) params = params.append('categories', filters.categories.join(','));
    if (filters.status) params = params.append('status', filters.status.toString());
    if (filters.womenOnly) params = params.append('womenOnly', filters.womenOnly.toString());
    if (filters.limit) params = params.append('limit', filters.limit.toString());
    if (filters.page) params = params.append('page', filters.page.toString());

    return params;
  }
}
