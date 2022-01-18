import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEchartsModule } from 'ngx-echarts';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculationService } from './_services/calculation.service';

import { EmissionItemComponent } from './emission-list/emission-item/emission-item.component';
import { EmissionListComponent } from './emission-list/emission-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CalculationListComponent } from './calculation-list/calculation-list.component';
import { CalculationCardComponent } from './calculation-card/calculation-card.component';
import { SpecificCalculationListComponent } from './specific-calculation-list/specific-calculation-list.component';
import { CalculationDiagramComponent } from './calculation-diagram/calculation-diagram.component';
import { CreateCalculationComponent } from './create-calculation/create-calculation.component';

import { NavigationService } from './shared/navigation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { BarDiagramComponent } from './calculation-diagram/bar-diagram/bar-diagram.component';
import { PieDiagramComponent } from './calculation-diagram/pie-diagram/pie-diagram.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslationManagerService } from './_services/translation-manager.service';


@NgModule({
  declarations: [
    AppComponent,
    EmissionItemComponent,
    EmissionListComponent,
    NavigationComponent,
    CalculationListComponent,
    CalculationCardComponent,
    SpecificCalculationListComponent,
	  CalculationDiagramComponent,
	  BarDiagramComponent,
	  PieDiagramComponent,
    CreateCalculationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    BrowserAnimationsModule,
	  FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [
    NavigationService,
    CalculationService,
    {
      provide: APP_INITIALIZER,
      useFactory: (tms: TranslationManagerService) => () => tms.load(),
      deps: [TranslationManagerService, TranslateService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
