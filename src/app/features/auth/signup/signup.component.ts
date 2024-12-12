import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { samePasswordValidator } from '../../../shared/validators/same-password.directive';
import { Gender } from '../../../core/models/gender.model';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styles: ``
})

export class SignupComponent {

  signUpForm : FormGroup;
  genderChoices : Gender[] = [
    {
      label: "Homme",
      value: "M"
    },
    {
      label: "Femme",
      value: "F"
    },
    {
      label: "Autre",
      value: "O"
    },
  ]

  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      checkPassword: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', [Validators.required, Validators.pattern('^[MFO]$')]]
    });

    this.signUpForm.setValidators(samePasswordValidator);
  }

  onSubmit() {
    console.log(this.signUpForm.value);
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get checkPassword() {
    return this.signUpForm.get('checkPassword');
  }

  get dateOfBirth() {
    return this.signUpForm.get('dateOfBirth');
  }

  get gender() {
    return this.signUpForm.get('gender');
  }
}