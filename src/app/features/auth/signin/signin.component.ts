import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-signin',
  standalone: false,
  
  templateUrl: './signin.component.html',
  styles: ``
})
export class SigninComponent {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.signInForm = this.fb.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.authService.login(this.signInForm.value).subscribe({ 
      next: () => this.notificationService.setSuccess("Vous êtes connecté"),
      error: (error: any) => this.notificationService.setError(error)
    });
  }

  get usernameOrEmail() {
    return this.signInForm.get('usernameOrEmail');
  }

  get password() {
    return this.signInForm.get('password');
  }
}
