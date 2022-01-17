import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculationService } from './_services/calculation.service';

import { EmissionItemComponent } from './emission-list/emission-item/emission-item.component';
import { EmissionListComponent } from './emission-list/emission-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ArrowComponent } from './navigation/arrow/arrow.component';
import { CardComponent } from './card/card.component';
import { CalculationListComponent } from './calculation-list/calculation-list.component';
import { CalculationCardComponent } from './calculation-card/calculation-card.component';
import { SpecificCalculationListComponent } from './specific-calculation-list/specific-calculation-list.component';


import { NavigationService } from './shared/navigation.service';


@NgModule({
  declarations: [

    AppComponent,
    EmissionItemComponent,
    EmissionListComponent,
    NavigationComponent,
    ArrowComponent,
    CardComponent,
    CalculationListComponent,
    CalculationCardComponent,
    SpecificCalculationListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    NavigationService,
    CalculationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
