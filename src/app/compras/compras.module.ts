import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { ComprasRoutingModule } from './compras-routing.module';
import { SharedModule } from "../shared/shared.module";

//ngrx stuff 
import { reducers } from './store/reducers';
import { OrdenesEffects } from './store/effects/ordenes.effects';

//Services
import { OrdenesService } from "./services/ordenes.service";
import { ProveedoresService } from '@siipapx/compras/services/proveedores.service';

// Presentational components
import { OrdenesListComponent } from './_components/ordenes-list/ordenes-list.component';
import { RecepcionesPendientesComponent } from './_components/recepciones-pendientes/recepciones-pendientes.component';
import { RecepcionesRegistradasComponent } from './_components/recepciones-registradas/recepciones-registradas.component';
import { DevolucionesComponent } from './_components/devoluciones/devoluciones.component';

// Presentational components
import * as components from './_components';
// Container components
import * as pages from './_pages';

const PAGES  = [
  pages.MainPageComponent,
  pages.MainDashboardComponent,
  pages.OrdenesPageComponent, 
  pages.OrdenesCreatePageComponent, 
  pages.RecepcionesPageComponent,
  pages.OrdenesShowComponent,
];

const COMPONENTS  = [
  components.OrdenFormComponent,
  components.OrdenPartidasListComponent,
  components.ProveedorFieldComponent,
  components.OrdenAddPartidaBtnComponent,
  components.OrdendetAddDialogComponent,
  components.ProductoProvFieldComponent,
  OrdenesListComponent,
];

@NgModule({
  imports: [
    SharedModule,
    ComprasRoutingModule,
    /**
     * Feature store module for the state of this module
     */
    StoreModule.forFeature('compras', reducers),
    /**
     * Side Effects for the module
     */
    EffectsModule.forFeature([OrdenesEffects])
  ],
  declarations: [
    ...COMPONENTS,
    ...PAGES,
    RecepcionesPendientesComponent,
    RecepcionesRegistradasComponent,
    DevolucionesComponent
  ],
  entryComponents: [components.OrdendetAddDialogComponent],
  // Services
  providers: [OrdenesService, ProveedoresService]
})
export class ComprasModule { }
