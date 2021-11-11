import { BaseResourceModel } from "../base/base-resource.model";

export class Banco extends BaseResourceModel{
    constructor(codigo?: string,
                nome?: string,
            ){
        super()
    }

    static fromJson(jsonData: any) : Banco{
        return Object.assign(new Banco(), jsonData);
    }
}