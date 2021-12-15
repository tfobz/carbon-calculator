import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EmissionCalculationComponent } from './emission/emission-calculation/emission-calculation.component';
import { EmissionComponent } from './emission/emission.component';
import { HeadComponent } from './head/head.component';
import { ArrowComponent } from './head/arrow/arrow.component';
import { CardComponent } from './card/card.component';
import { CalculationComponent } from './calculation/calculation.component';
import { CalculationCardComponent } from './calculation/calculation-card/calculation-card.component';


@NgModule({
  declarations: [
    AppComponent,
    EmissionCalculationComponent,
    EmissionComponent,
    HeadComponent,
    ArrowComponent,
    CardComponent,
    CalculationComponent,
    CalculationCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
