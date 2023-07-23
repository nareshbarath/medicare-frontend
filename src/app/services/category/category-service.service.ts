import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryServiceService {
  private baseURL: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  listCategories(): Observable<Object> {
    let headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.get(`${this.baseURL}/category/listcategory`, { headers });
  }

  addCategory(body: any): Observable<Object> {
    let headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.post(`${this.baseURL}/category/addcategory`, body, {
      headers,
    });
  }

  updateCategory(id: any, body: any): Observable<Object> {
    let headers = new HttpHeaders().set(
      'authorization',
      `Bearer ${localStorage.getItem('token')}` || ''
    );
    return this.http.post(
      `${this.baseURL}/category/updatecategory/${id}`,
      body,
      {
        headers,
      }
    );
  }
}
