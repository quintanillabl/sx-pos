import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from "app/shared/shared.module";
import { PedidosService } from "./services/pedidos.service";
import { 
  PedidosPageComponent,
  PedidosPendientesComponent,
  PedidoCreateComponent,
  PedidoFormComponent, 
  PedidoFormHeaderComponent 
} from '.';




@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    PedidosPageComponent, 
    PedidosPendientesComponent,
    PedidoCreateComponent,
    PedidoFormComponent,
    PedidoFormHeaderComponent
  ],
  providers: [ PedidosService],
  exports: [RouterModule]
})
export class PedidosModule { }
