import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TournamentsRoutingModule } from './tournaments-routing.module';
import { HomeTournamentComponent } from './home-tournament/home-tournament.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DetailTournamentComponent } from './detail-tournament/detail-tournament.component';



@NgModule({
  declarations: [
    CreateComponent,
    HomeTournamentComponent,
    DetailTournamentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    TournamentsRoutingModule
  ]
})
export class TournamentsModule { }