import { NgModule } from '@angular/core';

import { SharedModule } from "../../shared/shared.module";

import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoaListComponent } from './pessoa-list/pessoa-list.component';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';


@NgModule({
  declarations: [PessoaListComponent, PessoaFormComponent],
  imports: [
    PessoasRoutingModule,
    SharedModule
  ]
})
export class PessoasModule { }
