import { Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";
import { BaseResourceModel } from "../models/base/base-resource.model";
import { Guid } from 'guid-typescript';
import { apiPath } from '../contants/url-constant';

export abstract class BaseResourceService<T extends BaseResourceModel> {
 
    protected http: HttpClient;

  constructor(
        protected path: string,
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData : any) => T
    ) { 
      this.http = injector.get(HttpClient);
  }

  getAll(url: string = ""): Observable<T[]>{
    const fullUrl = apiPath + this.path + url;
    return this.http.get(fullUrl, { headers : 
      { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
        'AppUser' : 'eduardofraga1994@gmail.com'
      }}).pipe(
        map(this.jsonDataToResources.bind(this)),
        catchError(this.handleError)
    )
  }

  getById(id:string): Observable<T>{
    let guid = Guid.parse(id);
    const url = `${apiPath}${this.path}/${guid}`;
    return this.http.get(url, { headers : 
      { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
        'AppUser' : 'eduardofraga1994@gmail.com'
      }}).pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)      
    )
  }

  create(resource: T): Observable<T>{
    return this.http.post(apiPath + this.path, resource, { headers : 
      { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
        'AppUser' : 'eduardofraga1994@gmail.com'
      }}).pipe(
        map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    )
  }

  update(resource: T): Observable<T>{
    const url = `${apiPath}${this.path}/${resource.id}`;
    return this.http.put(url, resource, { headers : 
      { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
        'AppUser' : 'eduardofraga1994@gmail.com'
      }}).pipe(
          map(this.jsonDataToResource.bind(this)),
          catchError(this.handleError)
    )
  }

  delete(id: Guid): Observable<any>{
    const url = `${apiPath}${this.path}/${id}`;
    return this.http.delete(url, { headers : 
      { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
        'AppUser' : 'eduardofraga1994@gmail.com'
      }}).pipe(
      catchError(this.handleError)
    )
  }

  //PROTECTED METHODS
  protected jsonDataToResource(jsonData: any) : T{
    return this.jsonDataToResourceFn(jsonData);
  }

  protected jsonDataToResources(jsonData: any[]) : T[]{
    const resources: T[] = [];
    jsonData.forEach(element => resources.push(this.jsonDataToResourceFn(element)))
    return resources;
  }

  protected handleError(error : any) : Observable<any>{
    console.log("ERRO NA REQUISIÇÃO => ",error);
    return throwError(error);
  }
}
