import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

export const authGuard: CanActivateFn = (route, state) => {
    const notificationService = inject(NotificationService)
    const authService = inject(AuthService)
    const router = inject(Router)

    if (authService.isAuthenticated()) {
        return true;
    } else {
        notificationService.set({
            type: 'error',
            message: 'Vous devez vous connecter pour accéder à cette page',
        })
        router.navigate(['']);
        
        return false
    }
};