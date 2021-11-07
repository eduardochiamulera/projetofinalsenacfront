import { Component, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Pessoa } from 'src/app/shared/models/platform/pessoa.model';
import { FornecedorService } from '../shared/fornecedor.service';


@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.css']
})
export class FornecedorListComponent extends BaseResourceListComponent<Pessoa>{

  constructor(private fornecedorService: FornecedorService) {
    super(fornecedorService);
   }
}
