import { HttpClient } from "@angular/common/http";
import { map, catchError, flatMap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { Pais } from "../../models/domain/pais-resource.model";
import { Injector } from "@angular/core";

export class UtilService{

    http: HttpClient;
    
    constructor(protected injector: Injector){
        this.http = injector.get(HttpClient);
    }
    
    getPaises(): Observable<Pais[]> {
        const paises = this.http.get("https://localhost:44385/api/pais", { headers : 
            { 'EmpresaId' : '525CAC79-4352-4A12-A7A4-18395F1AAEC5',
              'AppUser' : 'eduardofraga1994@gmail.com'
            }}).pipe(
              map(this.jsonDataToPaises),
              catchError(this.handleError)
          )
          return paises;
    }

    private handleError(error : any) : Observable<any>{
        console.log("ERRO NA REQUISIÇÃO => ",error);
        return throwError(error);
    }

    private jsonDataToPaises(jsonData: any[]) : Pais[]{
        const paises: Pais[] = [];
        jsonData.forEach(pais => paises.push(Pais.fromJson(pais)));
        console.log(paises);
        return paises;
    }
}