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



@Component({
  selector: 'sx-pedidos-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss']
})
export class PendientesComponent implements OnInit {

  pedidos$: Observable<Venta[]>;
  pedidos: Venta[] = [];

  sucursal: Sucursal = {
    id: '402880fc5e4ec411015e4ec64e70012e',
    nombre: 'TACUBA',
    clave: '12'
  }

  constructor(
    private store: Store<fromPedidos.State>,
    private service: PedidosService,
    private router: Router,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.pendientes(this.sucursal)
      .subscribe(pedidos => this.pedidos = pedidos, error2 => console.error('Error al cargar pendienetes ', error2));
  }

  search(term: string) {

  }

  onEdit(pedido: Venta) {
    console.log('Editando pedido: ', pedido);
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
            }, error => {

            });
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

}
