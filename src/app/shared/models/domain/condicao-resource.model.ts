import { BaseResourceModel } from "../base/base-resource.model";

export class CondicaoParcelamentoParcela extends BaseResourceModel{
    constructor(descricao?: string,
        dataVencimento?: Date,
        valor?: number,
            ){
        super()
    }

    static fromJson(jsonData: any) : CondicaoParcelamentoParcela{
        return Object.assign(new CondicaoParcelamentoParcela(), jsonData);
    }
}