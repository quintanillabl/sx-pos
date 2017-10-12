import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { Chofer } from 'app/logistica/models/chofer';

@Injectable()
export class ChoferesService {

  readonly apiUrl = environment.apiUrl + '/embarques/choferes';

  constructor(private http: HttpClient) { }

  get(id: string): Observable<Chofer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Chofer>(url)
  }
  
  list(): Observable<Chofer[]> {
    return this.http.get<Chofer[]>(this.apiUrl)
  }

  search(term: string): Observable<Chofer[]> {
    let params = new HttpParams()
      .set('term', term);
    return this.http.get<Chofer[]>(this.apiUrl, {params: params});
  }

}
