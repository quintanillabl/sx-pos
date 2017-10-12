import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { Facturista } from 'app/logistica/models/facturista';

@Injectable()
export class FacturistasService {

  readonly apiUrl = environment.apiUrl + '/embarques/facturistas';

  constructor(private http: HttpClient) { }

  get(id: string): Observable<Facturista> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Facturista>(url)
  }
  
  list(documento?: string ): Observable<Facturista[]> {
    return this.http.get<Facturista[]>(this.apiUrl)
  }

}
