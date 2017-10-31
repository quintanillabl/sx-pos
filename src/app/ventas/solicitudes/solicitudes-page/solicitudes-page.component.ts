import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromPedidos from 'app/ventas/pedidos/store/reducers';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { Venta, Sucursal } from 'app/models';

import { SolicitudDeDeposito } from 'app/ventas/models/solicitudDeDeposito';
import * as fromSolicitudes from '../store/reducers';
import { LoadPendientesAction } from '../store/actions/solicitudes.actions';

@Component({
  selector: 'sx-solicitudes-page',
  templateUrl: './solicitudes-page.component.html',
  styles: []
})
export class SolicitudesPageComponent implements OnInit {

  pendientes$: Observable<SolicitudDeDeposito[]>;

  constructor(
    private store: Store<fromSolicitudes.State>
  ) { }

  ngOnInit() {
    this.pendientes$ = this.store.select(fromSolicitudes.getPendientes);
    this.load();
  }

  load() {
    this.store.dispatch(new LoadPendientesAction());
  }

  search(term: string) {

  }

}
