import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SigninComponent } from './features/signin/signin.component';
import { InitAccountComponent } from './features/init-account/init-account.component';
import { InviteComponent } from './features/invite/invite.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'init-compte', component: InitAccountComponent }, // TODO : canActivate: [AuthGuard]
  { path: 'invite', component: InviteComponent }, // TODO : canActivate: [AuthGuard]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
