import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'creer', component: CreateComponent }, // canActivate: [AuthGuard]
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentsRoutingModule { }
