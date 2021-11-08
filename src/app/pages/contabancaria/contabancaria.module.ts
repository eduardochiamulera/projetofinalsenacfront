import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { ContabancariaRoutingModule } from './contabancaria-routing.module';
import { ContaBancariaFormComponent } from './conta-bancaria-form/conta-bancaria-form.component';
import { ContaBancariaListComponent } from './conta-bancaria-list/conta-bancaria-list.component';
import { ContaBancariaViewComponent } from './conta-bancaria-view/conta-bancaria-view.component';


@NgModule({
  declarations: [ContaBancariaFormComponent, ContaBancariaListComponent, ContaBancariaViewComponent],
  imports: [
    ContabancariaRoutingModule,
    SharedModule
  ]
})
export class ContabancariaModule { }
