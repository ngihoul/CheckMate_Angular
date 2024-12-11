import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gender } from '../../core/models/gender.model';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invite',
  standalone: false,
  templateUrl: './invite.component.html',
  styles: ``
})

export class InviteComponent {

  inviteForm : FormGroup;
  errorMessage : string | undefined = undefined;
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


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', [Validators.required, Validators.pattern('^[MFO]$')]]
    });
  }

  onSubmit() {
    console.log(this.inviteForm.value);
    
    this.authService.invite(this.inviteForm.value).subscribe({
      next: () => { 
        this.router.navigate(['home']),
        this.errorMessage = undefined;
      },
      error: () => this.errorMessage = "Une erreur est survenue"
    })
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