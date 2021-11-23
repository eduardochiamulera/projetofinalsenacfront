import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceViewComponent } from 'src/app/shared/components/base-resource-view/base-resource-view.component';
import { CondicaoParcelamento } from 'src/app/shared/models/platform/condicao-parcelamento.model';
import { ContaFinanceira } from 'src/app/shared/models/platform/conta-financeira.model';
import { FormaPagamento } from 'src/app/shared/models/platform/forma-pagamento.model';
import { Pessoa } from 'src/app/shared/models/platform/pessoa.model';
import { UtilService } from 'src/app/shared/services/Utils/utils-resource.service';
import { ClienteService } from '../../clientes/shared/cliente.service';
import { ContaReceberService } from '../shared/conta-receber.service';

@Component({
  selector: 'app-contareceber-view',
  templateUrl: './contareceber-view.component.html',
  styleUrls: ['./contareceber-view.component.css']
})
export class ContaReceberViewComponent extends BaseResourceViewComponent<ContaFinanceira> {

  
  keywordTitle="descricao"
  clientes: Pessoa[] = [];
  formasPagamento: FormaPagamento[] = [];
  condicoesParcelamento: CondicaoParcelamento[] = [];
  categorias: any[] = [];
  statusClassCheck = "active";
  statusClass = "not-active";
  public paginaAtual = 1;
  public pageSize = 10;
  clienteService: ClienteService;
  utilService: UtilService;
  
  constructor(protected contaPagarService: ContaReceberService, protected injector: Injector) {
    super(injector, new ContaFinanceira(), contaPagarService, ContaFinanceira.fromJson)
    this.clienteService = new ClienteService(injector);
      this.utilService = new UtilService(injector);
  }

  ngOnInit(){
    this.clienteService.getAll().subscribe(
      resources => this.clientes = resources,
      error => this.errorOnLoadList("Erro ao carregar a lista de clientees")
    )
    this.utilService.getCategorias('Receita').subscribe(
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

protected afterLoad(): void {
  if(this.resource.repetir){
    this.statusClassCheck = "active"
  }
  this.resource.dataEmissao = this.resource.dataEmissao.replace("T00:00:00","")
  this.resource.dataVencimento = this.resource.dataVencimento.replace("T00:00:00","")
  this.resourceForm.patchValue({
    dataEmissao: this.resource.dataEmissao,
    dataVencimento: this.resource.dataVencimento
  })
}

optionSelect(event, caller){    
  switch(caller){
    case 'cliente':
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
