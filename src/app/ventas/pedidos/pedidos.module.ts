import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StoreModule} from '@ngrx/store';

import { SharedModule } from 'app/shared/shared.module';
import { PedidosService } from './services/pedidos.service';
import { PedidosPageComponent, PedidoCreateComponent} from '.';
import { PedidoFormModule } from './pedido-form/pedido-form.module';
import { ClientesModule } from 'app/clientes/clientes.module';
import { ProductosModule } from 'app/productos/productos.module';
import { reducers } from './store/reducers';



@NgModule({
  imports: [
    SharedModule,
    ClientesModule,
    ProductosModule,
    PedidoFormModule,
    RouterModule.forChild([]),
    StoreModule.forFeature('pedidos', reducers)

  ],
  declarations: [
    PedidosPageComponent,
    PedidoCreateComponent,
  ],
  providers: [ PedidosService],
  exports: [RouterModule]
})
export class PedidosModule { }
