import { Component, Injector } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { BaseResourceFormComponent } from "../../../shared/components/base-resource-form/base-resource-form.component";
import { Pessoa } from "../../../shared/models/platform/pessoa.model";
import { ClienteService } from "../shared/cliente.service";

import { Pais } from 'src/app/shared/models/domain/pais-resource.model';
import { UtilService } from 'src/app/shared/services/Utils/utils-resource.service';
import { Estado } from 'src/app/shared/models/domain/estado-resource.model';
import { Cidade } from 'src/app/shared/models/domain/cidade-resource.model';
import * as Mask from "../../../shared/contants/mask-constant";

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

  imaskConfig = Mask.MASKCELULARCONFIG

  imaskConfigTel = Mask.MASKCONFIGTEL

  constructor(
    protected clienteService: ClienteService, protected injector: Injector) {
      super(injector, new Pessoa(), clienteService, Pessoa.fromJson);
      this.utilService = new UtilService(injector);
   }

   ngOnInit(){
     this.utilService.getPaises().subscribe(
      resources => this.paises = resources,
      error => this.errorOnLoadList("Erro ao carregar a lista de paises")
     );

     return super.ngOnInit();
    }

   optionSelect(event){     
     if(event){
       this.resourceForm.patchValue({
         paisId : event.id
       });
       this.utilService.getEstados(event.id).subscribe(
        resources => this.estados = resources,
        error => this.errorOnLoadList("Erro ao carregar a lista de estados")
       );
     }else{
      this.resourceForm.patchValue({
        paisId : null
      });
      this.estados = [];
      localStorage.removeItem("paises");
     }
   }

   optionSelectEstado(event){
     if(event){
       this.resourceForm.patchValue({
         estadoId : event.id
       });
       this.utilService.getCidades(event.id).subscribe(
         resources => this.cidades = resources,
         error => this.errorOnLoadList("Erro ao carregar a lista de estados")
        ); 
     }else{
      this.resourceForm.patchValue({
        estadoId : null
      });
      this.cidades = [];
      localStorage.removeItem("estados");
     }
  }

  optionSelectCidade(event){
    if(event){
      this.resourceForm.patchValue({
        cidadeId : event.id
      });
    }else{
      this.resourceForm.patchValue({
        cidadeId : null
      });
      localStorage.removeItem("cidades");
    }
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
      telefone: [null,[Validators.maxLength(18)]],
      celular: [null, [Validators.maxLength(19)]],
      contato: [null],
      email: [null, Validators.email],
      nomeComercial: [null],
      cliente: [null],
      fornecedor: [null],
      observacao: [null],
      cidadeNome: [null],
      estadoNome: [null],
      paisNome: [null],
    });
  }

  protected afterLoad(): void {
    if(this.resource.estadoId){
      this.utilService.getEstados(this.resource.paisId).subscribe(
        resources => this.estados = resources,
        error => this.errorOnLoadList("Erro ao carregar a lista de estados")
       );
     }

     if(this.resource.cidadeId){
      this.utilService.getCidades(this.resource.estadoId).subscribe(
        resources => this.cidades = resources,
        error => this.errorOnLoadList("Erro ao carregar a lista de estados")
       );
     }
  }
}
