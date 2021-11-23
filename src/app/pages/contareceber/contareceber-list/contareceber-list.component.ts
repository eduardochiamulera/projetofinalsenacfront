import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { ModalComponent, ModalConfig } from 'src/app/shared/components/modal/modal.component';
import { ContaFinanceira } from 'src/app/shared/models/platform/conta-financeira.model';
import { ContaReceberService } from '../shared/conta-receber.service';

@Component({
  selector: 'app-contareceber-list',
  templateUrl: './contareceber-list.component.html',
  styleUrls: ['./contareceber-list.component.css']
})
export class ContaReceberListComponent extends BaseResourceListComponent<ContaFinanceira>{

  @ViewChild('modal') private modal: ModalComponent

  constructor(private contareceberService: ContaReceberService,
    private confirmDialogService: ConfirmDialogService) {
    super(contareceberService);
   }

   public openConfirmDialog(id, descricao) {
    this.confirmDialogService.confirm(this.contareceberService,this.cancelarBaixas,id,
      'Por favor confirme..', `Deseja excluir as baixas da conta ${descricao.toUpperCase()}... ?`
      ,'Sim', 'Não', 'lg')
    .then((confirmed) => console.log('teste confirmed'))
    .catch((error) => console.log('teste'));
  }

  cancelarBaixas(id, service) : any{
    service.cancelarBaixas(id).subscribe(
      (resource) => service.fnSucces(),
      (error) => service.fnError()
    )
  }

   public modalConfig: ModalConfig = {
     modalTitle: "Baixar Conta",
     onDismiss: () => {
       return true
     },
     dismissButtonLabel: "Dismiss",
     onClose: () => {
       return true
     },
     closeButtonLabel: "Close"
   }
 
   async openModal(value) {
     return await this.modal.open(value)
   }
}
