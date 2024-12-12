import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: false,
  
  templateUrl: './signin.component.html',
  styles: ``
})
export class SigninComponent {
  signInForm: FormGroup;
  errorMessage: string | undefined = undefined;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signInForm = this.fb.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.authService.login(this.signInForm.value).subscribe({ 
      next: (token: string) => this.errorMessage = undefined,
      error: (error: any) => this.errorMessage = "Une erreur est survenue" 
    });
  }

  get usernameOrEmail() {
    return this.signInForm.get('usernameOrEmail');
  }

  get password() {
    return this.signInForm.get('password');
  }
}
