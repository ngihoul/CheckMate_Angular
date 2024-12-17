import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

export const adminGuard: CanActivateFn = (route, state) => {
    const notificationService = inject(NotificationService)
    const auth = inject(AuthService)
    const router = inject(Router)

    if (auth.isAdmin) {
        return true;
    } else {
        notificationService.set({
            type: 'error',
            message: 'Vous n\'avez pas accès à cette page',
        })
        router.navigate(['']);
        
        return false
    }
};