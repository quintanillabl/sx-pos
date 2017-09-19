import { NgModule } from '@angular/core';

import { SharedModule } from "app/shared/shared.module";
import { LogisticaRoutingModule } from './logistica-routing.module';

import * as components  from './components';
import * as pages from './_pages';

// Services
import { MovimientosService } from "./services/movimientos/movimientos.service";



const PAGES =  [
  pages.MainPageComponent,
  pages.MainDashboardComponent,
  pages.InventariosPageComponent,
  pages.MovimientosPageComponent,
  pages.MovimientosCreateComponent,
  pages.ComprasPageComponent,
  pages.TrasladosPageComponent,
  pages.ExistenciasPageComponent,
  
];
const COMPONENTS = [
  components.MovimientosListComponent,
  components.MovimientoViewComponent,
  components.MovimientoFormComponent,
]

@NgModule({
  imports: [
    SharedModule,
    LogisticaRoutingModule
  ],
  declarations: [
    ...PAGES,
    ...COMPONENTS
  ],
  providers: [MovimientosService]
})
export class LogisticaModule { }
