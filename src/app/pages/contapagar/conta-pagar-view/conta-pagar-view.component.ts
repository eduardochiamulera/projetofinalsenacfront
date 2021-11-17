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
  
  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      valorPrevisto: [null],
      valorPago: [null],
      dataEmissao: [null ],
      dataVencimento: [null], 
      descricao: [null],
      observacao: [null],
      repetir: [null],
      tipoPeriodicidade: [null],
      numeroRepeticoes: [null],
      descricaoParcela: [null],
      saldo: [null],
      numero: [null],
      categoriaNome: [null],
      condicaoParcelamentoNome: [null],
      pessoaNome: [null],
      formaPagamentoNome: [null]
    });
  }
}
