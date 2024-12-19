import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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

  private _isAuthenticated = signal(false);
  isAuthenticated = this._isAuthenticated.asReadonly();

  private _isAdmin = signal(false);
  isAdmin = this._isAdmin.asReadonly();

  constructor(private http: HttpClient, private router: Router) {
    this.apiUrl = environment.apiUrl;
    this.initializeAuth();
  }

  initializeAuth(): void {
    const token = this.getToken();
    const payload = this.getPayload(token);

    if (!payload) {
      this._isAuthenticated.set(false);
      this._isAdmin.set(false);
      return;
    }

    if(!this.isValid(payload)) {
      this._isAuthenticated.set(false);
      return;
    }

    if (payload.Role === 'Admin') {
      this._isAdmin.set(true);
    }

    return this._isAuthenticated.set(true);
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
      tap(() => {
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
    this._isAuthenticated.set(true);

    if(this.isAdminTest()) {
      this._isAdmin.set(true);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');

    this._isAuthenticated.set(false);
    this._isAdmin.set(false);
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

  isAdminTest(): boolean {
    const token = this.getToken();
    const payload = this.getPayload(token);

    if (!payload) {
      return false;
    }

    return payload.Role === 'Admin';
  }

  isValid(payload: any): boolean {
    if(!payload) {
      return false;
    }

    const expirationDate = new Date(payload.exp * 1000);
    return expirationDate > new Date();
  }
  redirectAfterLogin(): void {
    const token = this.getToken();
    const payload = this.getPayload(token);

    if (!payload) {
      this.router.navigate(['login']);
      return;
    }

    console.log(payload);

    if (!payload.Username) {
      this.router.navigate(['auth/init-compte']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
