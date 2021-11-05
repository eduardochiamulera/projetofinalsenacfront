import { NgModule } from '@angular/core';

import { SharedModule } from "../../shared/shared.module";

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteViewComponent } from './cliente-view/cliente-view.component';


@NgModule({
  declarations: [ClienteListComponent, ClienteFormComponent, ClienteViewComponent],
  imports: [
    ClientesRoutingModule,
    SharedModule
  ]
})
export class ClientesModule { }
