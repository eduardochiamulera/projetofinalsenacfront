import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";
import { Pessoa } from "./pessoa.model";
import { Guid } from 'guid-typescript';
import { BaseResourceService } from "../../../shared/services/base-resource.service";
import { UtilService } from 'src/app/shared/services/Utils/utils-resource.service';

@Injectable({
  providedIn: 'root'
})
export class PessoaService extends BaseResourceService<Pessoa> {

  //private apiPath: string = "https://localhost:44385/api/pessoa";
  public utilService: UtilService;

  constructor(protected injector: Injector) { 
    super("https://localhost:44385/api/pessoa", injector, Pessoa.fromJson)
    this.utilService = new UtilService(injector)
  }

  create(pessoa: Pessoa): Observable<Pessoa>{
    pessoa.cliente = true;
    return super.create(pessoa);
  }
}
