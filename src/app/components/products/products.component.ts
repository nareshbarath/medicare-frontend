import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryServiceService } from 'src/app/services/category/category-service.service';
import { ProductsServiceService } from 'src/app/services/products/products-service.service';
import { SellerServiceService } from 'src/app/services/seller/seller-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  editFormValues: any = {};
  products: any = [];
  sellers: any = [];
  category: any = [];

  constructor(
    private productServices: ProductsServiceService,
    private sellerServices: SellerServiceService,
    private categoryService: CategoryServiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.editFormValues = {};
    this.productServices.listProducts().subscribe(
      (res: any) => {
        this.products = res.data;
        if (this.products.length == 0)
          Swal.fire('', 'No data found', 'warning');
      },
      (err) => {
        Swal.fire('', 'No data found', 'warning');
      }
    );
    this.sellerServices.listSellers().subscribe(
      (res: any) => {
        this.sellers = res.data;
      },
      (err) => {}
    );
    this.categoryService.listCategories().subscribe(
      (res: any) => {
        this.category = res.data;
      },
      (err) => {}
    );
  }

  add(mymodal: any) {
    this.editFormValues = {};
    this.modalService.open(mymodal, { ariaLabelledBy: 'add-product' });
  }

  addProduct(addProductForm: any, id?: number) {
    if (id) {
      this.productServices.updateProduct(id, addProductForm.value).subscribe(
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
      this.productServices.addProduct(addProductForm.value).subscribe(
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

  edit(id: any, mymodal: any) {
    const findEditSeller = this.products.filter(
      (product: any) => product.id == id
    )[0];
    this.editFormValues = {
      id: findEditSeller.id,
      name: findEditSeller.name,
      description: findEditSeller.description,
      price: findEditSeller.price,
      seller_id: findEditSeller.seller_id,
      category_id: findEditSeller.category_id,
    };

    this.modalService.open(mymodal, { ariaLabelledBy: 'add-product' });
  }

  statusUpdate(id: any) {
    this.productServices.updateStatus(id).subscribe(
      (res: any) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        Swal.fire('', err.error.message, 'warning');
      }
    );
  }

  delete(id: any) {
    this.productServices.deleteProduct(id).subscribe(
      (res: any) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        Swal.fire('', err.error.message, 'warning');
      }
    );
  }
}
