import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculationListComponent } from './calculation-list/calculation-list.component';
import { EmissionListComponent } from './emission-list/emission-list.component';


const routes: Routes = [
  { path: 'emission', component: EmissionListComponent },
  { path: 'emission/:title', component: CalculationListComponent },
  { path : "**", redirectTo:'emission'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
