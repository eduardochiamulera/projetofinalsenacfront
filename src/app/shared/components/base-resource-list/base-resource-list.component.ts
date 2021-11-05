import { Component, Injectable, OnInit } from '@angular/core';
import { element } from 'protractor';
import { BaseResourceModel } from "../../models/base/base-resource.model";
import { BaseResourceService } from "../../services/base-resource.service";
import toastr from "toastr";

@Injectable()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];
  public paginaAtual = 1;
  public pageSize = 10;
  constructor(private baseResourceService: BaseResourceService<T>) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.baseResourceService.getAll().subscribe(
        resources => this.resources = resources,
      error => alert("Erro ao carregar a lista")
    )
  }

  deleteResource(resource){
    const mustDelete = confirm('Deseja realmente excluir este item?');
    if(mustDelete){
      this.baseResourceService.delete(resource.id).subscribe(
        () => this.actionsForSuccess(),
        error => this.actionsForError(error)
      );
    }
  }

  protected actionsForSuccess(){
    toastr.success("Solicitação processada com sucesso");
    this.getAll();
  }

  protected actionsForError(error){
    toastr.error("Ocorreu um erro ao processar sua solicitação!");
  }

}
