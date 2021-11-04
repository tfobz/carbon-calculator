import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiComponent } from './ui/ui.component';
import { CalculationComponent } from './ui/home/calculation/calculation.component';
import { HomeComponent } from './ui/home/home.component';
import { TitleComponent } from './ui/title/title.component';
import { ArrowComponent } from './ui/title/arrow/arrow.component';

@NgModule({
  declarations: [
    AppComponent,
    UiComponent,
    CalculationComponent,
    HomeComponent,
    TitleComponent,
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
