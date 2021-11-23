import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceViewComponent } from 'src/app/shared/components/base-resource-view/base-resource-view.component';
import { Pessoa } from '../../../shared/models/platform/pessoa.model';
import { FornecedorService } from '../shared/fornecedor.service';
import * as Mask from "../../../shared/contants/mask-constant";

@Component({
  selector: 'app-fornecedor-view',
  templateUrl: './fornecedor-view.component.html',
  styleUrls: ['./fornecedor-view.component.css']
})
export class FornecedorViewComponent extends BaseResourceViewComponent<Pessoa> {
  protected afterLoad(): void {
    
  }
  
  imaskConfig = Mask.MASKCELULARCONFIG

  imaskConfigTel = Mask.MASKCONFIGTEL

  constructor(protected fornecedorService: FornecedorService, protected injector: Injector) {
    super(injector, new Pessoa(), fornecedorService, Pessoa.fromJson)
  }
  
  protected buildResourceForm() {
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
      pais:[null],
      telefone: [null],
      celular: [null],
      contato: [null],
      email: [null],
      nomeComercial: [null],
      cliente: [null],
      fornecedor: [null],
      observacao: [null],
      cidadeNome: [null],
      estadoNome: [null],
      paisNome: [null],
    });
  }
}

