import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Pessoa } from "../shared/pessoa.model";
import { PessoaService } from "../shared/pessoa.service";
import { BaseResourceListComponent } from "../../../shared/components/base-resource-list/base-resource-list.component";

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent extends BaseResourceListComponent<Pessoa>{

  constructor(private pessoaService: PessoaService) {
    super(pessoaService);
   }
}
