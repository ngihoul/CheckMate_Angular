import { AbstractControl, ValidationErrors } from "@angular/forms";

export function eloValidator (controlGroup: AbstractControl) {
    if (controlGroup.value.minElo > controlGroup.value.maxElo) {
        return { elo: "L'elo minimum ne peut pas être supérieur au nombre de joueurs maximum" };
    }

    return null;
}
