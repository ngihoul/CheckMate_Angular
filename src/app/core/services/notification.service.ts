import { Injectable } from '@angular/core';
import { Notification } from '../models/notification.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _message = new BehaviorSubject<Notification | null>(null);
  public message$ = this._message.asObservable();

  setError(error: any, message?: string): void {
    if(!message) {
      message = 'Une erreur est survenue'
    }

    this._message.next({ type: 'error', message: error.error || message });
  }

  setSuccess(message: string): void {
    this._message.next({ type: 'success', message });
  }

  set(message: Notification): void {
    this._message.next(message);
  }

  clear(): void {
    this._message.next(null);
  }
}
