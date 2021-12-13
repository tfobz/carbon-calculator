import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EmisionCalculationComponent } from './emision/emision-calculation/emision-calculation.component';
import { EmisionComponent } from './emision/emision.component';
import { HeadComponent } from './head/head.component';
import { ArrowComponent } from './head/arrow/arrow.component';
import { CardComponent } from './card/card.component';
import { CalculationComponent } from './calculation/calculation.component';
import { CalculationCardComponent } from './calculation/calculation-card/calculation-card.component';
import { SharedDataService } from './shared/shared-data-service';

@NgModule({
  declarations: [
    AppComponent,
    EmisionCalculationComponent,
    EmisionComponent,
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

    SharedDataService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
