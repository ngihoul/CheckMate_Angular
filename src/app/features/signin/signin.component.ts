import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: false,
  
  templateUrl: './signin.component.html',
  styles: ``
})
export class SigninComponent {
  signInForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signInForm = this.fb.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    console.log(this.signInForm.value);
    this.authService.login(this.signInForm.value).subscribe(
      data => console.log(data)
    )
  }

  get usernameOrEmail() {
    return this.signInForm.get('usernameOrEmail');
  }

  get password() {
    return this.signInForm.get('password');
  }
}
