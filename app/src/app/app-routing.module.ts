import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculationComponent } from './calculation/calculation.component';
import { EmisionComponent } from './emision/emision.component';


const routes: Routes = [
  { path: 'emision', pathMatch: 'full', component: EmisionComponent },
  { path: 'calculation', pathMatch: 'full' , component: CalculationComponent },
  { path: '',   redirectTo: '/emision', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
