import { Component, Injectable, Injector, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { ContaBancaria } from 'src/app/pages/contabancaria/shared/contabancaria.model';
import { ContaFinanceira } from '../../models/platform/conta-financeira.model';
import { ContaBancariaService } from '../../services/contabancaria.service';

import toastr from "toastr";
import { ModalService } from './services/modal.service';
import { ContaFinanceiraBaixa } from '../../models/platform/conta-financeira-baixa.model';

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
  
  @Input() public modalConfig: ModalConfig
  @ViewChild('modal') private modalContent: TemplateRef<ModalComponent>
  private modalRef: NgbModalRef
  resourceFormModal: FormGroup;
  conta : ContaFinanceira;
  contasBancarias: ContaBancaria[] = [];
  public keywordModal = 'nomeConta';
  submittingForm: boolean = false;
  private modalService: ModalService

  constructor(private modalNgb: NgbModal, 
    private formBuilder: FormBuilder,
    private contaBancariaService: ContaBancariaService,
    private injector: Injector) { 
      this.modalService = new ModalService(injector);
    }

  ngOnInit(): void {
    this.buildForm()
    this.contaBancariaService.getAll().subscribe(
      contas => this.contasBancarias = contas,
    error => alert("Erro ao carregar a lista de contas bancarias")
  )
   }

  private buildForm(){
    this.resourceFormModal = this.formBuilder.group({
      contaFinanceiraId: [null, [Validators.required]],
      descricao: [null],
      valorPrevisto: [null],
      dataEmissao: [null],
      dataVencimento: [null],
      saldo: [null],
      valorPagoModal: [null, [Validators.required, Validators.nullValidator]],
      observacaoBaixa:[null],
      contaBancariaNome:[null, [Validators.required]],
    })
  }

  private setForm(){
    this.conta.dataEmissao = this.conta.dataEmissao.replace("T00:00:00","");
    this.conta.dataVencimento = this.conta.dataEmissao.replace("T00:00:00","");
    this.resourceFormModal.patchValue(this.conta);
    this.resourceFormModal.patchValue({
      contaFinanceiraId: this.conta.id
    })
  }

  open(value : ContaFinanceira): Promise<boolean> {
    this.conta = value;
    this.setForm();
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalNgb.open(this.modalContent)
      this.modalRef.result.then(resolve, resolve)
    })
  }

  submit(){
    debugger
    this.submittingForm = true;
    const contaFinanceiraBaixa: ContaFinanceiraBaixa = new 
    ContaFinanceiraBaixa(this.resourceFormModal.value.contaFinanceiraId,
      this.resourceFormModal.value.valorPagoModal,this.resourceFormModal.value.observacaoBaixa,
      this.resourceFormModal.value.contaBancariaNome.id)
    this.modalService.create(contaFinanceiraBaixa).subscribe(
      (resource) => toastr.success("Solicitação processada com sucesso"),
      (error) => toastr.error(error.message)
    );  
    this.close();
    window.location.reload();
  }

  fnCalculaSaldo(valorPago){
    const valor = this.conta.saldo - valorPago;
    if(valorPago > 0){
      if(valorPago > this.conta.saldo){
        toastr.warning('O valor pago não pode ser maior que o saldo remanescente');
        this.resourceFormModal.patchValue({
          valorPagoModal: null
        })
      }else{
        this.resourceFormModal.patchValue({
          saldo: valor
        })
      }
    }else{
      this.resourceFormModal.patchValue({
        saldo: this.conta.saldo
      })
    }
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
