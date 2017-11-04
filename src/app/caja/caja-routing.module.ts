import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CajaPageComponent} from './caja-page/caja-page.component';
import { MainPageComponent } from './_main-page/main-page.component';
import { PendientesPageComponent } from './facturacion/pendientes-page/pendientes-page.component';
import { CobroComponent } from './facturacion/cobro/cobro.component';
import { GeneradasPageComponent } from './facturacion/generadas-page/generadas-page.component';
import { CobranzaCodComponent } from './facturacion/cobranza-cod/cobranza-cod.component';
import { CobroCodComponent } from './facturacion/cobranza-cod/cobro-cod/cobro-cod.component';
import { CortesPageComponent } from './cortes/cortes-page/cortes-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        component: CajaPageComponent,
        children: [
          {
            path: 'facturacion',
            component: PendientesPageComponent
          },
          {
            path: 'cobro/:id',
            component: CobroComponent
          },
          {
            path: 'generadas',
            component: GeneradasPageComponent
          },
          {
            path: 'cobranzaCod',
            component: CobranzaCodComponent
          },
          {
            path: 'cobroCod/:id',
            component: CobroCodComponent
          }
        ]
      },
      {
        path:'cortes',
        component: CortesPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CajaRoutingModule { }
