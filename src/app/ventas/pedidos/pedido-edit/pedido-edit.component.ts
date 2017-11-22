import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {TdLoadingService, TdDialogService} from '@covalent/core';

import * as fromRoot from 'app/reducers';
import {Sucursal, Venta} from 'app/models';
import {PedidosService} from 'app/ventas/pedidos/services/pedidos.service';
import { AddNewClienteService } from 'app/clientes/services/add-new-cliente/add-new-cliente.service';



@Component({
  selector: 'sx-pedido-edit',
  template: `
    <sx-nav-layout header="Pedidos" modulo="Ventas">
      <div layout="column">
        <sx-pedido-form
          *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'"
          (save)="onUpdate($event)"
          (delete)="onDelete($event)"
          (cambiarCfdiMail)="onCambioDeCfdiMail($event)"
          [pedido]="pedido$ | async"
          [sucursal]="sucursal$ | async"
          (print)="print($event)">
        </sx-pedido-form>
      </div>
    </sx-nav-layout>
  `
})
export class PedidoEditComponent implements OnInit {

  sucursal$: Observable<Sucursal>;
  pedido$: Observable<Venta>;
  

  constructor(
    private addNewClienteService: AddNewClienteService,
    private store: Store<fromRoot.State>,
    private service: PedidosService,
    private loadingService: TdLoadingService,
    private route: ActivatedRoute,
    private router: Router,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
    this.pedido$ = this.route.paramMap.switchMap( params => this.service.get(params.get('id')));
  }

  reload() {
    this.pedido$ = this.route.paramMap.switchMap( params => this.service.get(params.get('id')));
  }

  onAddNewCliente() {
    this.addNewClienteService.newCliente();
  }

  onUpdate(pedido: Venta) {
    // console.log('Actualizando pedido: ', pedido)

    this.loadingService.register('saving');
    this.service
      .update(pedido)
      .subscribe(
        (res: any) => {
          console.log('Actualizacion exitosa: ', res);
          this.loadingService.resolve('saving');
          this.router.navigate(['/ventas/pedidos/pendientes'])
        },
        response => this.handlePostError(response)
      );

  }

  private handlePostError(response) {
    console.log('Error al salvar conteo: ', response);
    this.loadingService.resolve('saving');
  }

  onDelete(pedido: Venta) {
    this._dialogService.openConfirm({
      message: `Eliminar pedido  ${pedido.tipo} - ${pedido.documento} ?` ,
      viewContainerRef: this._viewContainerRef,
      title: 'Ventas',
      cancelButton: 'Cancelar',
      acceptButton: 'Eliminar',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.loadingService.register('saving');
        this.service
          .delete(pedido.id)
          .subscribe( res => {
            this.loadingService.resolve('saving');
            this.router.navigate(['/ventas/pedidos/pendientes']);
          }, error => {
            this.handlePostError(error);
          });
      }
    });
  }

  onCambioDeCfdiMail(cliente) {
    // console.log('Actualizando el CFDI del cliente', cliente);
    this._dialogService.openPrompt({
      message: 'Digite el nuevo email para envio del CFDI',
      viewContainerRef: this._viewContainerRef, 
      title: 'Cambio de CFDI', 
      value: cliente.cfdiMail,
      cancelButton: 'Cancelar', 
      acceptButton: 'Aceptar', 
    }).afterClosed().subscribe((newValue: string) => {
      if (newValue) {
        console.log('Actualizando cfdi Mail: ', newValue);
        this.loadingService.register('saving');
        this.service.actualizarCfdiEmail(cliente, newValue)
          .subscribe(
            cli => {
              console.log('correo actualizado: ', cliente);
              this.loadingService.resolve('saving');
            },
            error=> this.handlePostError(error)
          );
      } 
    });
  }

  print(id: string) {
    console.log('Imprimiendo pedido: ', id);
    this.loadingService.register('saving');
    this.service.imprimirPedido(id)
      .delay(1000)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        this.loadingService.resolve('saving');
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => this.handleError(error2));
  }

  handleError(error) {
    this.loadingService.resolve('saving');
    console.error('Error: ', error);
  }

}
