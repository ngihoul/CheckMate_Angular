import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { Winner } from '../models/result.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
   }

  setResult(gameId: number, winner: Winner): Observable<Game> {
    return this.http.post<Game>(`${this.apiUrl}/Games/${gameId}/score/${winner}`, {})
  }
}
