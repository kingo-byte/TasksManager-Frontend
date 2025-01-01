import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetLookupByTableNamesRequest } from './models/requests';
import { GetLookupByTableNamesResponse } from './models/responses';
import { Environment }  from '../Environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getLookupByTableNames(request: GetLookupByTableNamesRequest): Observable<GetLookupByTableNamesResponse>
  {
      return this.http.post<GetLookupByTableNamesResponse>(`${Environment.apiUrl}/api/Common/GetLookupByTableNames`, request);
  }
}
