import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Login } from '../models/login.model';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { initAccountForm } from '../models/initAccountForm.model';
import { invitationForm } from '../models/invitationForm.model';

// TODO : create a token service

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string;
  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated);
  isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAdmin);

  constructor(private http: HttpClient, private router: Router) {
    this.apiUrl = environment.apiUrl;
  }

  initializeAuthState(): void {
    this.isAuthenticated$.next(this.isAuthenticated);
    this.isAdmin$.next(this.isAdmin);
  }

  get isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  get isAdmin(): boolean {
    const token = this.getToken();
    const payload = this.getPayload(token);

    if (!payload) {
      return false;
    }

    return payload.Role === 'Admin';
  }

  login(credentials: Login): Observable<string> {
    return this.http.post(`${this.apiUrl}/Login`, credentials, { responseType: 'text' }).pipe(
      tap((token: string) => {
        this.setToken(token);
        this.redirectAfterLogin();
      }),
    );
  }

  logout(): void {
    this.removeToken();
  }

  initAccount(userId: number, credentials: initAccountForm): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/init-account/${userId}`, credentials).pipe(
      tap((user: User) => {
        // Refresh token
        this.login({ usernameOrEmail: credentials.username, password: credentials.password } as Login).subscribe();
      }),
    );
  }

  invite(invitation: invitationForm): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/invite`, invitation);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticated$.next(this.isAuthenticated);
    this.isAdmin$.next(this.isAdmin);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
    this.isAuthenticated$.next(this.isAuthenticated);
    this.isAdmin$.next(this.isAdmin);
  }

  getPayload(token: string | null): any {
    if (!token) {
      return null;
    }

    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  getUserId(): number | null {
    const token = this.getToken();
    const payload = this.getPayload(token);

    if (!payload) {
      return null;
    }

    return payload.Id;
  }

  redirectAfterLogin(): void {
    const token = this.getToken();
    const payload = this.getPayload(token);

    if (!payload) {
      this.router.navigate(['login']);
      return;
    }

    if (!payload.Username) {
      this.router.navigate(['init-compte']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
