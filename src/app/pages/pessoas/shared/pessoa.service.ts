import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";
import { Pessoa } from "./pessoa.model";
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private apiPath: string = "https://localhost:44385/api/pessoa";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Pessoa[]>{
    return this.http.get(this.apiPath, { headers : 
      { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
        'AppUser' : 'eduardofraga1994@gmail.com'
      }}).pipe(
      catchError(this.handleError),
      map(this.jsonDataToPessoas)
    )
  }

  getById(id:Guid): Observable<Pessoa>{
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToPessoa)
    )
  }

  create(pessoa: Pessoa): Observable<Pessoa>{
    return this.http.post(this.apiPath, pessoa).pipe(
      catchError(this.handleError),
      map(this.jsonDataToPessoa)
    )
  }

  update(pessoa: Pessoa): Observable<Pessoa>{
    const url = `${this.apiPath}/${pessoa.id}`;
    return this.http.put(this.apiPath, pessoa).pipe(
      catchError(this.handleError),
      map(this.jsonDataToPessoa)
    )
  }

  delete(id: Guid): Observable<any>{
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url, { headers : 
      { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
        'AppUser' : 'eduardofraga1994@gmail.com'
      }}).pipe(
      catchError(this.handleError)
    )
  }

  //PRIVATE METHODS
  private jsonDataToPessoa(jsonData: any) : Pessoa{
    return Object.assign(new Pessoa(), jsonData);
  }

  private jsonDataToPessoas(jsonData: any[]) : Pessoa[]{
    debugger;
    const pessoas: Pessoa[] = [];
    jsonData.forEach(element => pessoas.push(Object.assign(new Pessoa(), element)))
    return pessoas;
  }

  private handleError(error : any) : Observable<any>{
    console.log("ERRO NA REQUISIÇÃO => ",error);
    return throwError(error);
  }
}
