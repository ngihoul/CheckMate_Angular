import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { HomeTournamentComponent } from './home-tournament/home-tournament.component';
import { DetailTournamentComponent } from './detail-tournament/detail-tournament.component';
import { adminGuard } from '../../core/guards/admin.guard';
import { dirtyFormGuard } from '../../core/guards/dirty-form.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeTournamentComponent },
  { path: 'detail/:id', component: DetailTournamentComponent },
  { path: 'creer', component: CreateComponent, canActivate: [adminGuard], canDeactivate: [dirtyFormGuard] },
  { path:'**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentsRoutingModule {}
