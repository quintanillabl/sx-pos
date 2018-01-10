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
  ],
  providers: [
    ExistenciasService,
    BancoService,
  ],
  entryComponents: [
    CancelacionDialogComponent
  ]
})
export class VentasModule { }
