import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'modal-content',
  styleUrls: ['./modal.component.scss'],
  template: `
  <div class="modal-main">
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <create-invoice></create-invoice>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">Close</button>
    </div>
  </div>
  `
})
export class CreateInvoiceModalComponent {
  public title: string;
  public ref: string;
  public body: Component;
  constructor(public bsModalRef: BsModalRef) {}

  public close() {
    this.bsModalRef.hide();
  }
}