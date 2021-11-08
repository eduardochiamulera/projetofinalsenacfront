import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContaBancariaFormComponent } from './conta-bancaria-form/conta-bancaria-form.component';
import { ContaBancariaListComponent } from './conta-bancaria-list/conta-bancaria-list.component';
import { ContaBancariaViewComponent } from './conta-bancaria-view/conta-bancaria-view.component';

const routes: Routes = [
  {path: '', component: ContaBancariaListComponent},
  {path: 'new', component: ContaBancariaFormComponent},
  {path: ':id/edit', component: ContaBancariaFormComponent},
  {path: ':id/view', component: ContaBancariaViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContabancariaRoutingModule { }
