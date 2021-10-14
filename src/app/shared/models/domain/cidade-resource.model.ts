import { BaseResourceModel } from "../base/base-resource.model";
import { Estado } from "./estado-resource.model";
import { Pais } from "./pais-resource.model";

export class Cidade extends BaseResourceModel{
    constructor(nome?: string,
                codigoIbge?: string,
                estadoId?: string,
                estado?: Estado
            ){
        super()
    }
}