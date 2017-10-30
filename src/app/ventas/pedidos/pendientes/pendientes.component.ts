import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromPedidos from 'app/ventas/pedidos/store/reducers';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { Venta, Sucursal } from 'app/models';


@Component({
  selector: 'sx-pedidos-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss']
})
export class PendientesComponent implements OnInit {

  pedidos$: Observable<Venta[]>;

  sucursal: Sucursal = {
    id: '402880fc5e4ec411015e4ec64e70012e',
    nombre: 'TACUBA',
    clave: '12'
  }

  constructor(
    private store: Store<fromPedidos.State>,
    private service: PedidosService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.pedidos$ = this.service.pendientes(this.sucursal)
      .shareReplay();
  }

  search(term: string) {

  }

}
