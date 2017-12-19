import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { Conteo } from 'app/logistica/models/conteo';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';


@Injectable()
export class ConteosService {

  private apiUrl: string;

  sucursal: Sucursal;
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService) 
  {
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('inventario/conteos');
  }
  
  get(id: string): Observable<Conteo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Conteo>(url)
  }

  peidnetes(documento?: string ) {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params =  params.set('documento', documento);
    }
    return this.http.get<Conteo[]>(this.apiUrl, {params: params})
  }

  list(documento?: string ): Observable<Conteo[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params =  params.set('documento', documento);
    }
    return this.http.get<Conteo[]>(this.apiUrl, {params: params})
  }

  save(sol: Conteo) {
    return this.http.post(this.apiUrl, sol);
  }

  update(sol: Conteo) {
    const url = `${this.apiUrl}/${sol.id}`;
    return this.http.put(url, sol);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  generarConteo() {
    const params = new HttpParams().set('sucursal', this.sucursal.id);
    const url = `${this.apiUrl}/generarConteo`;
    return this.http.post(url, {params: params})
  }

  generarExistencias() {
    const params = new HttpParams().set('id', this.sucursal.id);
    const url = `${this.apiUrl}/generarExistencias`;
    return this.http.get(url, {params: params})
  }

  limpiarExistencias() {
    const params = new HttpParams().set('id', this.sucursal.id);
    const url = `${this.apiUrl}/limpiarExistencias`;
    return this.http.get(url, {params: params});
  }

}
