import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { ContaFinanceira } from "../../../shared/models/platform/conta-financeira.model";
import { BaseResourceService } from "../../../shared/services/base-resource.service";
import { UtilService } from 'src/app/shared/services/Utils/utils-resource.service';

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

  create(contaPagar: ContaFinanceira): Observable<ContaFinanceira>{
    contaPagar.pessoaNome = null;
    return super.create(contaPagar);
  }

  update(contaPagar: ContaFinanceira): Observable<ContaFinanceira>{
    return super.update(contaPagar);
  }
}
