import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nbPlayersValidator } from '../../../shared/validators/nb-players.directive';
import { eloValidator } from '../../../shared/validators/elo.directive';
import { endRegistrationValidator } from '../../../shared/validators/end-registration.directive';

@Component({
  selector: 'app-create',
  standalone: false,
  
  templateUrl: './create.component.html',
  styles: ``
})
export class CreateComponent {
  createTournamentForm: FormGroup;
  errorMessage: string | undefined = undefined;

  categories: Category[] = [
    { id: 1, name: 'Junior', rules: '< 18 yo' },
    { id: 2, name: 'Senior', rules: '>= 18 yo' },
    { id: 3, name: 'Veteran', rules: '> 60yo' },
  ]

  constructor(private fb: FormBuilder) {
    this.createTournamentForm =  this.fb.group({
      name: ['', Validators.required],
      place: [''],
      minPlayers: ['', [Validators.required, Validators.min(2), Validators.max(32)]],
      maxPlayers: ['', [Validators.required, Validators.min(2), Validators.max(32)]],
      minElo: ['', [Validators.min(0), Validators.max(3000)]],
      maxElo: ['', [Validators.min(0), Validators.max(3000)]],
      categoriesId: this.fb.array([1, 2, 3], Validators.required),
      womenOnly: [false, Validators.required],
      endRegistration: [''],
    });

    this.createTournamentForm.setValidators([nbPlayersValidator, eloValidator, endRegistrationValidator]);
    
  }

  createTournament(): void {

  }

  get name() {
    return this.createTournamentForm.get('name');
  }
  
  get place() {
    return this.createTournamentForm.get('place');
  }
  
  get minPlayers() {
    return this.createTournamentForm.get('minPlayers');
  }
  
  get maxPlayers() {
    return this.createTournamentForm.get('maxPlayers');
  }
  
  get minElo() {
    return this.createTournamentForm.get('minElo');
  }
  
  get maxElo() {
    return this.createTournamentForm.get('maxElo');
  }
  
  get categoriesId() {
    return this.createTournamentForm.get('categoriesId');
  }
  

  get womenOnly() {
    return this.createTournamentForm.get('womenOnly');
  }
  
  get endRegistration() {
    return this.createTournamentForm.get('endRegistration');
  }
}
