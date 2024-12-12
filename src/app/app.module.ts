import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SignupComponent } from './features/auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './features/auth/signin/signin.component';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { InitAccountComponent } from './features/auth/init-account/init-account.component';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { InviteComponent } from './features/auth/invite/invite.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AuthModule } from './features/auth/auth.module';
import { TournamentsModule } from './features/tournaments/tournaments.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    TournamentsModule,
    BrowserModule,
    RouterModule,
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
