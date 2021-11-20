import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiComponent } from './ui/ui.component';
import { CalculationComponent } from './home/calculation/calculation.component';
import { HomeComponent } from './home/home.component';
import { HeadComponent } from './head/head.component';
import { ArrowComponent } from './head/arrow/arrow.component';

@NgModule({
  declarations: [
    AppComponent,
    UiComponent,
    CalculationComponent,
    HomeComponent,
    HeadComponent,
    ArrowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
