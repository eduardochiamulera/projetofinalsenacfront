import { Component, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ContaBancaria } from '../shared/contabancaria.model';
import { ContaBancariaService } from '../shared/contabancaria.service';

@Component({
  selector: 'app-conta-bancaria-list',
  templateUrl: './conta-bancaria-list.component.html',
  styleUrls: ['./conta-bancaria-list.component.css']
})
export class ContaBancariaListComponent extends BaseResourceListComponent<ContaBancaria>{

  constructor(private contaBancariaService: ContaBancariaService) {
    super(contaBancariaService);
   }
}
