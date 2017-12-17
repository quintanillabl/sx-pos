import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import {Sector} from 'app/logistica/models/sector';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class SectoresService {

  readonly apiUrl = environment.apiUrl + '/inventario/sectores';

  sucursal: Sucursal;
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService) 
  {
    this.sucursal = configService.getCurrentSucursal();
  }

  get(id: string): Observable<Sector> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Sector>(url)
  }

  peidnetes(documento?: string ) {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params =  params.set('documento', documento);
    }
    return this.http.get<Sector[]>(this.apiUrl, {params: params})
  }

  list(documento?: string ): Observable<Sector[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params =  params.set('documento', documento);
    }
    return this.http.get<Sector[]>(this.apiUrl, {params: params})
  }

  save(sol: Sector) {
    return this.http.post(this.apiUrl, sol);
  }

  update(sol: Sector) {
    const url = `${this.apiUrl}/${sol.id}`;
    return this.http.put(url, sol);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

}
