import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent,MainDashboardComponent,} from './_pages';
import { PedidosPageComponent, PedidoCreateComponent } from "./pedidos";
import { PendientesComponent } from './pedidos/pendientes/pendientes.component';
import { PedidoEditComponent } from './pedidos/pedido-edit/pedido-edit.component';

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
            path: 'pendientes',
            component: PendientesComponent
          },
          {
            path: 'create',
            component: PedidoCreateComponent
          },
          {
            path: 'edit/:id',
            component: PedidoEditComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
