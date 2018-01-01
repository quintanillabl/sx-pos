import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent, TdDialogService } from '@covalent/core';

import { CajaService } from 'app/caja/services/caja.service';
import { Venta } from 'app/models';

@Component({
  selector: 'sx-pendientes-page',
  templateUrl: './pendientes-page.component.html',
})
export class PendientesPageComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    { name: 'documento',  label: 'Folio', numeric: true, width: 20},
    { name: 'fecha',  label: 'Fecha', width: 50},
    { name: 'nombre',  label: 'Cliente', width: 400},
    { name: 'formaDePago',  label: 'F.Pago', width: 30},
    { name: 'total',  label: 'Total', width: 20},
    { name: 'updateUser', label: 'Vendedor', width: 20},
    { name: 'facturar', label: 'Solicitado', width: 100},
    { name: 'regresar',  label: 'Regresar', width: 20},
  ];

  data: any[] = [];

  constructor(
    private _dataTableService: TdDataTableService,
    private service: CajaService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.pendientesDeFacturar('CON')
    .subscribe( pendientes => {
      this.data = pendientes;
      }, error => console.log('Error: ', error)
    );
  }

  search(searchTerm: string): void {}


  regresarAVentas(pedido: Venta) {
    pedido.facturar = null
    this._dialogService.openConfirm({
      message: `Regresar a pendientes el pedido ${pedido.tipo} - ${pedido.documento} (${pedido.total})` ,
      viewContainerRef: this._viewContainerRef,
      title: 'Ventas de crédito',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.doRegresar(pedido);
      }
    });
  }

  doRegresar(pedido) {
    this.service
      .regresarAPedidos(pedido)
      .subscribe( res => {
        this.load();
      }, error => {
        console.error(error);
      });
  }

  getFormaDePago(row: Venta) {
    switch (row.formaDePago) {
      case 'TARJETA_DEBITO':
        return 'TAR_DEV'
      case 'TARJETA_CREDITO':
        return 'TAR_CRE'
      case 'TRANSFERENCIA':
        return 'TRANS'
      default:
        return row.formaDePago;

    }
  }

}
