import { Component, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ContaFinanceira } from 'src/app/shared/models/platform/conta-financeira.model';
import { ContaPagarService } from '../shared/conta-pagar.service';

@Component({
  selector: 'app-conta-pagar-list',
  templateUrl: './conta-pagar-list.component.html',
  styleUrls: ['./conta-pagar-list.component.css']
})
export class ContaPagarListComponent extends BaseResourceListComponent<ContaFinanceira>{

  constructor(private contapagarService: ContaPagarService) {
    super(contapagarService);
   }
}
