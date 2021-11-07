import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { Pessoa } from "../../../shared/models/platform/pessoa.model";
import { BaseResourceService } from "../../../shared/services/base-resource.service";
import { UtilService } from 'src/app/shared/services/Utils/utils-resource.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseResourceService<Pessoa> {

  //private apiPath: string = "https://localhost:44385/api/pessoa";
  public utilService: UtilService;

  constructor(protected injector: Injector) { 
    super("https://localhost:44385/api/pessoa", injector, Pessoa.fromJson)
    this.utilService = new UtilService(injector)
  }

  getAll() : Observable<Pessoa[]>{
    return super.getAll("/clientes");
  }

  create(pessoa: Pessoa): Observable<Pessoa>{
    pessoa.cliente = true;
    return super.create(pessoa);
  }
}
