import { OnInit, Injector, Injectable} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { switchMap } from "rxjs/operators";
import { BaseResourceModel } from "../../models/base/base-resource.model";
import { BaseResourceService } from "../../services/base-resource.service";


@Injectable()
export abstract class BaseResourceViewComponent<T extends BaseResourceModel> implements OnInit {

  resourceForm: FormGroup;
  pageTitle: string = "Visualizar";
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
    this.buildResourceForm();
    this.LoadResource();
  }
  
  //PROTECTED METHODS
  protected LoadResource() {
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(params.get("id")))
      )
      .subscribe(
        (resource) => {
          this.resource = resource
          this.resourceForm.patchValue(resource); //bind loaded resource data to resourceForm
        },
        (error) => alert("Ocorreu um erro no servidor")
      )
      this.resourceService.getById
  }

  protected abstract buildResourceForm(): void;
}
