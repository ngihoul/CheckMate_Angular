import { HttpInterceptorFn } from "@angular/common/http";
import { LoadingService } from "../services/loading.service";
import { inject } from "@angular/core";
import { delay, finalize } from "rxjs";

export const loadingInterceptor: HttpInterceptorFn = (req, next,) => {
    const loadingService = inject(LoadingService);

    const timerId = setTimeout(() => loadingService.show(), 1000);

    return next(req).pipe(
        finalize(() => {
            loadingService.hide();

            if(timerId){
                clearTimeout(timerId);
              }
        })
    );
};