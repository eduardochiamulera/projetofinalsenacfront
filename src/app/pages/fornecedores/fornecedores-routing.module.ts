import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { FornecedorListComponent } from './fornecedor-list/fornecedor-list.component';
import { FornecedorViewComponent } from './fornecedor-view/fornecedor-view.component';

const routes: Routes = [
  {path: '', component: FornecedorListComponent},
  {path: 'new', component: FornecedorFormComponent},
  {path: ':id/edit', component: FornecedorFormComponent},
  {path: ':id/view', component: FornecedorViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }
