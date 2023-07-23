import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from 'src/app/services/cart/cart-service.service';
import { ProductsServiceService } from 'src/app/services/products/products-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any = [];
  total: any = 0;
  counter: any = {};

  constructor(
    private productService: ProductsServiceService,
    private cartService: CartServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(
      (res: any) => {
        if (!res.data) {
        } else {
          this.counter = JSON.parse(res.data.orderJSON);
        }
      },
      (err) => {
        console.log(err);
      }
    );

    this.productService.listProducts().subscribe(
      (res: any) => {
        this.setCart(this.counter, res.data);
      },
      (err) => {}
    );
  }

  setCart(sessionCart: any, products: [any]) {
    for (const key in sessionCart) {
      const count = sessionCart[key];
      if (count > 0) {
        const product = products.filter((e) => e.id == key)[0];
        product.count = count;
        product.subtotal = count * product.price;
        this.total += product.subtotal;
        this.cart.push(product);
      }
    }
  }

  payment() {
    sessionStorage.removeItem('total');
    sessionStorage.setItem('total', this.total);
    this.router.navigateByUrl('payment');
  }
}
