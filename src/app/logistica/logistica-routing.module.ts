import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as pages from './_pages/';

const routes: Routes = [
  {
    path: '',
    component: pages.MainPageComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: pages.MainDashboardComponent},
      { 
        path: 'inventarios', 
        component: pages.InventariosPageComponent,
        children: [
          { path: '', redirectTo: 'movimientos', pathMatch: 'full'},
          { path: 'movimientos', component: pages.MovimientosPageComponent},
          { path: 'compras', component: pages.ComprasPageComponent},
          { path: 'traslados', component: pages.TrasladosPageComponent},
          { path: 'existencias', component: pages.ExistenciasPageComponent}
        ]
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticaRoutingModule { }
