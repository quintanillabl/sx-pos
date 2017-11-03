import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import {TdDialogService, TdLoadingService} from '@covalent/core';

import * as fromPedidos from 'app/ventas/pedidos/store/reducers';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { Venta, Sucursal } from 'app/models';



@Component({
  selector: 'sx-facturados',
  templateUrl: './facturados.component.html',
  styleUrls: ['./facturados.component.scss']
})
export class FacturadosComponent implements OnInit {

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
    this.loadingService.register('saving');
    this.service.facturados('CRE')
      .delay(200)
      .subscribe(
        pedidos => {
          this.loadingService.resolve('saving');
          this.pedidos = pedidos
        },
        error2 => {
          this.loadingService.resolve('saving');
          console.error('Error al cargar pendienetes ', error2)
        });
  }

  search(term: string) {}

}

