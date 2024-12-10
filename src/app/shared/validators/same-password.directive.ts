import { AbstractControl, ValidationErrors } from "@angular/forms";

export function samePasswordValidator (controlGroup: AbstractControl) {

    let errors: ValidationErrors;

    if (controlGroup.value.password && controlGroup.value.checkPassword) {

        if (controlGroup.value.password !== controlGroup.value.checkPassword) {
            return { samePassword: "Mots de passe différents" };
        }

        return null;
    }
    else {
        errors = { samePassword: "Champ obligatoire" };
        return errors;
    }
}
