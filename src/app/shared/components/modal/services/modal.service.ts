import { HttpClient } from "@angular/common/http";
import { Injector } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { apiPath } from "src/app/shared/contants/url-constant";
import { ContaFinanceiraBaixa } from "src/app/shared/models/platform/conta-financeira-baixa.model";

export class ModalService{

    http: HttpClient;

    constructor(protected injector: Injector){
      this.http = injector.get(HttpClient);
  }

    public create(resource: ContaFinanceiraBaixa): Observable<ContaFinanceiraBaixa>{
        return this.http.post(`${apiPath}contafinanceirabaixa`, resource, { headers : 
          { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
            'AppUser' : 'eduardofraga1994@gmail.com'
          }}).pipe(
          map(this.jsonDataToContaFinanceiraBaixa.bind(this)),
          catchError(this.handleError)
        )
      }

      
  private jsonDataToContaFinanceiraBaixa(jsonData: any) : ContaFinanceiraBaixa{
    return ContaFinanceiraBaixa.fromJson(jsonData);
  }
  
  
  protected handleError(error : any) : Observable<any>{
    console.log("ERRO NA REQUISIÇÃO => ",error);
    return throwError(error);
  }
    
}