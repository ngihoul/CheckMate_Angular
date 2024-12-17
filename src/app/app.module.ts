import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AuthModule } from './features/auth/auth.module';
import { TournamentsModule } from './features/tournaments/tournaments.module';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

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
      withInterceptors([tokenInterceptor, loadingInterceptor]),
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
