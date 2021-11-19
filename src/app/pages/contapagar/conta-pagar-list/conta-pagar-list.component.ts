import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
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
  
  constructor(private contapagarService: ContaPagarService) {
    super(contapagarService);
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
