import { Component, Injector } from '@angular/core';
import { Validators } from "@angular/forms";
import { BaseResourceFormComponent } from "../../../shared/components/base-resource-form/base-resource-form.component";
import { Pessoa } from "../shared/pessoa.model";
import { PessoaService } from "../shared/pessoa.service";

import { Pais } from 'src/app/shared/models/domain/pais-resource.model';
import { UtilService } from 'src/app/shared/services/Utils/utils-resource.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Estado } from 'src/app/shared/models/domain/estado-resource.model';
import { Cidade } from 'src/app/shared/models/domain/cidade-resource.model';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent extends BaseResourceFormComponent<Pessoa> {
  keyword = 'nome';
  paises: Pais[] = [];
  estados: Estado[] = [];
  cidades: Cidade[] = [];
  private utilService : UtilService;

  constructor(
    protected pessoaService: PessoaService, protected injector: Injector) {
      super(injector, new Pessoa(), pessoaService, Pessoa.fromJson);
      this.utilService = new UtilService(injector);
   }

   ngOnInit(){
     this.utilService.getPaises().subscribe(
      resources => this.paises = resources,
      error => alert("Erro ao carregar a lista de paises")
     );
     return super.ngOnInit();
    }
    
    ngAfterContentChecked(){
     super.ngAfterContentChecked()
   }

   optionSelect(event){
     this.resourceForm.patchValue({
       paisId : event.id
     });
     this.utilService.getEstados(event.id).subscribe(
      resources => this.estados = resources,
      error => alert("Erro ao carregar a lista de estados")
     );
   }

   optionSelectEstado(event){
    this.resourceForm.patchValue({
      estadoId : event.id
    });
    this.utilService.getCidades(event.id).subscribe(
      resources => this.cidades = resources,
      error => alert("Erro ao carregar a lista de estados")
     ); 
  }

  optionSelectCidade(event){
    this.resourceForm.patchValue({
      paisId : event.id
    });
  }


  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(5)]],
      cpfcnpj: [null, [Validators.minLength(11)]],
      cep:[null, Validators.minLength(7)],
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
      observacao: [null]
    });
  }
}
