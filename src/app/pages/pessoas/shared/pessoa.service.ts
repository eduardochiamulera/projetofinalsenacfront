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

  // getAll(): Observable<Pessoa[]>{
  //   return this.http.get(this.apiPath, { headers : 
  //     { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
  //       'AppUser' : 'eduardofraga1994@gmail.com'
  //     }}).pipe(
  //     catchError(this.handleError),
  //     map(this.jsonDataToPessoas)
  //   )
  // }

  // getById(id:string): Observable<Pessoa>{
  //   let guid = Guid.parse(id);
  //   const url = `${this.apiPath}/${guid}`;
  //   return this.http.get(url, { headers : 
  //     { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
  //       'AppUser' : 'eduardofraga1994@gmail.com'
  //     }}).pipe(
  //     catchError(this.handleError),
  //     map(this.jsonDataToPessoa)
  //   )
  // }

  // create(pessoa: Pessoa): Observable<Pessoa>{
    
  //   return this.http.post(this.apiPath,{ nome: pessoa.nome, observacao: pessoa.observacao, cliente: true}, { headers : 
  //     { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
  //       'AppUser' : 'eduardofraga1994@gmail.com'
  //     }}).pipe(
  //     catchError(this.handleError),
  //     map(this.jsonDataToPessoa)
  //   )
  // }

  // update(pessoa: Pessoa): Observable<Pessoa>{
  //   const url = `${this.apiPath}/${pessoa.id}`;
  //   return this.http.put(url, pessoa, { headers : 
  //     { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
  //       'AppUser' : 'eduardofraga1994@gmail.com'
  //     }}).pipe(
  //     catchError(this.handleError),
  //     map(this.jsonDataToPessoa)
  //   )
  // }

  // delete(id: Guid): Observable<any>{
  //   const url = `${this.apiPath}/${id}`;
  //   return this.http.delete(url, { headers : 
  //     { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
  //       'AppUser' : 'eduardofraga1994@gmail.com'
  //     }}).pipe(
  //     catchError(this.handleError)
  //   )
  // }

  //PROTECTED METHODS
  protected jsonDataToPessoa(jsonData: any) : Pessoa{
    return Object.assign(new Pessoa(), jsonData);
  }

  protected jsonDataToPessoas(jsonData: any[]) : Pessoa[]{
    const pessoas: Pessoa[] = [];
    jsonData.forEach(element => pessoas.push(Object.assign(new Pessoa(), element)))
    return pessoas;
  }

  protected handleError(error : any) : Observable<any>{
    console.log("ERRO NA REQUISIÇÃO => ",error);
    return throwError(error);
  }
}
