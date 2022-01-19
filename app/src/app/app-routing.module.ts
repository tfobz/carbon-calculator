import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculationListComponent } from './calculation-list/calculation-list.component';
import { EmissionListComponent } from './emission-list/emission-list.component';
import { SpecificCalculationListComponent } from './specific-calculation-list/specific-calculation-list.component';
import { CalculationDiagramComponent } from './calculation-diagram/calculation-diagram.component';
import { CalculationDiagramCompareComponent } from './calculation-diagram-compare/calculation-diagram-compare.component';
import { CreateCalculationComponent } from './create-calculation/create-calculation.component';
import { CreateModuleComponent } from './create-module/create-module.component';

const routes: Routes = [
  { path: 'emission', component: EmissionListComponent },
  { path: 'emission/create', component: CreateCalculationComponent },
  { path: 'emission/:title', component: CalculationListComponent },
  { path: 'emission/:title/create', component: CreateModuleComponent },
  { path: 'emission/:title/diagram', component: CalculationDiagramComponent },
  { path: 'emission/:titleone/diagram/:titletwo', component: CalculationDiagramCompareComponent },
  { path: 'emission/:title/:sptitle', component: SpecificCalculationListComponent },
  { path : "**", redirectTo:'emission'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
