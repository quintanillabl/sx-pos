import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';
import * as _ from 'lodash';

import * as fromPedidos from 'app/ventas/pedidos/store/reducers';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { EnvioDireccionComponent } from '../pedido-form/envio-direccion/envio-direccion.component';
import { Venta, Sucursal } from 'app/models';
import { AutorizacionDeVentaComponent } from '../autorizacion-de-venta/autorizacion-de-venta.component';
import { CambioDeClienteComponent } from 'app/ventas/pedidos/cambio-de-cliente/cambio-de-cliente.component';

@Component({
  selector: 'sx-pedidos-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss']
})
export class PendientesComponent implements OnInit {

  pedidos$: Observable<Venta[]>;

  procesando = false;

  search$ = new BehaviorSubject<string>('');

  reload$ = new Subject<boolean>();

  loading = false;

  constructor(
    private store: Store<fromPedidos.State>,
    private service: PedidosService,
    private router: Router,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    public dialog: MdDialog
  ) {
    
    const obs1 = this.search$.asObservable()
    .distinctUntilChanged()
    .debounceTime(300);

    const obs2 = this.reload$.asObservable().startWith(true);

    this.pedidos$ = Observable.combineLatest(obs1, obs2, (term, reload) => {
      return term ? term : null;
    }).switchMap( term => this.service
      .pendientes(term)
      //.do( () => this.procesando = true)
      .delay(300)
      .finally( () => this.procesando = false));
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.procesando = true;
    this.reload$.next(true);
  }

  search(term: string) {
    this.search$.next(term);
  }

  onEdit(pedido: Venta) {
    // console.log('Editando pedido: ', pedido);
    if (pedido.moneda === 'USD') {
      this.router.navigate(['/ventas/pedidos/dolares/edit', pedido.id]);
    } else if ( pedido.tipo === 'ANT') {
      this.router.navigate(['/ventas/pedidos/anticipo/edit', pedido.id]);
    } else {
      this.router.navigate(['/ventas/pedidos/edit', pedido.id]);
    }
  }

  mandarFacturar(pedido: Venta) {
    if (pedido.facturar) {
      return
    }
    if (pedido.sinExistencia) {
      this.mandarFacturarConAntorizacion(pedido);
    } else {
      this.mandarFacturarNormal(pedido);
    }
  }

  mandarFacturarNormal(pedido: Venta) {
    this._dialogService.openConfirm({
      message: `Mandar a facturar el pedido ${pedido.tipo} - ${pedido.documento} (${pedido.total})` ,
      viewContainerRef: this._viewContainerRef,
      title: 'Ventas',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.service
          .mandarFacturar(pedido)
          .subscribe( res => {
            console.log('Pedido listo para facturación', res);
            this.load();
            // this.router.navigate(['/ventas/pedidos/facturacionCredito']);
          }, error => this.handleError(error));
      }
    });
  }

  mandarFacturarConAntorizacion( pedido: Venta) {
    const params = {
      tipo: 'SIN_EXISTENCIA',
      title: 'Este pedido tiene partidas sin existencia requiere autorización',
      solicito: pedido.updateUser
    };
    const dialogRef = this.dialog.open(AutorizacionDeVentaComponent, {
      data: params
    });
    dialogRef.afterClosed().subscribe(auth => {
      if (auth) {
        auth.venta = pedido;
        console.log('Facturacion: ', auth);
        this.service
          .mandarFacturarConAutorizacion(auth)
          .subscribe( res => {
            console.log('Pedido listo para facturación', res);
            this.load();
            // this.router.navigate(['/ventas/pedidos/facturacionCredito']);
          }, error => this.handleError(error));
      }
    });
  }

  asignarEnvio(pedido: Venta) {
    const params = {direccion: null};
    if (pedido.envio) {
      params.direccion = pedido.envio.direccion;
    }
    const dialogRef = this.dialog.open(EnvioDireccionComponent, {
      data: params
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       console.log('Asignando direccion de envío: ', result);
       this.doAsignarEnvio(pedido, result);
      }
    });
  }

  doAsignarEnvio(pedido: Venta, direccion) {
    this.service.asignarEnvio(pedido, direccion)
      .subscribe((res: Venta) => {
        // console.log('Direccion asignada exitosamente ', res);
        this.load();
        pedido = res;
      }, error =>  this.handleError(error));
  }

  print(id: string) {
    // console.log('Imprimiendo pedido: ', id);
    this.procesando = true;
    this.service.imprimirPedido(id)
      .delay(500)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        this.procesando = false;
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => this.handleError(error2));
  }

  handleError(error) {
    this.procesando = false;
    console.error('Error: ', error);
  }

  OnGenerarVale(pedido: Venta) {
    if (pedido.clasificacionVale === 'EXISTENCIA_VENTA') {
      this._dialogService.openConfirm({
        message: `Generar vale ${pedido.tipo} - ${pedido.documento} (${pedido.total})` ,
        viewContainerRef: this._viewContainerRef,
        title: 'Vale de traslado ',
        cancelButton: 'Cancelar',
        acceptButton: 'Aceptar',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.service
            .generarValeAutomatico(pedido)
            .subscribe( res => {
              // console.log('Vale para pedido generado exitosamente', res);
              this.load();
            }, error => this.handleError(error));
        }
      });
    }
  }

  onCambioDeCliente(venta: Venta) {
    const dialogRef = this.dialog.open(CambioDeClienteComponent, {
      data: {
        documento: venta.documento,
        tipo: venta.tipo
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log(' Aplicando cambio: ', result);
        this.procesando = true
        this.service.cambioDeCliente(venta,result.usuario, result.cliente)
        .finally( () => this.procesando = false)
        .subscribe( res => {
          this.load();
        }, error => this.handleError(error));
      }
    });
  }


}
