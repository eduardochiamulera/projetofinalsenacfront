import { Guid } from "guid-typescript";
export class Pessoa{
    constructor(
        public id?: Guid,
        public nome?: string,
        public observacao?: string
    ){}
}