import { HttpClient } from "@angular/common/http";
import { map, catchError, flatMap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { Pais } from "../../models/domain/pais-resource.model";
import { Injector } from "@angular/core";
import { Estado } from "../../models/domain/estado-resource.model";
import { Cidade } from "../../models/domain/cidade-resource.model";
import { Banco } from "../../models/domain/banco-resource.model";
import { CondicaoParcelamento } from "../../models/platform/condicao-parcelamento.model";
import { CategoriaFinanceira } from "../../models/platform/categoria-financeira.model";
import { FormaPagamento } from "../../models/platform/forma-pagamento.model";

export class UtilService{

    http: HttpClient;
    
    constructor(protected injector: Injector){
        this.http = injector.get(HttpClient);
    }

    public getFormasPagamento(): Observable<FormaPagamento[]> {
        const condicoes = this.http.get("https://localhost:44385/api/formapagamento", { headers : 
            { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
              'AppUser' : 'eduardofraga1994@gmail.com'
            }}).pipe(
              map(this.jsonDataToFormaPagamento),
              catchError(this.handleError)
          )
          return condicoes;
    }

    public getCondicoes(): Observable<CondicaoParcelamento[]> {
        const condicoes = this.http.get("https://localhost:44385/api/condicaoparcelamento", { headers : 
            { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
              'AppUser' : 'eduardofraga1994@gmail.com'
            }}).pipe(
              map(this.jsonDataToCondicaoParcelamento),
              catchError(this.handleError)
          )
          return condicoes;
    }

    public getCategorias(): Observable<CategoriaFinanceira[]> {
        const condicoes = this.http.get("https://localhost:44385/api/categoria", { headers : 
            { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
              'AppUser' : 'eduardofraga1994@gmail.com'
            }}).pipe(
              map(this.jsonDataToCategoria),
              catchError(this.handleError)
          )
          return condicoes;
    }
    

    public getBancos(): Observable<Banco[]> {
        const bancos = this.http.get("https://localhost:44385/api/banco", { headers : 
            { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
              'AppUser' : 'eduardofraga1994@gmail.com'
            }}).pipe(
              map(this.jsonDataToBancos),
              catchError(this.handleError)
          )
          return bancos;
    }
    
    public getPaises(): Observable<Pais[]> {
        const paises = this.http.get("https://localhost:44385/api/pais", { headers : 
            { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
              'AppUser' : 'eduardofraga1994@gmail.com'
            }}).pipe(
              map(this.jsonDataToPaises),
              catchError(this.handleError)
          )
          return paises;
    }

    public getEstados(paisId: string): Observable<Estado[]> {
        const estados = this.http.get(`https://localhost:44385/api/estado/${paisId}`, { headers : 
            { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
              'AppUser' : 'eduardofraga1994@gmail.com'
            }}).pipe(
              map(this.jsonDataToEstados),
              catchError(this.handleError)
          )
          return estados;
    }

    public getCidades(estadoId: string): Observable<Estado[]> {
        const cidades = this.http.get(`https://localhost:44385/api/cidade/${estadoId}`, { headers : 
            { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
              'AppUser' : 'eduardofraga1994@gmail.com'
            }}).pipe(
              map(this.jsonDataToCidades),
              catchError(this.handleError)
          )
          return cidades;
    }

    private handleError(error : any) : Observable<any>{
        console.log("ERRO NA REQUISIÇÃO => ",error);
        return throwError(error);
    }

    private jsonDataToFormaPagamento(jsonData: any[], entity) : FormaPagamento[]{
        const formas: FormaPagamento[] = [];
        jsonData.forEach(forma => formas.push(FormaPagamento.fromJson(forma)));
        return formas;
    }

    private jsonDataToCondicaoParcelamento(jsonData: any): CondicaoParcelamento[] {
        const condicoes: CondicaoParcelamento[] = [];

        jsonData.forEach(condicao => condicoes.push(CondicaoParcelamento.fromJson(condicao)));
        return condicoes;
    }

    private jsonDataToCategoria(jsonData: any[], entity) : CategoriaFinanceira[]{
        const categorias: CategoriaFinanceira[] = [];
        jsonData.forEach(categoria => categorias.push(CategoriaFinanceira.fromJson(categoria)));
        return categorias;
    }
 
    private jsonDataToBancos(jsonData: any[], entity) : Banco[]{
        const bancos: Banco[] = [];
        jsonData.forEach(banco => bancos.push(Banco.fromJson(banco)));
        return bancos;
    }

    private jsonDataToPaises(jsonData: any[]) : Pais[]{
        const paises: Pais[] = [];
        jsonData.forEach(pais => paises.push(Pais.fromJson(pais)));
        return paises;
    }

    private jsonDataToEstados(jsonData: any[]) : Estado[]{
        const estados: Estado[] = [];
        jsonData.forEach(estado => estados.push(Estado.fromJson(estado)));
        return estados;
    }

    private jsonDataToCidades(jsonData: any[]) : Cidade[]{
        const cidades: Cidade[] = [];
        jsonData.forEach(cidade => cidades.push(Cidade.fromJson(cidade)));
        return cidades;
    }
}