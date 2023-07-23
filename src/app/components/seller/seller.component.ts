import { Component, OnInit } from '@angular/core';
import { SellerServiceService } from 'src/app/services/seller/seller-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent implements OnInit {
  editFormValues: any = {};
  sellers: any = [];

  constructor(
    private sellerService: SellerServiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.editFormValues = {};
    this.sellerService.listSellers().subscribe(
      (res: any) => {
        this.sellers = res.data;
        if (this.sellers.length == 0) Swal.fire('', 'No data found', 'warning');
      },
      (err) => {
        Swal.fire('', 'No data found', 'warning');
      }
    );
  }

  add(mymodal: any) {
    this.editFormValues = {};
    this.modalService.open(mymodal, { ariaLabelledBy: 'add-seller' });
  }

  addSeller(addSellerForm: any, id?: number) {
    if (id) {
      this.sellerService
        .updateSeller(id, {
          sellerName: addSellerForm.value.name,
          sellerDescription: addSellerForm.value.description,
        })
        .subscribe(
          (res: any) => {
            this.modalService.dismissAll();
            this.ngOnInit();
          },
          (err) => {
            console.log(err);
            Swal.fire('', err.error.message, 'warning');
          }
        );
    } else {
      this.sellerService
        .addSeller({
          sellerName: addSellerForm.value.name,
          sellerDescription: addSellerForm.value.description,
        })
        .subscribe(
          (res: any) => {
            this.modalService.dismissAll();
            this.ngOnInit();
          },
          (err) => {
            console.log(err);
            Swal.fire('', err.error.message, 'warning');
          }
        );
    }
  }

  edit(id: number, mymodal: any) {
    const findEditSeller = this.sellers.filter(
      (seller: any) => seller.id == id
    )[0];

    this.editFormValues = {
      id: findEditSeller.id,
      name: findEditSeller.sellerName,
      description: findEditSeller.sellerDescription,
    };
    this.modalService.open(mymodal, { ariaLabelledBy: 'add-seller' });
  }
}
