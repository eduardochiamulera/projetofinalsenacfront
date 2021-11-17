import { DecimalPipe } from "@angular/common";
import { BaseResourceModel } from "../base/base-resource.model";
export class CategoriaFinanceira extends BaseResourceModel{
    constructor(
        public descricao?: string,
        public tipoCarteira?: string
    ){ super() }

    static fromJson(jsonData: any): CategoriaFinanceira{
        return Object.assign(new CategoriaFinanceira(), jsonData);
    }
}