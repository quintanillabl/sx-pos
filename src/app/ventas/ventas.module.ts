import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { VentasRoutingModule } from './ventas-routing.module';
import { MainPageComponent, MainDashboardComponent } from './_pages';
import { PedidosModule } from "./pedidos/pedidos.module";


@NgModule({
  imports: [
    SharedModule,
    VentasRoutingModule,
    PedidosModule
  ],
  declarations: [
    MainPageComponent, 
    MainDashboardComponent,
  ]
})
export class VentasModule { }
