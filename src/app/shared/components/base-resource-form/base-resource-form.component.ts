import { Component, OnInit, AfterContentChecked , Injector, Injectable} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { switchMap } from "rxjs/operators";
import { BaseResourceModel } from "../../models/base/base-resource.model";
import { BaseResourceService } from "../../services/base-resource.service";

import toastr from "toastr";

@Injectable()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  keyword = 'nome';
  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  myControl = new FormControl();
  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T
  ) { 
      this.route = this.injector.get(ActivatedRoute);
      this.router = this.injector.get(Router);
      this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.LoadResource();
    this.buildResourceForm();
  }
  
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;
    if(this.currentAction == "new")
      this.createResource();
    else
    this.updateResource();
  }

  //PROTECTED METHODS
  protected LoadResource() {
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(params.get("id")))
      )
      .subscribe(
        (resource) => {
          this.resource = resource
          console.log(this.resource)
          this.resourceForm.patchValue(resource); //bind loaded resource data to resourceForm
          this.afterLoad();
        },
        (error) => this.errorOnLoadList("Ocorreu um erro no servidor")
      )
      this.resourceService.getById
    }
  }

  protected setCurrentAction() {
    this.route.snapshot.url[0].path == "new" ? 
      this.currentAction = "new" : this.currentAction = "edit"
  }

  protected setPageTitle(){
    if(this.currentAction == "new")
      this.pageTitle = this.creationPageTitle();
    else 
      this.pageTitle = this.editionPageTitle();
  }

  protected creationPageTitle() : string {
    return "Novo";
  }

  protected editionPageTitle() : string {
    return "Edição";
  }

  protected createResource(){
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.create(resource).subscribe(
        resource => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    )
  }

  protected updateResource(){
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    
    this.resourceService.update(resource).subscribe(
        resource => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    )
  }

  protected actionsForSuccess(resource: T){
    toastr.success("Solicitação processada com sucesso");
    const baseComponentpath: string = this.route.snapshot.parent.url[0].path;

    this.router.navigateByUrl(baseComponentpath, {skipLocationChange: true}).then(
    () => this.router.navigateByUrl(`${baseComponentpath}/${resource.id}/edit`)
    )
  }

  protected actionsForError(error){
    toastr.error("Ocorreu um erro ao processar sua solicitação!");
    this.submittingForm = false;
    if(error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else if(error.status === 500)
      this.serverErrorMessages = JSON.parse(error.error);
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por Favor tente novamente"]
  }

  protected errorOnLoadList(message){
    toastr.error(message);
  }

  protected abstract buildResourceForm(): void;

  protected abstract afterLoad(): void;
  
}
