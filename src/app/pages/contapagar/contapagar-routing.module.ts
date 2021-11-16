import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContaPagarFormComponent } from './conta-pagar-form/conta-pagar-form.component';
import { ContaPagarListComponent } from './conta-pagar-list/conta-pagar-list.component';
import { ContaPagarViewComponent } from './conta-pagar-view/conta-pagar-view.component';

const routes: Routes = [
  {path: '', component: ContaPagarListComponent},
  {path: 'new', component: ContaPagarFormComponent},
  {path: ':id/edit', component: ContaPagarFormComponent},
  {path: ':id/view', component: ContaPagarViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContapagarRoutingModule { }
