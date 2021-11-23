import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { ContaFinanceira } from "../../../shared/models/platform/conta-financeira.model";
import { BaseResourceService } from "../../../shared/services/base-resource.service";
import { UtilService } from 'src/app/shared/services/Utils/utils-resource.service';
import { map,catchError } from "rxjs/operators";
import { CondicaoParcelamentoParcela } from 'src/app/shared/models/domain/condicao-resource.model';
import { apiPath } from 'src/app/shared/contants/url-constant';
import toastr from "toastr";

@Injectable({
  providedIn: 'root'
})
export class ContaReceberService extends BaseResourceService<ContaFinanceira> {

  public utilService: UtilService;

  constructor(protected injector: Injector) { 
    super("contafinanceira", injector, ContaFinanceira.fromJson)
    this.utilService = new UtilService(injector)
  }

  getAll() : Observable<ContaFinanceira[]>{
    return super.getAll("/contaReceber");
  }

  getDataVencimento(condicaoId, dataEmissao, valor): Observable<any>{
    return this.http.get(`${apiPath}condicaoparcelamentosimulacao?condicaoParcelamentoId=${condicaoId}&dataReferencia=${dataEmissao}&valor=${valor}`, { headers : 
      { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
        'AppUser' : 'eduardofraga1994@gmail.com'
      }}).pipe(
        catchError(this.handleError)
    )
  }

  cancelarBaixas(id){
    return this.http.delete(apiPath + 'contafinanceirabaixa/' + id, { headers : 
      { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
        'AppUser' : 'eduardofraga1994@gmail.com'
      }}).pipe(
        map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    )
  }

  protected jsonDataToResource(jsonData: any[]) : CondicaoParcelamentoParcela{
    const resource: CondicaoParcelamentoParcela = CondicaoParcelamentoParcela.fromJson(jsonData);
    return resource;
  }

  create(contaReceber: ContaFinanceira): Observable<ContaFinanceira>{
    contaReceber.pessoaNome = null;
    contaReceber.categoriaNome = null;
    contaReceber.condicaoParcelamentoNome = null;
    contaReceber.formaPagamentoNome = null;
    return super.create(contaReceber);
  }

  update(contaReceber: ContaFinanceira): Observable<ContaFinanceira>{
    contaReceber.pessoaNome = null;
    contaReceber.categoriaNome = null;
    contaReceber.condicaoParcelamentoNome = null;
    contaReceber.formaPagamentoNome = null;
    return super.update(contaReceber);
  }

  fnSucces(){
    window.location.reload(); 
    toastr.success("Solicitação processada com sucesso") 
  }

  fnError(){
     toastr.error("Solicitação processada com sucesso")
  }
}