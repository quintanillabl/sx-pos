import { NgModule } from '@angular/core';

import { ComprasRoutingModule } from './compras-routing.module';
import { SharedModule } from "../shared/shared.module";

//Services
import { OrdenesService } from "./services/ordenes.service";
// Presentational components
import { OrdenAddPartidaComponent } from './_components/orden-add-partida/orden-add-partida.component';
import { ProveedorFieldComponent } from './_components/proveedor-field/proveedor-field.component';
import { OrdenPartidasListComponent } from './_components/orden-partidas-list/orden-partidas-list.component';
import { OrdenesListComponent } from './_components/ordenes-list/ordenes-list.component';
import { RecepcionesPendientesComponent } from './_components/recepciones-pendientes/recepciones-pendientes.component';
import { RecepcionesRegistradasComponent } from './_components/recepciones-registradas/recepciones-registradas.component';
import { DevolucionesComponent } from './_components/devoluciones/devoluciones.component';
// Container components
import { 
  MainDashboardComponent,
  MainPageComponent,
  OrdenesPageComponent,
  OrdenesCreatePageComponent,
  RecepcionesPageComponent
} from './_pages';


const PAGES  = [
  MainPageComponent,
  MainDashboardComponent,
  OrdenesPageComponent, 
  OrdenesCreatePageComponent, 
  RecepcionesPageComponent,
];

const COMPONENTS  = [
  OrdenAddPartidaComponent, 
  ProveedorFieldComponent, 
  OrdenPartidasListComponent, 
  OrdenesListComponent
];

@NgModule({
  imports: [
    SharedModule,
    ComprasRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...PAGES,
    RecepcionesPendientesComponent,
    RecepcionesRegistradasComponent,
    DevolucionesComponent],
  providers: [OrdenesService]
})
export class ComprasModule { }
