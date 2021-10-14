import { BaseResourceModel } from "../base/base-resource.model";

export class Pais extends BaseResourceModel{
    constructor(sigla?: string,
                nome?: string,
                utcId?: string,
                codigoIbge?: string,){
        super()
    }
}