import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { nbPlayersValidator } from '../../../shared/validators/nb-players.directive';
import { eloValidator } from '../../../shared/validators/elo.directive';
import { endRegistrationValidator } from '../../../shared/validators/end-registration.directive';
import { Category } from '../../../core/models/category.model';

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
      categoriesIds: this.buildCategoriesForm(),
      womenOnly: [false, Validators.required],
      endRegistration: [''],
    });

    this.createTournamentForm.setValidators([nbPlayersValidator, eloValidator, endRegistrationValidator]);
  }

  buildCategoriesForm() {
    const array = this.categories.map(() => this.fb.control(false));
    return this.fb.array(array);
  }

  createTournament(): void {
    const selectedCategories = this.getSelectedCategories();
    const formValue = {
      ...this.createTournamentForm.value,
      categoriesIds: selectedCategories
    };

    console.log(formValue);
  }

  getSelectedCategories(): number[] {
    // if this.createTournamentForm.value.categoriesIds is empty : select all categories id
    if (this.createTournamentForm.value.categoriesIds.every((isSelected: boolean) => !isSelected)) {
      return this.categories.map(category => category.id);
    }

    return this.createTournamentForm.value.categoriesIds
      .map((isSelected: boolean, index: number) => isSelected ? this.categories[index].id : null)
      .filter((id: number | null) => id !== null) as number[];
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
  
  get categoriesIds() {
    return this.createTournamentForm.get('categoriesIds') as FormArray;
  }

  getCategoryControl(index: number): FormControl {
    return this.categoriesIds.at(index) as FormControl;
  }

  get womenOnly() {
    return this.createTournamentForm.get('womenOnly');
  }
  
  get endRegistration() {
    return this.createTournamentForm.get('endRegistration');
  }
}
