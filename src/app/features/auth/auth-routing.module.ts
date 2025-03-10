import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { InitAccountComponent } from './init-account/init-account.component';
import { InviteComponent } from './invite/invite.component';
import { authGuard } from '../../core/guards/auth.guard';
import { dirtyFormGuard } from '../../core/guards/dirty-form.guard';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'init-compte', component: InitAccountComponent, canActivate: [authGuard], canDeactivate: [dirtyFormGuard] },
  { path: 'invite', component: InviteComponent, canActivate: [authGuard], canDeactivate: [dirtyFormGuard] },
  { path:'**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
