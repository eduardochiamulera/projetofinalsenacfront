import { DecimalPipe } from "@angular/common";
import { BaseResourceModel } from "../base/base-resource.model";
export class ContaFinanceira extends BaseResourceModel{
    constructor(
        public valorPrevisto?: number,
        public valorPago?: number,
        public categoriaId?: string,
        public condicaoParcelamentoId?: string,
        public pessoaId?: string,
        public dataEmissao?: string,
        public dataVencimento?: string,
        public descricao?: string,
        public observacao?: string,
        public formaPagamentoId?: string,
        public statusContaBancaria?: string,
        public repetir?: string,
        public tipoPeriodicidade?: string,
        public numeroRepeticoes?: string,
        public descricaoParcela?: string,
        public saldo?: string,
        public numero?: string,
        public categoriaNome?: string,
        public condicaoParcelamentoNome?: string,
        public pessoaNome?: string,
        public formaPagamentoNome?: string,
    ){ super() }

    static fromJson(jsonData: any): ContaFinanceira{
        return Object.assign(new ContaFinanceira(), jsonData);
    }
}