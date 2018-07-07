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
import { CanceladasModule } from './canceladas/canceladas.module';
import { CancelacionDialogComponent } from './_components/cancelacion-dialog/cancelacion-dialog.component';
import { PartidasDialogComponent } from './_components/partidas-dialog/partidas-dialog.component';
import { PedidosPendientesComponent } from './_pages/_main-dashboard/pedidos-pendientes/pedidos-pendientes.component';
import { SolicitudesPendientesComponent } from './_pages/_main-dashboard/solicitudes-pendientes/solicitudes-pendientes.component';
import { PendientesListComponent } from './_pages/_main-dashboard/pedidos-pendientes/pendientes-list/pendientes-list.component';




@NgModule({
  imports: [
    SharedModule,
    ClientesModule,
    ProductosModule,
    VentasRoutingModule,
    PedidosModule,
    SolicitudesModule,
    CanceladasModule
  ],
  declarations: [
    MainPageComponent,
    MainDashboardComponent,
    CancelacionDialogComponent,
    PartidasDialogComponent,
    PedidosPendientesComponent,
    SolicitudesPendientesComponent,
    PendientesListComponent,

  ],
  providers: [
    ExistenciasService,
    BancoService,
  ],
  entryComponents: [
    CancelacionDialogComponent,
    PartidasDialogComponent
  ]
})
export class VentasModule { }
