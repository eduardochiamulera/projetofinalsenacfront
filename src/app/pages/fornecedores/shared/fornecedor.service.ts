import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { Pessoa } from "../../../shared/models/platform/pessoa.model";
import { BaseResourceService } from "../../../shared/services/base-resource.service";
import { UtilService } from 'src/app/shared/services/Utils/utils-resource.service';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService extends BaseResourceService<Pessoa> {

  public utilService: UtilService;

  constructor(protected injector: Injector) { 
    super("https://localhost:44385/api/pessoa", injector, Pessoa.fromJson)
    this.utilService = new UtilService(injector)
  }

  getAll() : Observable<Pessoa[]>{
    return super.getAll("/fornecedores");
  }
  
  create(pessoa: Pessoa): Observable<Pessoa>{
    pessoa.fornecedor = true;
    pessoa.cidadeNome = null;
    pessoa.estadoNome = null;
    pessoa.paisNome = null;
    return super.create(pessoa);
  }

  update(pessoa: Pessoa): Observable<Pessoa>{
    pessoa.fornecedor = true;
    pessoa.cidadeNome = null;
    pessoa.estadoNome = null;
    pessoa.paisNome = null;
    return super.update(pessoa);
  }
}
