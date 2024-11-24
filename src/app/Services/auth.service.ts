import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { Environment } from '../Environment/environment.dev';
import { SignInRequest, SignUpRequest } from './models/requests';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedInSignal = signal<boolean>(this.isLoggedIn());
  decodedToken!: { [key: string]: string };

  constructor(private http: HttpClient) { }

  signIn(request: SignInRequest): Observable<string> {
    return this.http.post<string>(`${Environment.apiUrl}/auth/signIn`, request, { responseType: 'text' as 'json' });
  }

  signUp(request: SignUpRequest): Observable<any> {
    return this.http.post<Observable<any>>(`${Environment.apiUrl}/auth/signUp`, {request: request});
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem('access-token');
    return token ? true : false;
  }

  setToken(token: string):void {
    localStorage.setItem('access-token', token!)
  }

  getToken(): string | null {
    return localStorage.getItem('access-token');
  }

  getClaims (token: string): any {
      this.decodedToken = jwt_decode.jwtDecode(token);
  }

  logout(): void {  
    localStorage.removeItem('access-token');
  }
}