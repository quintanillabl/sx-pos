import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { VentasRoutingModule } from './ventas-routing.module';
import { MainPageComponent, MainDashboardComponent } from './_pages';
import { PedidosModule } from './pedidos/pedidos.module';
import { ClientesModule } from 'app/clientes/clientes.module';
import {ExistenciasService} from 'app/ventas/services/existencias.service';


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
  ],
  providers: [
    ExistenciasService
  ]
})
export class VentasModule { }
