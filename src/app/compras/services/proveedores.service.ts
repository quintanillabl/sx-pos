import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { Proveedor } from 'app/models';
import { environment} from 'environments/environment';

@Injectable()
export class ProveedoresService {

  readonly apiUrl = environment.apiUrl + '/proveedores';

  constructor(private http: HttpClient) { }
  

  list(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }

  getProductos(proveedor: Proveedor): Observable<Array<any>> {
    const url = `${this.apiUrl}/${proveedor.id}/productos`;
    return this.http.get<Array<any>>(url);
  }

  get(id: string): Observable<Proveedor> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Proveedor>(url);
  }

}
