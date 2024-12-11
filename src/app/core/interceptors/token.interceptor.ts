import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    const token = authService.getToken();

    if (token){
        let cloneReq = req.clone({
            setHeaders: {
                'Authorization': "Bearer " + token,
            },
        })
        return next(cloneReq)
    }

    return next(req);
};