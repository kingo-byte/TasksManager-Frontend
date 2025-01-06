import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditTaskRequest } from './models/requests';
import { Environment } from '../Environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  editTask(request: EditTaskRequest): Observable<number>{
    return this.http.post<number>(`${Environment.apiUrl}/api/Task/EditTask`, request);
  }
}
