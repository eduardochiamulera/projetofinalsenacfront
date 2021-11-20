import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { ModalComponent, ModalConfig } from 'src/app/shared/components/modal/modal.component';
import { ContaFinanceira } from 'src/app/shared/models/platform/conta-financeira.model';
import { ContaPagarService } from '../shared/conta-pagar.service';

@Component({
  selector: 'app-conta-pagar-list',
  templateUrl: './conta-pagar-list.component.html',
  styleUrls: ['./conta-pagar-list.component.css']
})
export class ContaPagarListComponent extends BaseResourceListComponent<ContaFinanceira>{

  @ViewChild('modal') private modal: ModalComponent

  constructor(private contapagarService: ContaPagarService,
    private confirmDialogService: ConfirmDialogService) {
    super(contapagarService);
   }

   public openConfirmDialog(id, descricao) {
    this.confirmDialogService.confirm(this.contapagarService,this.cancelarBaixas,id,
      'Por favor confirme..', `Deseja excluir as baixas da conta ${descricao.toUpperCase()}... ?`
      ,'Sim', 'Não', 'lg')
    .then((confirmed) => console.log('teste confirmed'))
    .catch((error) => console.log('teste'));
  }

  cancelarBaixas(id, service) : any{
    service.cancelarBaixas(id).subscribe(
      resource => this.actionsForSuccess(),
      error => this.errorOnLoadList("Erro ao calcular data de vencimento")
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
