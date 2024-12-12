import { AbstractControl, ValidationErrors } from "@angular/forms";

export function nbPlayersValidator (controlGroup: AbstractControl) {

    let errors: ValidationErrors;

    if (controlGroup.value.minPlayers && controlGroup.value.maxPlayers) {

        if (controlGroup.value.minPlayers > controlGroup.value.maxPlayers) {
            return { nbPlayers: "Le nombre de joueurs minimum ne peut pas être supérieur au nombre de joueurs maximum" };
        }

        return null;
    }
    else {
        errors = { nbPlayers: "Champ obligatoire" };
        return errors;
    }
}
