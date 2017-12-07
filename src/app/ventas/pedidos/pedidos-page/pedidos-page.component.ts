import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { MdDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import * as FileSaver from 'file-saver';

import * as fromRoot from 'app/reducers';
import { Sucursal } from 'app/models';

@Component({
  selector: 'sx-pedidos-page',
  templateUrl: './pedidos-page.component.html'
})
export class PedidosPageComponent implements OnInit {

  sucursal$: Observable<Sucursal>;

  navigation: Object[] = [
    {route: 'pendientes', title: 'Pendientes', icon: 'alarm'},
    {route: 'facturacionCredito', title: 'Facturación CRE', icon: 'event_note'},
    {route: 'facturados', title: 'Facturas ', descripcion: 'Facturas generadas', icon: 'view_list'},
    {route: 'canceladas', title: 'Canceladas', descripcion: 'Cancelación de facturas', icon: 'cancel'},
    {route: 'solicitudes', title: 'Solicitud de deposito', descripcion: 'Solicitud de autorizacion de deposito', icon: 'verified_user'},
    /*{route: 'devoluciones', title: 'Devoluciones', descripcion: 'Devolución de facturas', icon: ''},
    {route: 'traslados', title: 'Traslados', descripcion: 'Devolución de facturas', icon: ''},*/
  ];

  reportes = [];

  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    public dialog: MdDialog,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
  }


}
