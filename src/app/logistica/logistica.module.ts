import { NgModule } from '@angular/core';

import { SharedModule } from "app/shared/shared.module";
import { LogisticaRoutingModule } from './logistica-routing.module';
import * as pages from './_pages';

//import * as components from './components';

const PAGES =  [
  pages.MainPageComponent,
  pages.MainDashboardComponent,
  pages.InventariosPageComponent,
  pages.MovimientosPageComponent,
  pages.ComprasPageComponent,
  pages.TrasladosPageComponent,
  pages.ExistenciasPageComponent,
];
const COMPONENTS = [

]

@NgModule({
  imports: [
    SharedModule,
    LogisticaRoutingModule
  ],
  declarations: [
    ...PAGES,
    ...COMPONENTS
  ]
})
export class LogisticaModule { }
