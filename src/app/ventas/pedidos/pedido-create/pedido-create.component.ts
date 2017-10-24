import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {TdLoadingService} from '@covalent/core';

import * as fromRoot from 'app/reducers';
import {Sucursal, Venta} from 'app/models';
import {PedidosService} from 'app/ventas/pedidos/services/pedidos.service';
import { AddNewClienteService } from 'app/clientes/services/add-new-cliente/add-new-cliente.service';


@Component({
  selector: 'sx-pedido-create',
  template: `
    <sx-pedido-form
      *tdLoading="'saving'; mode:'indeterminate'; type:'circle'; strategy:'overlay'; color:'accent'"
      (addNewCliente)="onAddNewCliente()" (save)="onSave($event)"
      [sucursal]="sucursal$ | async">
    </sx-pedido-form>
  `
})
export class PedidoCreateComponent implements OnInit {

  sucursal$: Observable<Sucursal>;

  constructor(
    private addNewClienteService: AddNewClienteService,
    private store: Store<fromRoot.State>,
    private service: PedidosService,
    private loadingService: TdLoadingService,
  ) { }

  ngOnInit() {
    this.sucursal$ = this.store.select(fromRoot.getSucursal);
    this.sucursal$.map( s => {
      return {
        sucursal: s,
        fecha: new Date()
      }
    })
  }

  onAddNewCliente() {
    this.addNewClienteService.newCliente();
  }

  onSave(pedido: Venta) {
    console.log('Salvando  pedido: ', pedido);
    this.loadingService.register('saving');
    this.service
      .save(pedido)
      .subscribe(
        (res: any) => {
          console.log('Actualizacion exitosa: ', res);
          this.loadingService.resolve('saving');
          // this.router.navigate(['/logistica/almacen/conteo'])
          // this.router.navigate(['/logistica/almacen/conteo/show', res.id], { queryParams: { tipo: 'show' } })
        },
        response => this.handlePostError(response)
      );
  }

  private handlePostError(response) {
    console.log('Error al salvar conteo: ', response);
    this.loadingService.resolve('saving');
  }

}
