import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import {TdDialogService, TdLoadingService} from '@covalent/core';

import * as fromPedidos from 'app/ventas/pedidos/store/reducers';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { Venta, Sucursal } from 'app/models';



@Component({
  selector: 'sx-facturacion-cre',
  templateUrl: './facturacion-cre.component.html',
  styleUrls: ['./facturacion-cre.component.scss']
})
export class FacturacionCreComponent implements OnInit {

  pedidos$: Observable<Venta[]>;
  pedidos: Venta[] = [];
  sucursal$: Observable<Sucursal>;


  constructor(
    private store: Store<fromPedidos.State>,
    private service: PedidosService,
    private router: Router,
    private loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(state => state.config.sucursal);
    this.load();
  }

  load() {
    this.service.pendientesDeFacturar('CRE')
      .subscribe(
        pedidos => this.pedidos = pedidos,
        error2 => console.error('Error al cargar pendienetes ', error2));
  }

  search(term: string) {}

  facturar(pedido: Venta) {

    if (pedido.facturar && pedido.tipo === 'CRE') {
      this._dialogService.openConfirm({
        message: `Facturar el pedido ${pedido.tipo} - ${pedido.documento} (${pedido.total})` ,
        viewContainerRef: this._viewContainerRef,
        title: 'Ventas de crédito',
        cancelButton: 'Cancelar',
        acceptButton: 'Aceptar',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.doFacturar(pedido);
        }
      });
    }
  }

  doFacturar(pedido: Venta) {
    this.loadingService.register('saving');
    this.service
      .facturar(pedido)
      .delay(2000)
      .subscribe( res => {
        console.log('Pedido listo para facturación', res);
        this.loadingService.resolve('saving');
        this.load();
      }, error => {
        console.error(error);
        this.loadingService.resolve('saving');
      });
  }

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
    this.loadingService.register('saving');
    this.service
      .update(pedido)
      .delay(1000)
      .subscribe( res => {
        this.loadingService.resolve('saving');
        this.load();
      }, error => {
        console.error(error);
        this.loadingService.resolve('saving');
      });
  }

}

