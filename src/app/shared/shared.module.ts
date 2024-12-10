import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    HeaderComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class SharedModule { }
