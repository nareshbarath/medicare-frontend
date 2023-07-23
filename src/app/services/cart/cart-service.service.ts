import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  private baseURL: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getCart(): Observable<Object> {
    let headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.get(`${this.baseURL}/order/getorder`, { headers });
  }

  updateOrder(orderJSON: any): Observable<Object> {
    let headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.post(
      `${this.baseURL}/order/updateorder`,
      { orderJSON },
      { headers }
    );
  }

  createOrder(orderJSON: any): Observable<Object> {
    let headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.post(
      `${this.baseURL}/order/createorder`,
      { orderJSON },
      { headers }
    );
  }

  completeOrder(): Observable<Object> {
    let headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.patch(
      `${this.baseURL}/order/completeorder`,
      {},
      { headers }
    );
  }
}
