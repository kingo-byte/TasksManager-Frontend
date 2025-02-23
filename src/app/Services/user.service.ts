import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../Environment/environment';
import { User } from './models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserTasks(id: number): Observable<User> {
    return this.http.get<User>(`${Environment.apiUrl}/api/User/${id}/Tasks`);
  }
}
