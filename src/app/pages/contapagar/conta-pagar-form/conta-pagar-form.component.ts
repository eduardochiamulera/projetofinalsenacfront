import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { ContaFinanceira } from 'src/app/shared/models/platform/conta-financeira.model';
import { Pessoa } from 'src/app/shared/models/platform/pessoa.model';
import { FornecedorService } from '../../fornecedores/shared/fornecedor.service';
import { ContaPagarService } from '../shared/conta-pagar.service';

@Component({
  selector: 'app-conta-pagar-form',
  templateUrl: './conta-pagar-form.component.html',
  styleUrls: ['./conta-pagar-form.component.css']
})
export class ContaPagarFormComponent extends BaseResourceFormComponent<ContaFinanceira> {

  fornecedorService: FornecedorService;
  fornecedores: Pessoa[] = [];
  formasPagamento: Pessoa[] = [];
  condicoesParcelamento: Pessoa[] = [];
  categorias: Pessoa[] = [];
  statusClass = "not-active";

  constructor(
    protected contaPagarService: ContaPagarService, protected injector: Injector) {
      super(injector, new ContaFinanceira(), contaPagarService, ContaFinanceira.fromJson);
      this.fornecedorService = new FornecedorService(injector);
    }

  protected afterLoad(): void {
  }

  ngOnInit(){
      this.fornecedorService.getAll().subscribe(
        resources => this.fornecedores = resources,
        error => this.errorOnLoadList("Erro ao carregar a lista de fornecedores")
      )
      super.ngOnInit();
  }

  showFormRepetir(value){
    if(value === true){
      this.statusClass = "active";
    }else{
      this.statusClass = "not-active";
    }
  }


  optionSelect(event, caller){    
    
    switch(caller){
      case 'fornecedor':
        this.patchValue('fornecedorId', event.id);
    }

    
    // if(event){
    //   this.resourceForm.patchValue({
    //     paisId : event.id
    //   });
    // }else{
    //  this.resourceForm.patchValue({
    //    paisId : null
    //  });
    // }
  }

  patchValue(campo,value){
    this.resourceForm.patchValue({
      campo : value
    });
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      valorPrevisto: [null, [Validators.required]],
      valorPago: [null],
      dataEmissao: [null, [Validators.required]],
      dataVencimento: [null, [Validators.required]], 
      descricao: [null, [Validators.required, Validators.minLength(5)]],
      observacao: [null],
      repetir: [null],
      tipoPeriodicidade: [null],
      numeroRepeticoes: [null],
      descricaoParcela: [null],
      saldo: [null],
      numero: [null],
      categoriaNome: [null, [Validators.required]],
      condicaoParcelamentoNome: [null, [Validators.required]],
      pessoaNome: [null, [Validators.required]],
      formaPagamentoNome: [null, [Validators.required]]
    });
  }

}
