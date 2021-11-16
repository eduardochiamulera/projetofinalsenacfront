import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'cliente', loadChildren: () => import('./pages/clientes/clientes.module').then(m => m.ClientesModule)},
  { path: 'fornecedor', loadChildren: () => import('./pages/fornecedores/fornecedores.module').then(m => m.FornecedoresModule)},
  { path: 'contabancaria', loadChildren: () => import('./pages/contabancaria/contabancaria.module').then(m => m.ContabancariaModule)},
  { path: 'contapagar', loadChildren: () => import('./pages/contapagar/contapagar.module').then(m => m.ContapagarModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
