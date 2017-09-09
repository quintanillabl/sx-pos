import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VentasRoutingModule } from './ventas-routing.module';
import { 
  MainPageComponent,
  MainDashboardComponent,
  PedidosComponent,
  PedidosPendientesComponent,
  PedidoCreateComponent,
} from './_pages';



@NgModule({
  imports: [
    SharedModule,
    VentasRoutingModule
  ],
  declarations: [
    MainPageComponent, 
    MainDashboardComponent, PedidosComponent, PedidosPendientesComponent, PedidoCreateComponent]
})
export class VentasModule { }
