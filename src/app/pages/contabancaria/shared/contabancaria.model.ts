import { BaseResourceModel } from "../../../shared/models/base/base-resource.model";

export class ContaBancaria extends BaseResourceModel{
    constructor(
        public nomeConta?: string,
        public agencia?: string,
        public digitoAgencia?: string,
        public conta?: string,
        public digitoConta?: string,
        public bancoId?: string,
        public valorInicial?: number,
        public bancoNome?: string    
    ){ super() }

    static fromJson(jsonData: any): ContaBancaria{
        return Object.assign(new ContaBancaria(), jsonData);
    }
}