import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { Transporte } from 'app/logistica/models/transporte';

@Injectable()
export class TransportesService {

  readonly apiUrl = environment.apiUrl + '/embarques/transportes';

  constructor(private http: HttpClient) { }

  get(id: string): Observable<Transporte> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Transporte>(url)
  }
  
  list(): Observable<Transporte[]> {
    return this.http.get<Transporte[]>(this.apiUrl)
  }

}
