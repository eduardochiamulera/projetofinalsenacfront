import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../shared/angular-material.module";
import { NgxPaginationModule } from 'ngx-pagination';
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { ModalComponent } from './components/modal/modal.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './components/confirm-dialog/confirm-dialog.service';

@NgModule({
  declarations: [ModalComponent, ConfirmDialogComponent],
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
    ModalComponent,
    ConfirmDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ConfirmDialogService],
  entryComponents: [ModalComponent,ConfirmDialogComponent]
})
export class SharedModule { }
