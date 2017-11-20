import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { VentasRoutingModule } from './ventas-routing.module';
import { MainPageComponent, MainDashboardComponent } from './_pages';
import { PedidosModule } from './pedidos/pedidos.module';
import { ClientesModule } from 'app/clientes/clientes.module';
import { ExistenciasService } from 'app/ventas/services/existencias.service';
import { SolicitudesModule } from 'app/ventas/solicitudes/solicitudes.module';
import {BancoService} from 'app/ventas/services/banco.service';
import {ProductosModule} from 'app/productos/productos.module';




@NgModule({
  imports: [
    SharedModule,
    ClientesModule,
    ProductosModule,
    VentasRoutingModule,
    PedidosModule,
    SolicitudesModule
  ],
  declarations: [
    MainPageComponent,
    MainDashboardComponent,
  ],
  providers: [
    ExistenciasService,
    BancoService,
  ]
})
export class VentasModule { }
