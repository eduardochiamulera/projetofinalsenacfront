import { BaseResourceModel } from "../../../shared/models/base-resource.model";
export class Pessoa extends BaseResourceModel{
    constructor(
        public nome?: string,
        public observacao?: string,
        public cliente?: boolean
    ){ super() }

    static fromJson(jsonData: any): Pessoa{
        return Object.assign(new Pessoa(), jsonData);
    }
}