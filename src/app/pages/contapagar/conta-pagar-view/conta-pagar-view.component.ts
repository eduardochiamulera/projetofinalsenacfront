import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceViewComponent } from 'src/app/shared/components/base-resource-view/base-resource-view.component';
import { CondicaoParcelamento } from 'src/app/shared/models/platform/condicao-parcelamento.model';
import { ContaFinanceira } from 'src/app/shared/models/platform/conta-financeira.model';
import { FormaPagamento } from 'src/app/shared/models/platform/forma-pagamento.model';
import { Pessoa } from 'src/app/shared/models/platform/pessoa.model';
import { UtilService } from 'src/app/shared/services/Utils/utils-resource.service';
import { FornecedorService } from '../../fornecedores/shared/fornecedor.service';
import { ContaPagarService } from '../shared/conta-pagar.service';

@Component({
  selector: 'app-conta-pagar-view',
  templateUrl: './conta-pagar-view.component.html',
  styleUrls: ['./conta-pagar-view.component.css']
})
export class ContaPagarViewComponent extends BaseResourceViewComponent<ContaFinanceira> {
  
  keywordTitle="descricao"
  fornecedores: Pessoa[] = [];
  formasPagamento: FormaPagamento[] = [];
  condicoesParcelamento: CondicaoParcelamento[] = [];
  categorias: any[] = [];
  statusClassCheck = "active";
  statusClass = "not-active";
  public paginaAtual = 1;
  public pageSize = 10;
  fornecedorService: FornecedorService;
  utilService: UtilService;
  
  constructor(protected contaPagarService: ContaPagarService, protected injector: Injector) {
    super(injector, new ContaFinanceira(), contaPagarService, ContaFinanceira.fromJson)
    this.fornecedorService = new FornecedorService(injector);
      this.utilService = new UtilService(injector);
  }

  ngOnInit(){
    this.fornecedorService.getAll().subscribe(
      resources => this.fornecedores = resources,
      error => this.errorOnLoadList("Erro ao carregar a lista de fornecedores")
    )
    this.utilService.getCategorias('Despesa').subscribe(
      resources => this.categorias = resources,
      error => this.errorOnLoadList("Erro ao carregar a lista de categorias")
    )
    this.utilService.getCondicoes().subscribe(
      resources => this.condicoesParcelamento = resources,
      error => this.errorOnLoadList("Erro ao carregar a lista de condições")
    )
    this.utilService.getFormasPagamento().subscribe(
      resources => this.formasPagamento = resources,
      error => this.errorOnLoadList("Erro ao carregar a lista de formas de pagamento")
    )
    super.ngOnInit();
}

optionSelect(event, caller){    
  switch(caller){
    case 'fornecedor':
      this.resourceForm.patchValue({pessoaId : event ? event.id : null });
      break;
    case 'formaPagamento':
      this.resourceForm.patchValue({formaPagamentoId : event ? event.id : null });
      break;
    case 'categoria':
      this.resourceForm.patchValue({categoriaId : event ? event.id : null });
      break;
    case 'condicaoParcelamento':
      this.resourceForm.patchValue({condicaoParcelamentoId : event ? event.id : null });
      break;
  }
}
  
  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      valorPrevisto: [null],
      statusContaBancaria: [null],
      valorPago: [null],
      tipoContaFinanceira: [null],
      dataEmissao: [null],
      dataVencimento: [null], 
      descricao: [null],
      observacao: [null],
      repetir: [null],
      tipoPeriodicidade: [null],
      numeroRepeticoes: [null],
      descricaoParcela: [null],
      pessoaId: [null],
      formaPagamentoId: [null],
      categoriaId: [null],
      condicaoParcelamentoId: [null],
      saldo: [null],
      numero: [null],
      categoriaNome: [null],
      condicaoParcelamentoNome: [null],
      pessoaNome: [null],
      formaPagamentoNome: [null]
    });
  }
}
