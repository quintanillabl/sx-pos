import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { Venta, Sucursal, Producto, Cliente } from 'app/models';
import {ConfigService} from 'app/core/services/config.service';
import {Store} from '@ngrx/store';
import * as fromRoot from 'app/reducers';



@Injectable()
export class PedidosService {

  readonly apiUrl = environment.apiUrl + '/ventas';

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>
  ) {
    // this.configService.get().subscribe(config => this.sucursal = config.sucursal);
    this.store.select(fromRoot.getSucursal).subscribe( s => this.sucursal = s);
  }

  get(id: string): Observable<Venta> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Venta>(url)
  }

  pendientes(): Observable<Venta[]> {
    const url = `${this.apiUrl}/pendientes/${this.sucursal.id}`;
    return this.http.get<Venta[]>(url)
  }

  list(): Observable<Venta[]> {
    const params = new HttpParams()
      .set('sucursal', this.sucursal.id);
    return this.http.get<Venta[]>(this.apiUrl, {params: params})
  }

  save(venta: Venta) {
    return this.http.post(this.apiUrl, venta);
  }

  update(venta: Venta) {
    const url = `${this.apiUrl}/${venta.id}`;
    return this.http.put(url, venta);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  findManiobraFlete(): Observable<Producto> {
    const params = new HttpParams().set('clave', 'MANIOBRAF');
    const url = `${this.apiUrl}/findManiobra`;
    return this.http.get<Producto>(url, {params: params});
  }

  findManiobra(): Observable<Producto> {
    const params = new HttpParams().set('clave', 'MANIOBRA');
    const url = `${this.apiUrl}/findManiobra`;
    return this.http.get<Producto>(url, {params: params});
  }

  findCorte(): Observable<Producto> {
    const params = new HttpParams().set('clave', 'CORTE');
    const url = `${this.apiUrl}/findManiobra`;
    return this.http.get<Producto>(url, {params: params});
  }

  mandarFacturar(venta: Venta) {
    const url = `${this.apiUrl}/mandarFacturar/${venta.id}`;
    return this.http.put(url, {});
  }

  generarValeAutomatico(venta: Venta) {
    const url = `${this.apiUrl}/generarValeAutomatico/${venta.id}`;
    return this.http.put(url, {});
  }

  pendientesDeFacturar(tipo: string) {
    const params = new HttpParams()
      .set('facturables', tipo)
      .set('sucursal', this.sucursal.id);
    return this.http.get<Venta[]>(this.apiUrl, {params: params})
  }

  facturados(tipo: string) {
    const params = new HttpParams()
      .set('facturados', tipo)
      .set('sucursal', this.sucursal.id);
    return this.http.get<Venta[]>(this.apiUrl, {params: params})
  }

  facturar(venta: Venta) {
    const url = `${this.apiUrl}/facturar/${venta.id}`;
    return this.http.put(url, venta);
  }

  print(id: string) {
    const url = `${this.apiUrl}/print`;
    const params = new HttpParams()
      .set('ID', id);
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    return this.http.get(
      url, {
        headers: headers,
        params: params,
        responseType: 'blob'
      }
    );
  }

  cancelar(factura: Venta): Observable<Venta> {
    console.log('Cancelando en el sistema la factura: ', factura);
    const url = `${this.apiUrl}/cancelar/${factura.id}`;
    return this.http.put<Venta>(url, factura);
  }

  timbrar(venta: Venta): Observable<Venta> {
    const url = `${this.apiUrl}/timbrar/${venta.id}`;
    return this.http.put<Venta>(url, venta);
  }

  mostrarXml(venta: Venta): Observable<any> {
    const url = `${environment.apiUrl}/cfdis/mostrarXml/${venta.cuentaPorCobrar.cfdi.id}`;
    const headers = new HttpHeaders().set('Content-type' , 'text/xml');
    // return this.http.get(url)
    return this.http.get(
      url, {
        headers: headers,
        responseType: 'blob'
      }
    );
  }

  imprimirCfdi(cfdi: any) {
    const url = `${environment.apiUrl}/cfdis/print/${cfdi.id}`;
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    return this.http.get(
      url, {
        headers: headers,
        responseType: 'blob'
      }
    );
  }

  imprimirPedido(pedidoId: string) {
    const url = `${this.apiUrl}/print/${pedidoId}`;
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    return this.http.get(
      url, {
        headers: headers,
        responseType: 'blob'
      }
    );
  }

  actualizarCfdiEmail(cliente: Cliente, email: string) {
    const url = `${environment.apiUrl}/clientes/actualizarCfdiMail/${cliente.id}`;
    const params = new HttpParams()
    .set('email', email);
    return this.http.put(url, {}, {params: params});
  }

}

