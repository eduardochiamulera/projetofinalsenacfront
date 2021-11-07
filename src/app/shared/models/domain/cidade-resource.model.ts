import { BaseResourceModel } from "../base/base-resource.model";
import { Estado } from "./estado-resource.model";
import { Pais } from "./pais-resource.model";

export class Cidade extends BaseResourceModel{
    constructor(public nome?: string,
                estadoId?: string                
            ){
        super()
    }
    
    static fromJson(jsonData: any) : Cidade{
        return Object.assign(new Cidade(), jsonData);
    }
}