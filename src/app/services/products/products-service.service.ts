import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsServiceService {
  private baseURL: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  listProducts(): Observable<Object> {
    let headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.get(`${this.baseURL}/product/listproduct`, { headers });
  }

  addProduct(body: any): Observable<Object> {
    let headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.post(`${this.baseURL}/product/addproduct`, body, {
      headers,
    });
  }

  updateProduct(id: any, body: any): Observable<Object> {
    let headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.post(`${this.baseURL}/product/updateproduct/${id}`, body, {
      headers,
    });
  }

  updateStatus(id: any): Observable<Object> {
    let headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.patch(
      `${this.baseURL}/product/productstatus/${id}`,
      {},
      {
        headers,
      }
    );
  }

  deleteProduct(id: any): Observable<Object> {
    let headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.patch(
      `${this.baseURL}/product/deleteproduct/${id}`,
      {},
      {
        headers,
      }
    );
  }

  getProducts(): Observable<Object> {
    let headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.get(`${this.baseURL}/product/getproducts`, { headers });
  }
}
