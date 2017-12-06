import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import {TdDialogService} from '@covalent/core';

import * as fromPedidos from 'app/ventas/pedidos/store/reducers';
import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';
import { Venta, Sucursal } from 'app/models';
import { MdDialog } from '@angular/material';
import { EnvioDireccionComponent } from '../pedido-form/envio-direccion/envio-direccion.component';

import * as FileSaver from 'file-saver'; 
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

@Component({
  selector: 'sx-pedidos-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss']
})
export class PendientesComponent implements OnInit {

  pedidos$: Observable<Venta[]>;

  pedidos: Venta[] = [];

  search$ = new BehaviorSubject<string>('');

  loading = false;

  constructor(
    private store: Store<fromPedidos.State>,
    private service: PedidosService,
    private router: Router,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
    

    // this.pedidos$.subscribe( pedidos => this.pedidos = pedidos);
    /*
    this.pedidos$ = this.service
    .pendientes()
    .delay(3000)
    .do( () => this.loading = true);

    this.search$
    .debounceTime(100)
    .distinctUntilChanged()
    .combineLatest(this.pedidos$, (term: string, pedidos: Venta[]) => {
      if (!term) {
        console.log('Sin term: ', term);
        console.log('Current pedidos: ', pedidos);
        return pedidos
      } else {
        console.log('Con term: ', term);
        const found = pedidos.filter( item => _.startsWith(item.documento.toString(), term));
        console.log('Found: ', found);
        return found
      }
        
    })
    .subscribe( 
      pedidos => {
        console.log('Recibiendo: ', pedidos);
        this.pedidos = pedidos;
        this.loading = false;
      }, 
      error => this.handleError(error), 
      () => {
        this.loading = false;
        console.log('Complete .....');
      });
      */
      this.load();
  }

  load() {
    // this.pedidos$ = this.service.pendientes();
    this.pedidos$ = this.search$
    .switchMap( term => this.service.pendientes(term));
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

    if (!pedido.facturar) {
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
            }, error => this.handleError(error));
        }
      });
    }
  }

  onDelete(pedido: Venta) {
    this.service
      .delete(pedido.id)
      .subscribe(
        value => this.load(),
        error => console.error('Error al eliminar pedido ', error)
      );
  }

  asignarEnvio(pedido: Venta) {
    console.log('Asignando envio al pedido.....');
    const dialogRef = this.dialog.open(EnvioDireccionComponent, );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       // console.log('Asignando direccion de envío: ', result);
       this.doAsignarEnvio(pedido, result);
      }
    });
  }

  doAsignarEnvio(pedido: Venta, direccion){
    pedido.envio = {direccion: direccion};
    this.service.update(pedido).subscribe(res => this.load(), error=> console.error(error));
  }

  print(id: string) {
    console.log('Imprimiendo pedido: ', id);
    // this.loadingService.register('saving');
    this.service.imprimirPedido(id)
      .delay(1000)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        // this.loadingService.resolve('saving');
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
        /*
        let filename = `Pedido_${id}.pdf`;
        FileSaver.saveAs(blob, filename);
        */
      }, error2 => this.handleError(error2));
  }

  handleError(error) {
    // this.loadingService.resolve('saving');
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
              console.log('Vale para pedido generado exitosamente', res);
              // this.load();
            }, error => this.handleError(error));
        }
      });
    }
  }


}
