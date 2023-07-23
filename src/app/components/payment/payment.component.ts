import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from 'src/app/services/cart/cart-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  total: any;

  constructor(
    private router: Router,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    let sessionTotal: any = sessionStorage.getItem('total');
    sessionTotal = JSON.parse(sessionTotal);
    this.total = sessionTotal;
  }

  pay() {
    this.cartService.completeOrder().subscribe(
      (res: any) => {
        sessionStorage.clear();
        this.router.navigateByUrl('cart').then(() => {
          Swal.fire('', 'Order placed successfully', 'success');
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
