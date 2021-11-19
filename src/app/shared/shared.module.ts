import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../shared/angular-material.module";
import { NgxPaginationModule } from 'ngx-pagination';
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    AutocompleteLibModule,
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    ModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ModalComponent]
})
export class SharedModule { }
