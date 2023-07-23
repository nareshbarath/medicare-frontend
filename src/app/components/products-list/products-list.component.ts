import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/services/cart/cart-service.service';
import { CategoryServiceService } from 'src/app/services/category/category-service.service';
import { ProductsServiceService } from 'src/app/services/products/products-service.service';
import { SellerServiceService } from 'src/app/services/seller/seller-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  searchText?: string;
  products: any = [];
  items: any = [];
  counter: any = {};
  seller_id: any;
  category_id: any;
  sort: any;
  sellers: any = [];
  category: any = [];

  constructor(
    private productService: ProductsServiceService,
    private sellerServices: SellerServiceService,
    private categoryService: CategoryServiceService,
    private cartService: CartServiceService
  ) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (res: any) => {
        this.products = res.data;
        this.items = res.data;
        if (this.products.length == 0)
          Swal.fire('', 'No data found', 'warning');
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
      },
      (err) => {
        Swal.fire('', 'No data found', 'warning');
      }
    );

    this.cartService.getCart().subscribe(
      (res: any) => {
        if (!res.data) {
          this.cartService
            .createOrder(JSON.stringify(this.counter))
            .subscribe((response: any) => {});
        } else {
          this.counter = JSON.parse(res.data.orderJSON);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  add(id: number) {
    this.counter[id] = this.counter[id] ? this.counter[id] + 1 : 1;
    this.cartService.updateOrder(JSON.stringify(this.counter)).subscribe(
      (res: any) => {},
      (err) => {
        console.log(err);
      }
    );
  }
  remove(id: number) {
    if (this.counter[id] && this.counter[id] > 0) {
      this.counter[id] = this.counter[id] - 1;
      this.cartService.updateOrder(JSON.stringify(this.counter)).subscribe(
        (res: any) => {},
        (err) => {
          console.log(err);
        }
      );
    }
  }

  search() {
    let filter: any = this.items;

    if (this.searchText) {
      let temp_search = [];
      for (const product of filter) {
        if (product.name.toLowerCase().includes(this.searchText.toLowerCase()))
          temp_search.push(product);
      }
      filter = temp_search;
    }

    if (this.category_id) {
      let temp_category = [];
      for (const product of filter) {
        if (product.categoryId == this.category_id) temp_category.push(product);
      }
      filter = temp_category;
    }

    if (this.seller_id) {
      let temp_seller = [];
      for (const product of filter) {
        if (product.sellerId == this.seller_id) temp_seller.push(product);
      }
      filter = temp_seller;
    }

    if (this.sort) {
      if (this.sort == 1)
        filter = filter.sort((e: any, f: any) => e.price - f.price);

      if (this.sort == 2)
        filter = filter.sort((e: any, f: any) => f.price - e.price);
    }

    this.products = filter;
  }
}
