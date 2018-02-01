import { Component, OnInit, Input } from '@angular/core';
import { PackingList } from './../packinglist'
import { DocsService } from './../services/docs.service'
import { CreatePlModalComponent } from './../modals/create-pl-modal.component'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ResponseModalComponent } from './../modals/response-modal.component'
import { LocStateSummary } from './../loc-state-summary'

@Component({
  selector: 'packing-list',
  templateUrl: './packing-list.component.html',
  styleUrls: ['./packing-list.component.css']
})
export class PackingListComponent implements OnInit {
    pl = new PackingList();
    submitted = false;
    bsModalRef: BsModalRef;
    @Input() loc: LocStateSummary;

    constructor(
      private docsService: DocsService,
      private modalComponent: CreatePlModalComponent,
      private modalService: BsModalService) { }

    createpl(): void {
      this.pl.advisingBank = this.loc[0].advisory;
      this.pl.issuingBank = this.loc[0].issuer;
      this.docsService.createPackingList(this.pl).then(result => this.callResponse(result));
      this.close()
    }

    autoComplete(): void {
      let d = new Date()
      this.pl.issueDate = d;
      this.pl.orderNumber = this.loc[0].orderRef;
      this.pl.sellersOrderNumber = this.loc[0].orderRef;
      this.pl.transportMethod = 'Ship';
      this.pl.nameOfVessel = 'SurfRider';
      this.pl.billOfLadingNumber = this.loc[0].orderRef;
      this.pl.sellerName = 'Seller';
      this.pl.sellerAddress = '123 Street. Beijing, China';
      this.pl.buyerName = 'Buyer';
      this.pl.buyerAddress = '123 Main St. Awesome Town, ZZ 11111';
      this.pl.goodsDescription = this.loc[0].description;
      this.pl.goodsPurchaseOrderRef = this.loc[0].orderRef;
      this.pl.goodsQuantity = 10000;
      this.pl.goodsUnitPrice = this.loc[0].amount;
      this.pl.goodsGrossWeight = 1000;
    }

    callResponse(result: String): void {
      this.bsModalRef = this.modalService.show(ResponseModalComponent);
      this.bsModalRef.content.title = 'Response';
      this.bsModalRef.content.body = result;
    }

    close(): void {
      this.modalComponent.close();
    }

    ngOnInit() {
    }

    onSubmit() {
      this.submitted = true;
      this.createpl();
    }

  }
