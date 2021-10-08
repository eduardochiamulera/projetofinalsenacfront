import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoaListComponent } from './pessoa-list/pessoa-list.component';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';


@NgModule({
  declarations: [PessoaListComponent, PessoaFormComponent],
  imports: [
    CommonModule,
    PessoasRoutingModule
  ]
})
export class PessoasModule { }
