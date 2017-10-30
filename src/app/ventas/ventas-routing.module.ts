import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent, MainDashboardComponent } from './_pages';
import { PedidosPageComponent, PedidoCreateComponent } from './pedidos';
import { PendientesComponent } from './pedidos/pendientes/pendientes.component';
import { PedidoEditComponent } from './pedidos/pedido-edit/pedido-edit.component';
import { SolicitudesPageComponent } from 'app/ventas/solicitudes/solicitudes-page/solicitudes-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: MainDashboardComponent
      },
      {
        path: 'pedidos',
        component: PedidosPageComponent,
        children: [
          {
            path: '',
            redirectTo: 'pendientes', pathMatch: 'full'
          },
          {
            path: 'pendientes',
            component: PendientesComponent
          },
          {
            path: 'solicitudes',
            component: SolicitudesPageComponent
          }
        ]
      },
      {
        path: 'pedidos/create',
        component: PedidoCreateComponent
      },
      {
        path: 'pedidos/edit/:id',
        component: PedidoEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
