import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Socket } from 'ng-socket-io';
import { TdDialogService } from '@covalent/core';

import { environment } from "../../../../environments/environment";
import { Cliente } from "../../../models";



@Component({
  selector: 'sx-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  readonly url = environment.apiUrl + '/clientes';

  tarjeta ;
  tarjetaError: string = undefined;

  cliente = undefined;
  searchStream = new BehaviorSubject<string>('');

  clientes$: Observable<Cliente[]>;

  constructor(
    private socket: Socket,
    private http: HttpClient,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef
  ) { }


  ngOnInit() {
    
    this.socket.fromEvent('rfid')
    .subscribe(value => {
      console.log('RFID: ', value);
      this.tarjeta = value;
      this.buscarClienteLealtad(this.tarjeta);
    });
    
    this.clientes$ = this.searchStream
    .debounceTime(500)
    .distinctUntilChanged()
    .filter( value=> value.length>0)
    .switchMap( term => {
      return this.http.get<Cliente[]>(this.url, {params: this.getParams(term)})
    });
    
  }

  private getParams(term){
    const params = new HttpParams()
    .set('max', '10')
    .set('sort', 'lastUpdated')
    .set('order', 'desc')
    .set('term', term);
    return params
  }

  onSearch(term: string) {
    this.searchStream.next(term);
  }

  onTarjeta(numero: string) {
    
  }

  buscarClienteLealtad(tarjeta: string) {
    console.log('Buscando cliente con tajreta: ', tarjeta);
    if( tarjeta === '40321c7c') {
      this.cliente = {
        clave: 'S050255',
        nombre: 'SURGRAM S.A. de C.V.',
        facturas: 39,
        ventas: 31342868.00,
        ticketPromedio: 803663,
        meses: 8,
        ventaMensualPromedio: 3917859,
        puntos: 3134287,
        monto: 313429
      }
      this.tarjetaError = null;  
    } else {
      this.cliente = null;
      this.tarjetaError = 'Esta tarjeta ne está asignada';
    }
  }

}
