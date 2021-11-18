import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { ContaFinanceira } from "../../../shared/models/platform/conta-financeira.model";
import { BaseResourceService } from "../../../shared/services/base-resource.service";
import { UtilService } from 'src/app/shared/services/Utils/utils-resource.service';
import { map,catchError } from "rxjs/operators";
import { CondicaoParcelamentoParcela } from 'src/app/shared/models/domain/condicao-resource.model';

@Injectable({
  providedIn: 'root'
})
export class ContaPagarService extends BaseResourceService<ContaFinanceira> {

  public utilService: UtilService;

  constructor(protected injector: Injector) { 
    super("https://localhost:44385/api/contafinanceira", injector, ContaFinanceira.fromJson)
    this.utilService = new UtilService(injector)
  }

  getAll() : Observable<ContaFinanceira[]>{
    return super.getAll("/contapagar");
  }

  getDataVencimento(condicaoId, dataEmissao, valor): Observable<any>{
    return this.http.get(`https://localhost:44385/api/condicaoparcelamentosimulacao?condicaoParcelamentoId=${condicaoId}&dataReferencia=${dataEmissao}&valor=${valor}`, { headers : 
      { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
        'AppUser' : 'eduardofraga1994@gmail.com'
      }}).pipe(
        map(this.jsonDataToResources.bind(this)),
        catchError(this.handleError)
    )
  }

  protected jsonDataToResource(jsonData: any[]) : CondicaoParcelamentoParcela{
    const resource: CondicaoParcelamentoParcela = CondicaoParcelamentoParcela.fromJson(jsonData);
    return resource;
  }

  create(contaPagar: ContaFinanceira): Observable<ContaFinanceira>{
    contaPagar.pessoaNome = null;
    contaPagar.categoriaNome = null;
    contaPagar.condicaoParcelamentoNome = null;
    contaPagar.formaPagamentoNome = null;
    return super.create(contaPagar);
  }

  update(contaPagar: ContaFinanceira): Observable<ContaFinanceira>{
    contaPagar.pessoaNome = null;
    contaPagar.categoriaNome = null;
    contaPagar.condicaoParcelamentoNome = null;
    contaPagar.formaPagamentoNome = null;
    return super.update(contaPagar);
  }
}
