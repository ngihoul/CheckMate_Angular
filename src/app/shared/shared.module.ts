import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ListTournamentComponent } from './components/list-tournament/list-tournament.component';
import { AlertComponent } from './alert/alert.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ListPlayerComponent } from './components/list-player/list-player.component';
import { AgePipe } from './pipes/age.pipe';
import { FormErrorComponent } from './components/form-error/form-error.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavBarComponent,
    ListTournamentComponent,
    AlertComponent,
    SpinnerComponent,
    ListPlayerComponent,
    AgePipe,
    FormErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    NavBarComponent,
    ListTournamentComponent,
    AlertComponent,
    SpinnerComponent,
    ListPlayerComponent,
    AgePipe,
    FormErrorComponent
  ]
})
export class SharedModule { }
