import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { MdDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import * as FileSaver from 'file-saver';

// import { EmbarqueService } from 'app/logistica/services/embarque/embarque.service';
// import { EntregaPorChoferComponent } from './reportes/entrega-por-chofer/entrega-por-chofer.component';


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
    {route: 'solicitudes', title: 'Solicitud de deposito', descripcion: 'Solicitud de autorizacion de deposito', icon: 'verified_user'},
    {route: 'facturas', title: 'Facturas', descripcion: 'Facturación dólares', icon: ''},
    {route: 'facturasCanceladas', title: 'Canceladas', descripcion: 'Facturación dólares', icon: ''},
    {route: 'devoluciones', title: 'Devoluciones', descripcion: 'Devolución de facturas', icon: ''},
    {route: 'traslados', title: 'Traslados', descripcion: 'Devolución de facturas', icon: ''},
  ];

  reportes = [
    {
      name: 'entregasPorChofer',
      title: 'Reporte 1',
      description: 'Pendiente de definir',
      icon: 'blur_linear',
      action: 'reporteDeEntregasPorChofer()'
    },
  ];

  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    public dialog: MdDialog,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
  }

  runReport(report) {
    if (report === 'entregasPorChofer') {
      this.reporteDeEntregasPorChofer();
    }
  }

  reporteDeEntregasPorChofer() {
    /*
    const dialogRef = this.dialog.open(EntregaPorChoferComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.reporteDeEntregasPorChofer(result)
          .subscribe(res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const filename = `EntregasPorChofer.pdf`;
            FileSaver.saveAs(blob, filename);
          });
      }
    });
    */
  }




}
