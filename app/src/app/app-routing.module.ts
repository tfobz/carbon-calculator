import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculationComponent } from './calculation/calculation.component';
import { EmisionComponent } from './emision/emision.component';


const routes: Routes = [
  { path: 'emission', component: EmisionComponent },
  { path: 'emission/:title', component: CalculationComponent },
  { path : "**", redirectTo:'emission'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
