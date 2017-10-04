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
          { path: 'movimientos/create', component: pages.MovimientosCreateComponent},
          { path: 'movimientos/show/:id', component: pages.MovimientosShowComponent},
          
          { path: 'traslados', component: pages.TrasladosPageComponent},
          { path: 'existencias', component: pages.ExistenciasPageComponent},
          { path: 'transformaciones', component: pages.TransformacionesPageComponent},
          { path: 'transformaciones/create', component: pages.TransformacionesCreatePageComponent},
          { path: 'transformaciones/show/:id', component: pages.TransformacionesShowPageComponent},
          { path: 'transformaciones/edit/:id', component: pages.TransformacionesEditPageComponent},
          // Devoluciones de venta
          { path: 'devoluciones', component: pages.DevolucionesVentaPageComponent},
          { path: 'devoluciones/create', component: pages.DevolucionCreatePageComponent},
          { path: 'devoluciones/show/:id', component: pages.DevolucionesShowPageComponent},
          // Devoluciones de compras
          { path: 'decs', component: pages.DecsPageComponent},
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
