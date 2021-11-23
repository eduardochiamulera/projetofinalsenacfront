import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseResourceModel } from '../../models/base/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    service: BaseResourceService<BaseResourceModel>,
    action: (id, service) => any,
    id: string,
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.service = service;

    return modalRef.result;
  }

}