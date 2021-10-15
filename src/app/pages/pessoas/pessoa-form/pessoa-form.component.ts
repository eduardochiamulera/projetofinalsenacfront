import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Pessoa } from "../shared/pessoa.model";
import { PessoaService } from "../shared/pessoa.service";

import { switchMap } from "rxjs/operators";

import toastr from "toastr";
import { Pais } from 'src/app/shared/models/domain/pais-resource.model';
import { UtilService } from 'src/app/shared/services/Utils/utils-resource.service';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css']
})
export class PessoaFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  pessoaForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  pessoa: Pessoa = new Pessoa();
  myControl = new FormControl();
  options: string[] = ['Delhi', 'Mumbai', 'Banglore'];  
  paises: Pais[] = [];

  constructor(
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildPessoaForm();
    this.LoadPessoa();
    this.loadPaises();
  }
  
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;
    if(this.currentAction == "new")
      this.createPessoa();
    else
    this.updatePessoa();
  }

  //PRIVATE METHODS
  private LoadPessoa() {
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap(params => this.pessoaService.getById(params.get("id")))
      )
      .subscribe(
        (pessoa) => {
          console.log(pessoa)
          this.pessoa = pessoa
          console.log(this.pessoa)
          this.pessoaForm.patchValue(pessoa); //bind loaded pessoa data to pessoaForm
        },
        (error) => alert("Ocorreu um erro no servidor")
      )
      this.pessoaService.getById
    }
  }

  private buildPessoaForm() {
    this.pessoaForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(5)]],
      observacao: [null]
    });
  }

  private setCurrentAction() {
    this.route.snapshot.url[0].path == "new" ? 
      this.currentAction = "new" : this.currentAction = "edit"
  }

  private setPageTitle(){
    if(this.currentAction == "new")
      this.pageTitle = "Cadastro de novo cliente"
    else 
      this.pageTitle = `Editando cliente ${this.pessoa.nome || ""}`
  }

  private createPessoa(){
    const pessoa: Pessoa = Pessoa.fromJson(this.pessoaForm.value);
    pessoa.cliente = true;
    this.pessoaService.create(pessoa).subscribe(
      pessoa => this.actionsForSuccess(pessoa),
      error => this.actionsForError(error)
    )
  }

  private updatePessoa(){
    const pessoa: Pessoa = Pessoa.fromJson(this.pessoaForm.value);
    pessoa.cliente = true;
    this.pessoaService.update(pessoa).subscribe(
      pessoa => this.actionsForSuccess(pessoa),
      error => this.actionsForError(error)
    )
  }

  private actionsForSuccess(pessoa: Pessoa){
    debugger;
    toastr.success("Solicitação processada com sucesso");
    this.router.navigateByUrl("pessoa", {skipLocationChange: true}).then(
    () => this.router.navigateByUrl(`pessoa/${pessoa.id}/edit`)
    )
  }

  private actionsForError(error){
    toastr.error("Ocorreu um erro ao processar sua solicitação!");
    this.submittingForm = false;
    if(error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por Favor tente novamente"]
  }

  private loadPaises(){
    debugger;
    this.pessoaService.utilService.getPaises().subscribe(
      paises => this.paises = paises,
      error => alert("Erro ao carregar a lista" + error)
    )
    console.log(this.paises)
  }
}
