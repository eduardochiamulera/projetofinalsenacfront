import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Pais } from 'src/app/shared/models/domain/pais-resource.model';
import { UtilService } from 'src/app/shared/services/Utils/utils-resource.service';
import { ContaBancaria } from '../shared/contabancaria.model';
import { ContaBancariaService } from '../shared/contabancaria.service';

@Component({
  selector: 'app-conta-bancaria-form',
  templateUrl: './conta-bancaria-form.component.html',
  styleUrls: ['./conta-bancaria-form.component.css']
})

export class ContaBancariaFormComponent extends BaseResourceFormComponent<ContaBancaria> {
  
  private utilService : UtilService;
  paises: Pais[] = [];

  constructor(
    protected clienteService: ContaBancariaService, protected injector: Injector) {
      super(injector, new ContaBancaria(), clienteService, ContaBancaria.fromJson);
      this.utilService = new UtilService(injector);
    }
    
    protected buildResourceForm(): void {
      this.resourceForm = this.formBuilder.group({
        id: [null],
        nomeConta: [null, [Validators.required, Validators.minLength(5)]],
        agencia: [null, [Validators.required, Validators.minLength(5), Validators.pattern('^[0-9]*$')]],
        digitoAgencia: [null , [Validators.required, Validators.maxLength(1)]],
        conta: [null, [Validators.required, Validators.minLength(4)]], 
        digitoConta: [null, [Validators.required, Validators.maxLength(1)]],
        valorInicial: [null],
      })
    }
    protected afterLoad(): void {      
      this.utilService.getPaises().subscribe(
        resources => this.paises = resources,
        error => alert("Erro ao carregar a lista de estados")
       );
    }
}
