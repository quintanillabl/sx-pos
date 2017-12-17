import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import {TdDialogService, TdLoadingService} from '@covalent/core';

import * as fromPedidos from 'app/ventas/pedidos/store/reducers';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { Venta, Sucursal } from 'app/models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Component({
  selector: 'sx-facturados',
  templateUrl: './facturados.component.html',
  styleUrls: ['./facturados.component.scss']
})
export class FacturadosComponent implements OnInit {

  facturas$: Observable<Venta[]>;
  pedidos: Venta[] = [];
  procesando = false;
  search$ = new BehaviorSubject<string>('');

  constructor(
    private store: Store<fromPedidos.State>,
    private service: PedidosService,
    private router: Router,
    private loadingService: TdLoadingService,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
  ) { 
    this.facturas$ = this.search$
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => {
        this.loadingService.register('saving');
        return this.service
        .facturados(term)
        //.delay(200)
        .catch( err => Observable.of(err))
        .finally( ()=> this.loadingService.resolve('saving'));
      })
      
  }

  ngOnInit() {
    // this.facturas$.sub
  }

  load() {
    // this.loadingService.register('saving');
    // this.service.facturados()
    //   .delay(200)
    //   .subscribe(
    //     pedidos => {
    //       this.loadingService.resolve('saving');
    //       this.pedidos = pedidos
    //     },
    //     error2 => {
    //       this.loadingService.resolve('saving');
    //       console.error('Error al cargar pendienetes ', error2)
    //     });
    this.search('');
  }

  search(term: string) {
    this.search$.next(term);
  }

  print(factura: Venta) {
    if ( factura.cuentaPorCobrar.cfdi !== null ) {
      this.printCfdi(factura.cuentaPorCobrar.cfdi);
    }
    else {
      this.printRemision(factura);
    }
  }

  printCfdi(cfdi) {
    this.service.imprimirCfdi(cfdi)
      .delay(1000)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => this.handleError(error2));
  }

  printRemision(factura) {
    this.procesando = true;
    this.service.imprimirPedido(factura.id)
      .subscribe(res => {
        this.procesando = false;
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => this.handleError(error2));
  }

  handleError(error) {
    this.procesando = false;
    console.error('Error: ', error);
  }

}

