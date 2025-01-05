import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { Environment } from '../Environment/environment.dev';
import { RefreshTokenRequest, SignInRequest, SignUpRequest } from './models/requests';
import { RefreshTokenResponse, SignInResponse } from './models/responses';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedInSignal = signal<boolean>(this.isLoggedIn());
  decodedToken = signal<{ [key: string]: string } | null>(this.getClaims());

  constructor(private http: HttpClient, private router: Router) { }

  signIn(request: SignInRequest): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${Environment.apiUrl}/api/auth/signIn`, request);
  }

  signUp(request: SignUpRequest): Observable<any> {
    return this.http.post<Observable<any>>(`${Environment.apiUrl}/api/auth/signUp`, request );
  }

  refreshToken(request: RefreshTokenRequest): Observable<RefreshTokenResponse> {
    return this.http.post<RefreshTokenResponse>(`${Environment.apiUrl}/api/auth/refreshToken`, request);
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem('access-token');
    return token ? true : false;
  }

  setToken(token: string, refreshToken: string):void {
    localStorage.setItem('access-token', token!);
    localStorage.setItem('refresh-token', refreshToken!);
  }

  getToken(): string | null {
    return localStorage.getItem('access-token');
  }

  getRefreshToken():string{
    return localStorage.getItem('refresh-token')!;
  }

  getClaims (): { [key: string]: string } | null  {
    const token: string | null = this.getToken(); 

    if(!token){
      return null;
    }

    return jwt_decode.jwtDecode(token);
  }

  logout(): void {  
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    this.isLoggedInSignal.set(false);

    this.router.navigate(['']);
  }
}