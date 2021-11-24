import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { ContaFinanceira } from "../../../shared/models/platform/conta-financeira.model";
import { BaseResourceService } from "../../../shared/services/base-resource.service";
import { UtilService } from 'src/app/shared/services/Utils/utils-resource.service';
import { map,catchError } from "rxjs/operators";
import { CondicaoParcelamentoParcela } from 'src/app/shared/models/domain/condicao-resource.model';
import { apiPath } from 'src/app/shared/contants/url-constant';
import toastr from "toastr";
import { ContaFinanceiraService } from 'src/app/shared/services/conta-financeira.service';

@Injectable({
  providedIn: 'root'
})
export class ContaPagarService extends ContaFinanceiraService{

  getAll() : Observable<ContaFinanceira[]>{
    return super.getAll("/contapagar");
  }
}
