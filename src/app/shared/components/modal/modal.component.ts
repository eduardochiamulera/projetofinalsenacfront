import { Component, Injectable, Injector, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { ContaBancaria } from 'src/app/pages/contabancaria/shared/contabancaria.model';
import { ContaFinanceira } from '../../models/platform/conta-financeira.model';
import { ContaBancariaService } from '../../services/contabancaria.service';

export interface ModalConfig {
  modalTitle: string
  dismissButtonLabel: string
  closeButtonLabel: string
  shouldClose?(): Promise<boolean> | boolean
  shouldDismiss?(): Promise<boolean> | boolean
  onClose?(): Promise<boolean> | boolean
  onDismiss?(): Promise<boolean> | boolean
  disableCloseButton?(): boolean
  disableDismissButton?(): boolean
  hideCloseButton?(): boolean
  hideDismissButton?(): boolean
}

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
@Injectable()
export class ModalComponent implements OnInit {
  
  keyword: 'nomeConta'; 
  @Input() public modalConfig: ModalConfig
  @ViewChild('modal') private modalContent: TemplateRef<ModalComponent>
  private modalRef: NgbModalRef
  resourceForm: FormGroup;
  conta : ContaFinanceira;
  contasBancarias: ContaBancaria[] = [];

  constructor(private modalService: NgbModal, 
    private formBuilder: FormBuilder,
    private contaBancariaService: ContaBancariaService) { }

  ngOnInit(): void {
    this.buildForm()
    this.contaBancariaService.getAll().subscribe(
      contas => this.contasBancarias = contas,
    error => alert("Erro ao carregar a lista de contas bancarias")
  )
   }

  private buildForm(){
    this.resourceForm = this.formBuilder.group({
      descricao: [null],
      valorPrevisto: [null],
      dataEmissao: [null],
      dataVencimento: [null],
      saldo: [null],
      valorPago: [null]
    })
  }

  private setForm(){
    this.conta.dataEmissao = this.conta.dataEmissao.replace("T00:00:00","");
    this.conta.dataVencimento = this.conta.dataEmissao.replace("T00:00:00","");
    this.resourceForm.patchValue(this.conta);
  }

  open(value : ContaFinanceira): Promise<boolean> {
    this.conta = value;
    this.setForm();
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent)
      this.modalRef.result.then(resolve, resolve)
    })
  }

  async close(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose())
      this.modalRef.close(result)
    }
  }

  async dismiss(): Promise<void> {
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss())
      this.modalRef.dismiss(result)
    }
  }
}
