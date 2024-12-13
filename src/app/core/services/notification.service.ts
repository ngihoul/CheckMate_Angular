import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  message!: Notification | null;

  constructor() {}

  set(message: Notification): void {
    this.message = message;
  }

  get(): Notification | null {
    if (!this.message) {
      return null;
    }

    return this.message;
  }

  clear(): void {
    this.message = null;
  }
}
