import { Component, OnInit } from '@angular/core';
import { Pessoa } from "../../../shared/models/platform/pessoa.model";
import { ClienteService } from "../shared/cliente.service";
import { BaseResourceListComponent } from "../../../shared/components/base-resource-list/base-resource-list.component";

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent extends BaseResourceListComponent<Pessoa>{

  constructor(private clienteService: ClienteService) {
    super(clienteService);
   }
}
