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
import { PendientesComponent } from './pendientes/pendientes.component';
import { PendientesListComponent } from './pendientes/pendientes-list/pendientes-list.component';
import { PedidoEditComponent } from './pedido-edit/pedido-edit.component';
import { PedidoDolaresCreateComponent } from './pedido-create/pedido-dolares-create.component';
import { PedidoDolaresEditComponent } from './pedido-edit/pedido-dolares-edit.component';
import { PedidoAnticipoCreateComponent } from './pedido-create/pedido-anticipo-create.component';
import { PedidoAnticipoEditComponent } from './pedido-edit/pedido-anticipo-edit.component';


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
    PendientesComponent,
    PendientesListComponent,
    PedidoEditComponent,
    PedidoDolaresCreateComponent,
    PedidoDolaresEditComponent,
    PedidoAnticipoCreateComponent,
    PedidoAnticipoEditComponent,
  ],
  providers: [ PedidosService],
  exports: [RouterModule]
})
export class PedidosModule { }
