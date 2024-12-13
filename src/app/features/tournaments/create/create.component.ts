import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { nbPlayersValidator } from '../../../shared/validators/nb-players.directive';
import { eloValidator } from '../../../shared/validators/elo.directive';
import { endRegistrationValidator } from '../../../shared/validators/end-registration.directive';
import { Category } from '../../../core/models/category.model';
import { CategoryService } from '../../../core/services/category.service';
import { TournamentService } from '../../../core/services/tournament.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-create',
  standalone: false,

  templateUrl: './create.component.html',
  styles: ``,
})
export class CreateComponent {
  createTournamentForm: FormGroup;
  errorMessage: string | undefined = undefined;
  errorCategories: string | undefined = undefined;

  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private tournamentService: TournamentService,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    this.createTournamentForm = this.fb.group({
      name: ['', Validators.required],
      place: [''],
      minPlayers: ['', [Validators.required, Validators.min(2), Validators.max(32)]],
      maxPlayers: ['', [Validators.required, Validators.min(2), Validators.max(32)]],
      minElo: ['', [Validators.min(0), Validators.max(3000)]],
      maxElo: ['', [Validators.min(0), Validators.max(3000)]],
      categoriesIds: this.fb.array([]),
      womenOnly: [false, Validators.required],
      endRegistration: [''],
    });

    this.createTournamentForm.setValidators([nbPlayersValidator, eloValidator, endRegistrationValidator]);

    this.categoryService.getAll().subscribe({
      next: (categories: Category[]) => {
        (this.categories = categories), this.updateCategoriesForm(), (this.errorCategories = undefined);
      },
      error: () => (this.errorCategories = 'Une erreur est survenue'),
    });
  }

  updateCategoriesForm(): void {
    const categoryControls = this.categories.map(() => this.fb.control(false));
    const formArray = this.fb.array(categoryControls);
    this.createTournamentForm.setControl('categoriesIds', formArray);
  }

  createTournament(): void {
    this.createTournamentForm.value.categoriesIds = this.getSelectedCategories();

    if (this.createTournamentForm.valid) {
      this.tournamentService.create(this.createTournamentForm.value).subscribe({
        next: (tournament) => {
          this.notificationService.set({
            type: 'success',
            message: 'Le tournoi a bien été créé',
          }),
            (this.errorMessage = undefined),
            this.router.navigate([`detail/${tournament.id}`]);
        },
        error: () => (this.errorMessage = 'Une erreur est survenue'),
      });
    }
  }

  getSelectedCategories(): number[] {
    if (this.createTournamentForm.value.categoriesIds.every((isSelected: boolean) => !isSelected)) {
      return this.categories.map((category) => category.id);
    }

    return this.createTournamentForm.value.categoriesIds
      .map((isSelected: boolean, index: number) => (isSelected ? this.categories[index].id : null))
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
