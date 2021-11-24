import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ContaFinanceira } from "../../../shared/models/platform/conta-financeira.model";
import { ContaFinanceiraService } from 'src/app/shared/services/conta-financeira.service';

@Injectable({
  providedIn: 'root'
})
export class ContaReceberService extends ContaFinanceiraService {

  getAll() : Observable<ContaFinanceira[]>{
    return super.getAll("/contaReceber");
  }
}