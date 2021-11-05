import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceViewComponent } from 'src/app/shared/components/base-resource-view/base-resource-view.component';
import { Pessoa } from '../shared/pessoa.model';
import { PessoaService } from '../shared/pessoa.service';

@Component({
  selector: 'app-pessoa-view',
  templateUrl: './cliente-view.component.html',
  styleUrls: ['./cliente-view.component.css']
})
export class ClienteViewComponent extends BaseResourceViewComponent<Pessoa> {
  
  
  constructor(protected pessoaService: PessoaService, protected injector: Injector) {
    super(injector, new Pessoa(), pessoaService, Pessoa.fromJson)
  }
  
  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null],
      cpfcnpj: [null],
      cep:[null],
      endereco: [null],
      numero: [null],
      complemento: [null],
      bairro: [null],
      cidadeId: [null],
      estadoId: [null],
      paisId: [null],
      telefone: [null],
      celular: [null],
      contato: [null],
      email: [null],
      nomeComercial: [null],
      cliente: [null],
      fornecedor: [null],
      observacao: [null]
    });
  }
}
