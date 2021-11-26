import { BaseResourceModel } from "../base/base-resource.model";

export class ContaFinanceiraBaixa extends BaseResourceModel{
    constructor(
        public data?: string,
        public contaFinanceiraId?: string,
        public valor?: number,
        public observacao?: string,
        public contaBancariaId?: string
    ){ super() }

    static fromJson(jsonData: any): ContaFinanceiraBaixa{
        return Object.assign(new ContaFinanceiraBaixa(), jsonData);
    }
}