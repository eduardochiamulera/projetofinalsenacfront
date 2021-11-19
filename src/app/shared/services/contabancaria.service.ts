import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { BaseResourceService } from "./base-resource.service";
import { ContaBancaria } from '../../pages/contabancaria/shared/contabancaria.model';

@Injectable({
  providedIn: 'root'
})
export class ContaBancariaService extends BaseResourceService<ContaBancaria> {

  constructor(protected injector: Injector) { 
    super("https://localhost:44385/api/contabancaria", injector, ContaBancaria.fromJson)
  }

  create(contaBancaria: ContaBancaria): Observable<ContaBancaria>{
    contaBancaria.bancoNome = null;
    return super.create(contaBancaria);
  }

  update(contaBancaria: ContaBancaria): Observable<ContaBancaria>{
    contaBancaria.bancoNome = null;
    return super.update(contaBancaria);
  }
}
