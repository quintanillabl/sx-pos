import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent,MainDashboardComponent,} from './_pages';
import { PedidosPageComponent, PedidoCreateComponent, PedidosPendientesComponent } from "./pedidos";

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
            component: PedidosPendientesComponent
          },
          {
            path: 'create',
            component: PedidoCreateComponent
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
