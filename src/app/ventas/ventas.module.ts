import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { VentasRoutingModule } from './ventas-routing.module';
import { MainPageComponent, MainDashboardComponent } from './_pages';
import { PedidosModule } from "./pedidos/pedidos.module";
import { ClientesModule } from "@siipapx/clientes/clientes.module";


@NgModule({
  imports: [
    SharedModule,
    ClientesModule,
    VentasRoutingModule,
    PedidosModule
  ],
  declarations: [
    MainPageComponent, 
    MainDashboardComponent,
  ]
})
export class VentasModule { }
