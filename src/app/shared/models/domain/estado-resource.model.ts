import { BaseResourceModel } from "../base/base-resource.model";
import { Pais } from "./pais-resource.model";

export class Estado extends BaseResourceModel{
    constructor(sigla?: string,
                nome?: string,
                utcId?: string,
                codigoIbge?: string,
                paisId?: string,
                pais?: Pais
            ){
        super()
    }
}