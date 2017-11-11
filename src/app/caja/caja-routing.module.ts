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
import { FacturaShowComponent } from '@siipapx/caja/facturacion/factura-show/factura-show.component';
import { CorteCobranzaComponent } from '@siipapx/caja/cortes/corte-cobranza/corte-cobranza.component';
import { CorteMorrallaComponent } from '@siipapx/caja/cortes/corte-morralla/corte-morralla.component';
import { CorteFondoFijoComponent } from '@siipapx/caja/cortes/corte-fondo-fijo/corte-fondo-fijo.component';

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
            path: 'generadas/show/:id',
            component: FacturaShowComponent
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
        component: CortesPageComponent,
        children: [
          {path: 'cobranza', component: CorteCobranzaComponent},
          {path: 'fondoFijo', component: CorteFondoFijoComponent},
          {path: 'morralla', component: CorteMorrallaComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CajaRoutingModule { }
