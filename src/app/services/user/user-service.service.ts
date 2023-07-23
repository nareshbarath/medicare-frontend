import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private baseURL: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  registerAPI(body: any): Observable<Object> {
    return this.http.post(`${this.baseURL}/users/adduser`, body);
  }
}
