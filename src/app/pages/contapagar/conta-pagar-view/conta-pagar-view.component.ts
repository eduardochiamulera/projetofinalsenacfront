import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceViewComponent } from 'src/app/shared/components/base-resource-view/base-resource-view.component';
import { ContaFinanceira } from 'src/app/shared/models/platform/conta-financeira.model';
import { ContaPagarService } from '../shared/conta-pagar.service';

@Component({
  selector: 'app-conta-pagar-view',
  templateUrl: './conta-pagar-view.component.html',
  styleUrls: ['./conta-pagar-view.component.css']
})
export class ContaPagarViewComponent extends BaseResourceViewComponent<ContaFinanceira> {
  
  
  constructor(protected contaPagarService: ContaPagarService, protected injector: Injector) {
    super(injector, new ContaFinanceira(), contaPagarService, ContaFinanceira.fromJson)
  }

  //valorPrevisto valorPago pessoaId dataEmissao dataVencimento
  // descricao observacao formaPagamentoId statusContaBancaria
  // repetir tipoPeriodicidade numeroRepeticoes descricaoParcela saldo numero
  // categoriaNome condicaoParcelamentoNome pessoaNome formaPagamentoNome
  
  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nomeConta: [null],
      agencia: [null],
      digitoAgencia: [null ],
      conta: [null], 
      digitoConta: [null],
      valorInicial: [null],
      bancoNome: [null],
      bancoId: [null]
    });
  }
}
