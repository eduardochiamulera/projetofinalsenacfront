import { Cidade } from "src/app/shared/models/domain/cidade-resource.model";
import { Estado } from "src/app/shared/models/domain/estado-resource.model";
import { Pais } from "src/app/shared/models/domain/pais-resource.model";
import { BaseResourceModel } from "../../../shared/models/base/base-resource.model";
export class Pessoa extends BaseResourceModel{
    constructor(
        public nome?: string,
        public observacao?: string,
        public tipoDocumento?: string,
        public cpfcnpj?: string,
        public cep?: string,
        public endereco?: string,
        public numero?: string,
        public complemento?: string,
        public bairro?: string,
        public cidadeId?: string,
        public estadoId?: string,
        public telefone?: string,
        public celular?: string,
        public contato?: string,
        public email?: string,
        public nomeComercial?: string,
        public cliente?: boolean,
        public fornecedor?: boolean,
        public estado?: Estado,
        public pais?: Pais,
        public cidade?: Cidade
    ){ super() }

    static fromJson(jsonData: any): Pessoa{
        return Object.assign(new Pessoa(), jsonData);
    }
}