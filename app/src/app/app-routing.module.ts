import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculationListComponent } from './calculation-list/calculation-list.component';
import { EmissionListComponent } from './emission-list/emission-list.component';
import { SpecificCalculationListComponent } from './specific-calculation-list/specific-calculation-list.component';


const routes: Routes = [
  { path: 'emission', component: EmissionListComponent },
  { path: 'emission/:title', component: CalculationListComponent },
  { path: 'emission/:title/:sptitel', component: SpecificCalculationListComponent },
  { path : "**", redirectTo:'emission'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
