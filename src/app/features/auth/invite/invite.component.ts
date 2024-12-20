import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gender } from '../../../core/models/gender.model';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-invite',
  standalone: false,
  templateUrl: './invite.component.html',
  styles: ``,
})
export class InviteComponent {
  inviteForm: FormGroup;
  formSubmitted: boolean = false;
  genderChoices: Gender[] = [
    {
      label: 'Homme',
      value: 'M',
    },
    {
      label: 'Femme',
      value: 'F',
    },
    {
      label: 'Autre',
      value: 'O',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', [Validators.required, Validators.pattern('^[MFO]$')]],
    });
  }
  
  canDeactivate(): boolean {
    return this.inviteForm.dirty && !this.formSubmitted;
  }
  
  onSubmit() {
    this.formSubmitted = true;

    this.authService.invite(this.inviteForm.value).subscribe({
      next: () => {
        this.notificationService.setSuccess("L'invitation a bien été envoyée"),
        this.router.navigate([''])
      },
      error: (error: any) => { 
        this.formSubmitted = false,
        this.notificationService.setError(error)
      }
    });
  }

  get email() {
    return this.inviteForm.get('email');
  }

  get dateOfBirth() {
    return this.inviteForm.get('dateOfBirth');
  }

  get gender() {
    return this.inviteForm.get('gender');
  }
}
