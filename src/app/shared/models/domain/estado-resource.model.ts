import { BaseResourceModel } from "../base/base-resource.model";
import { Pais } from "./pais-resource.model";

export class Estado extends BaseResourceModel{
    constructor(public nome?: string,
                public paisId?: string,
            ){
        super()
    }

    static fromJson(jsonData: any) : Estado{
        return Object.assign(new Estado(), jsonData);
    }
}