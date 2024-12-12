import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { InitAccountComponent } from './init-account/init-account.component';
import { InviteComponent } from './invite/invite.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'init-compte', component: InitAccountComponent }, // TODO : canActivate: [AuthGuard]
  { path: 'invite', component: InviteComponent }, // TODO : canActivate: [AuthGuard]
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
