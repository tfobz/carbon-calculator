import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEchartsModule } from 'ngx-echarts';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculationService } from './_services/calculation.service';

import { EmissionItemComponent } from './emission-list/emission-item/emission-item.component';
import { EmissionListComponent } from './emission-list/emission-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ArrowComponent } from './navigation/arrow/arrow.component';
import { CalculationListComponent } from './calculation-list/calculation-list.component';
import { CalculationCardComponent } from './calculation-card/calculation-card.component';
import { SpecificCalculationListComponent } from './specific-calculation-list/specific-calculation-list.component';
import { CalculationDiagramComponent } from './calculation-diagram/calculation-diagram.component';


import { NavigationService } from './shared/navigation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    EmissionItemComponent,
    EmissionListComponent,
    NavigationComponent,
    ArrowComponent,
    CalculationListComponent,
    CalculationCardComponent,
    SpecificCalculationListComponent,
	  CalculationDiagramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    BrowserAnimationsModule,
	FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [
    NavigationService,
    CalculationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
