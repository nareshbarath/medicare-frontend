import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private baseURL: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  loginAPI(body: any): Observable<Object> {
    return this.http.post(`${this.baseURL}/auth/login`, body);
  }
}
