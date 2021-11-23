import { NgModule } from '@angular/core';

import { SharedModule } from "../../shared/shared.module";

import { ContaReceberRoutingModule } from './contareceber-routing.module';
import { ContaReceberListComponent } from './contareceber-list/contareceber-list.component';
import { ContaReceberFormComponent } from './contareceber-form/contareceber-form.component';
import { ContaReceberViewComponent } from './contareceber-view/contareceber-view.component';


@NgModule({
  declarations: [ContaReceberListComponent, ContaReceberFormComponent, ContaReceberViewComponent],
  imports: [
    ContaReceberRoutingModule,
    SharedModule
  ]
})
export class ContareceberModule { }
