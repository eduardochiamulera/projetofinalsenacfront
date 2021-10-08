import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Pessoa } from "../shared/pessoa.model";
import { PessoaService } from "../shared/pessoa.service";

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css']
})
export class PessoaListComponent implements OnInit {

  pessoas: Pessoa[] = [];
  constructor(private pessoaService: PessoaService) { }

  ngOnInit(): void {
    this.pessoaService.getAll().subscribe(
      pessoas => this.pessoas = pessoas,
      error => alert("Erro ao carregar a lista")
    )
  }

  deleteCliente(pessoa){
    const mustDelete = confirm('Desenja realmente excluir este item?');
    if(mustDelete){
      this.pessoaService.delete(pessoa.id).subscribe(
        () => this.pessoas = this.pessoas.filter(element => element != pessoa),
        () => alert('Erro ao tentar excluir')
      );
    }
  }

}
