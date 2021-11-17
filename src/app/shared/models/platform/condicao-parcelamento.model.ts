import { DecimalPipe } from "@angular/common";
import { BaseResourceModel } from "../base/base-resource.model";
export class CondicaoParcelamento extends BaseResourceModel{
    constructor(
        public descricao?: string,
        public qtdParcelas?: number
    ){ super() }

    static fromJson(jsonData: any): CondicaoParcelamento{
        return Object.assign(new CondicaoParcelamento(), jsonData);
    }
}