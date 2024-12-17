import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { samePasswordValidator } from '../../../shared/validators/same-password.directive';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-init-account',
  standalone: false,
  
  templateUrl: './init-account.component.html',
})

export class InitAccountComponent implements OnInit {
  initAccountForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router, 
    private notificationService: NotificationService
  ) {
    this.initAccountForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      checkPassword: ['', Validators.required], 
    });

    this.initAccountForm.setValidators(samePasswordValidator);
  }

  ngOnInit(): void {
    const token = this.authService.getToken();
    const payload = this.authService.getPayload(token);
    
    if(payload.Username && payload.Username.length > 0) {
      this.notificationService.set({
        type: 'error',
        message: 'Vous avez déjà un compte',
      });

      this.router.navigate(['']);
    }
  }

  canDeactivate(): boolean {
    return this.initAccountForm.dirty;
  }

  onSubmit() {
    const payload = this.authService.getPayload(this.authService.getToken());
    const userId = payload.Id;
    
    this.authService.initAccount(userId, this.initAccountForm.value).subscribe();
  }

  get username() {
    return this.initAccountForm.get('username');
  }

  get password() {
    return this.initAccountForm.get('password');
  }

  get checkPassword() {
    return this.initAccountForm.get('checkPassword');
  }
}
