import { NgModule } from '@angular/core';

import { SharedModule } from "../../shared/shared.module";

import { ContapagarRoutingModule } from './contapagar-routing.module';
import { ContaPagarListComponent } from './conta-pagar-list/conta-pagar-list.component';
import { ContaPagarFormComponent } from './conta-pagar-form/conta-pagar-form.component';
import { ContaPagarViewComponent } from './conta-pagar-view/conta-pagar-view.component';


@NgModule({
  declarations: [ContaPagarListComponent, ContaPagarFormComponent, ContaPagarViewComponent],
  imports: [
    ContapagarRoutingModule,
    SharedModule
  ]
})
export class ContapagarModule { }
