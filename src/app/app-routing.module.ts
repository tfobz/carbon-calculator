import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculationListComponent } from './calculation-list/calculation-list.component';
import { EmissionListComponent } from './emission-list/emission-list.component';
import { SpecificCalculationListComponent } from './specific-calculation-list/specific-calculation-list.component';
import { CalculationDiagramComponent } from './calculation-diagram/calculation-diagram.component';
import { CalculationDiagramCompareComponent } from './calculation-diagram-compare/calculation-diagram-compare.component';
import { CreateCalculationComponent } from './create-calculation/create-calculation.component';
import { CreateModuleComponent } from './create-module/create-module.component';
import { CreateTypeComponent } from './create-type/create-type.component';
import { TypeInputComponent } from './type-input/type-input.component';

import { CalculationSelectCompareComponent } from './calculation-select-compare/calculation-select-compare.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'emission', component: EmissionListComponent },
  { path: 'emission/settings', component: SettingsComponent },
  { path: 'emission/create', component: CreateCalculationComponent },
  { path: 'emission/:id', component: CalculationListComponent },
  { path: 'emission/:id/create', component: CreateModuleComponent },
  { path: 'emission/:id/diagram', component: CalculationDiagramComponent },
  { path: 'emission/:id/diagram/compare', component: CalculationSelectCompareComponent },
  { path: 'emission/:idone/diagram/:idtwo', component: CalculationDiagramCompareComponent },
  { path: 'emission/:id/:sptitle', component: SpecificCalculationListComponent },
  { path: 'emission/:id/:sptitle/create', component: CreateTypeComponent },
  { path: 'emission/:id/:sptitle/:typeID', component: TypeInputComponent},
  { path : "**", redirectTo:'emission'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
