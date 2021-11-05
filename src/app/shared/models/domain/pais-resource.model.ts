import { BaseResourceModel } from "../base/base-resource.model";

export class Pais extends BaseResourceModel{
    constructor(public nome?: string){
        super()
    }

    static fromJson(jsonData: any) : Pais{
        return Object.assign(new Pais(), jsonData);
    }
}