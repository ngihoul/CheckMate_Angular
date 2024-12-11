import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SignupComponent } from './features/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './features/signin/signin.component';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { InitAccountComponent } from './features/init-account/init-account.component';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { InviteComponent } from './features/invite/invite.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    InitAccountComponent,
    InviteComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptors([tokenInterceptor]),
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
