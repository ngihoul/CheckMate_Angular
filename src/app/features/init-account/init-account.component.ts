import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { samePasswordValidator } from '../../shared/validators/same-password.directive';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-init-account',
  standalone: false,
  
  templateUrl: './init-account.component.html',
})

export class InitAccountComponent {
  initAccountForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.initAccountForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      checkPassword: ['', Validators.required], 
    });

    this.initAccountForm.setValidators(samePasswordValidator);
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
