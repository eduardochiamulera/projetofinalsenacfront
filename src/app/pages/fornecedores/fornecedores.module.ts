import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { FornecedoresRoutingModule } from './fornecedores-routing.module';
import { FornecedorListComponent } from './fornecedor-list/fornecedor-list.component';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { FornecedorViewComponent } from './fornecedor-view/fornecedor-view.component';


@NgModule({
  declarations: [FornecedorListComponent, FornecedorFormComponent, FornecedorViewComponent],
  imports: [
    FornecedoresRoutingModule,
    SharedModule
  ]
})
export class FornecedoresModule { }
