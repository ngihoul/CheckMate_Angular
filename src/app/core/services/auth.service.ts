import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Login } from '../models/login.model';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { initAccountForm } from '../models/initAccountForm.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string;
  isAuthenticated: boolean = false;
  isAuthenticated$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
    this.apiUrl = environment.apiUrl;
   }

   login(credentials: Login): Observable<string> {
    return this.http.post(`${this.apiUrl}/Login`, credentials, { responseType: 'text' }).pipe(
      tap(
        (token: string) => {
          this.setToken(token);
          this.redirectAfterLogin();
        }
      )
    );
  }

  logout(): void {
    this.removeToken();
  }

  initAccount(userId: number, credentials: initAccountForm): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/init-account/${userId}`, credentials).pipe(
      tap((user: User) => {
        console.log(user);
        // Refresh token
        this.login({usernameOrEmail: credentials.username, password: credentials.password} as Login).subscribe();
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticated = true;
    this.isAuthenticated$.next(this.isAuthenticated);
  }

  getToken(): string | null {
      return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.isAuthenticated$.next(this.isAuthenticated);
  }

  getPayload(token: string | null): any {
    return token ? jwtDecode(token) : null;
  }

  redirectAfterLogin() {
    const token = this.getToken();
    const payload = this.getPayload(token);

    if(!payload.Username) {
      this.router.navigate(['init-compte']);
    } else {
      this.router.navigate(['home']);
    }
  }
}

