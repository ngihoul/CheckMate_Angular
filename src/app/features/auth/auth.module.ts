import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitAccountComponent } from './init-account/init-account.component';
import { InviteComponent } from './invite/invite.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    InitAccountComponent,
    InviteComponent,
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AuthModule { }
