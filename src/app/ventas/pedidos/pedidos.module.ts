import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from "app/shared/shared.module";
import { PedidosService } from "./services/pedidos.service";
import { 
  PedidosPageComponent,
  PedidosPendientesComponent,
  PedidoCreateComponent,
  } from '.';
import { PedidoFormModule } from './pedido-form/pedido-form.module';
import { ClientesModule } from "app/clientes/clientes.module";
import { ProductosModule } from "app/productos/productos.module";

@NgModule({
  imports: [
    SharedModule,
    ClientesModule,
    ProductosModule,
    PedidoFormModule,
    RouterModule.forChild([])
  ],
  declarations: [
    PedidosPageComponent, 
    PedidosPendientesComponent,
    PedidoCreateComponent,
  ],
  providers: [ PedidosService],
  exports: [RouterModule]
})
export class PedidosModule { }
