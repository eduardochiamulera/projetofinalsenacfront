import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { ContaFinanceira } from 'src/app/shared/models/platform/conta-financeira.model';
import { Pessoa } from 'src/app/shared/models/platform/pessoa.model';
import { UtilService } from 'src/app/shared/services/Utils/utils-resource.service';
import { FornecedorService } from '../../fornecedores/shared/fornecedor.service';
import { ContaPagarService } from '../shared/conta-pagar.service';

@Component({
  selector: 'app-conta-pagar-form',
  templateUrl: './conta-pagar-form.component.html',
  styleUrls: ['./conta-pagar-form.component.css']
})
export class ContaPagarFormComponent extends BaseResourceFormComponent<ContaFinanceira> {

  fornecedorService: FornecedorService;
  utilService: UtilService;
  keywordTitle="descricao"
  fornecedores: Pessoa[] = [];
  formasPagamento: any[] = [];
  condicoesParcelamento: any[] = [];
  categorias: any[] = [];
  statusClassCheck = "active";
  statusClass = "not-active";

  constructor(
    protected contaPagarService: ContaPagarService, protected injector: Injector) {
      super(injector, new ContaFinanceira(), contaPagarService, ContaFinanceira.fromJson);
      this.fornecedorService = new FornecedorService(injector);
      this.utilService = new UtilService(injector);
    }

  protected afterLoad(): void {
   this.showCheckRepetir(); 
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
      this.showCheckRepetir();
      super.ngOnInit();
  }

  showFormRepetir(value){
    if(value === true){
      this.statusClass = "active";
    }else{
      this.statusClass = "not-active";
    }
  }

  showCheckRepetir(){
    if(this.currentAction == "edit") this.statusClassCheck = "not-active";
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
        debugger;
        this.resourceForm.patchValue({condicaoParcelamentoId : event ? event.id : null });
        this.calulaDataValidade(this.resourceForm.value.condicaoParcelamentoId, 
          this.resourceForm.value.dataEmissao, this.resourceForm.value.valorPrevisto);
        break;
    }
  }

  private calulaDataValidade(condicaoParcelamentoId, dataEmissao, valor){
    if(condicaoParcelamentoId && dataEmissao && valor){
      debugger;
      this.contaPagarService.getDataVencimento(condicaoParcelamentoId, dataEmissao, valor).subscribe(
        resource => this.bindData(resource),
        error => this.errorOnLoadList("Erro ao calcular data de vencimento")
      )
    }
  }
 
  private bindData(resource){
    this.resourceForm.patchValue({dataVencimento : resource[0].dataVencimento });
    this.resourceForm.patchValue({observacao : `${this.resourceForm.value.observacao ? this.resourceForm.value.observacao + ' - Parcela: ' : "Parcela: "}${resource[0].descricao}` });
  }
  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      valorPrevisto: [null, [Validators.required]],
      statusContaBancaria: [null, [Validators.required]],
      valorPago: [null],
      tipoContaFinanceira: [null, [Validators.required]],
      dataEmissao: [null, [Validators.required]],
      dataVencimento: [null, [Validators.required]], 
      descricao: [null, [Validators.required, Validators.minLength(5)]],
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
      categoriaNome: [null, [Validators.required]],
      condicaoParcelamentoNome: [null, [Validators.required]],
      pessoaNome: [null, [Validators.required]],
      formaPagamentoNome: [null, [Validators.required]]
    });
  }

}
