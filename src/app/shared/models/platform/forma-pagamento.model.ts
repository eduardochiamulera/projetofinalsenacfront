import { DecimalPipe } from "@angular/common";
import { BaseResourceModel } from "../base/base-resource.model";
export class FormaPagamento extends BaseResourceModel{
    constructor(
        public descricao?: string,
        public tipoFormaPagamento?: string
    ){ super() }

    static fromJson(jsonData: any): FormaPagamento{
        return Object.assign(new FormaPagamento(), jsonData);
    }
}