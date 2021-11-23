import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContaReceberFormComponent } from './contareceber-form/contareceber-form.component';
import { ContaReceberListComponent } from './contareceber-list/contareceber-list.component';
import { ContaReceberViewComponent } from './contareceber-view/contareceber-view.component';

const routes: Routes = [
  {path: '', component: ContaReceberListComponent},
  {path: 'new', component: ContaReceberFormComponent},
  {path: ':id/edit', component: ContaReceberFormComponent},
  {path: ':id/view', component: ContaReceberViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaReceberRoutingModule { }
