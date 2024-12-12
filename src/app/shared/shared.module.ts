import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ListTournamentComponent } from './components/list-tournament/list-tournament.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavBarComponent,
    ListTournamentComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    NavBarComponent,
    ListTournamentComponent,
    AlertComponent
  ]
})
export class SharedModule { }
