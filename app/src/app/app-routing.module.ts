import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculationComponent } from './calculation/calculation.component';
import { EmissionComponent } from './emission/emission.component';


const routes: Routes = [
  { path: 'emission', component: EmissionComponent },
  { path: 'emission/:title', component: CalculationComponent },
  { path : "**", redirectTo:'emission'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
