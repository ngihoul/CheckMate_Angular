import { AbstractControl, ValidationErrors } from "@angular/forms";
import { max } from "rxjs";

export function endRegistrationValidator (controlGroup: AbstractControl) {

    let errors: ValidationErrors;

    if (controlGroup.value.endRegistration) {

      const today = new Date();
      const minPlayers = controlGroup.value.minPlayers

      const maxDateRegistration = addDays(today, minPlayers);

      if (new Date(controlGroup.value.endRegistration) < maxDateRegistration) {
          return { endRegistration: `La date butoir des inscriptions doit être supérieure ou égale à ${maxDateRegistration.toLocaleDateString('fr')}` };
      }

      return null;
    }
    else {
      errors = { endRegistration: "Champ obligatoire" };
      return errors;
    }
}

function addDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}