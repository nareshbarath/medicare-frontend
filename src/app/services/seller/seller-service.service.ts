import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerServiceService {
  private baseURL: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  listSellers(): Observable<Object> {
    let headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.get(`${this.baseURL}/sellers/listsellers`, { headers });
  }

  addSeller(body: any): Observable<Object> {
    let headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.post(`${this.baseURL}/sellers/addseller`, body, {
      headers,
    });
  }

  updateSeller(id: any, body: any): Observable<Object> {
    let headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.post(`${this.baseURL}/sellers/updateseller/${id}`, body, {
      headers,
    });
  }
}
