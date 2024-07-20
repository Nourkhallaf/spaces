
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { User, UserReqModel } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = 'https://reqres.in/api';
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {

    return this.http.post(`${this.API_URL}/login`, credentials).pipe(
      tap((response: any) => {
        this.token = response.token;
        localStorage.setItem('token', this.token!);
      })
    );
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.API_URL}/users`);
  }

  getUsersWithDelay(): Observable<any> {
    return this.http.get(`${this.API_URL}/users?delay=3`);
  }

  getUser(userId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/users/${userId}`);
  }
  createUser(user: UserReqModel): Observable<any> {
    return this.http.post(`${this.API_URL}/users`, user);
  }
}
