import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteViewComponent } from './cliente-view/cliente-view.component';

const routes: Routes = [
  {path: '', component: ClienteListComponent},
  {path: 'new', component: ClienteFormComponent},
  {path: ':id/edit', component: ClienteFormComponent},
  {path: ':id/view', component: ClienteViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
