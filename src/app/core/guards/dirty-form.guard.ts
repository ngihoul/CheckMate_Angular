import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const dirtyFormGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  if (component.canDeactivate && component.canDeactivate()) {
    return window.confirm('Vous avez des modifications non enregistrées. Voulez-vous vraiment quitter cette page ?');
  }
  return true;
};