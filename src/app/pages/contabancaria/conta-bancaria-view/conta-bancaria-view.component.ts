import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceViewComponent } from 'src/app/shared/components/base-resource-view/base-resource-view.component';
import { ContaBancaria } from '../shared/contabancaria.model';
import { ContaBancariaService } from '../shared/contabancaria.service';

@Component({
  selector: 'app-conta-bancaria-view',
  templateUrl: './conta-bancaria-view.component.html',
  styleUrls: ['./conta-bancaria-view.component.css']
})
export class ContaBancariaViewComponent extends BaseResourceViewComponent<ContaBancaria> {
  
  
  constructor(protected contaBancariaService: ContaBancariaService, protected injector: Injector) {
    super(injector, new ContaBancaria(), contaBancariaService, ContaBancaria.fromJson)
  }
  
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

