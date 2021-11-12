import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiComponent } from './ui/ui.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: UiComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
