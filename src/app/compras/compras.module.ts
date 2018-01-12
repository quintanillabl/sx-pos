import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { ComprasRoutingModule } from './compras-routing.module';
import { SharedModule } from "../shared/shared.module";

//ngrx stuff 
import { reducers } from './store/reducers';
import { OrdenesEffects } from './store/effects/ordenes.effects';
import { CompraFormEffects } from './store/effects/compra-form.effects';

//Services
import { OrdenesService } from "./services/ordenes.service";
import { ProveedoresService } from '@siipapx/compras/services/proveedores.service';

// Presentational components
import { OrdenesListComponent } from './_components/ordenes-list/ordenes-list.component';


// Presentational components
import * as components from './_components';
// Container components
import * as pages from './_pages';
import { ComsListComponent } from './_components/coms-list/coms-list.component';
import { ComsService } from './services/coms.service';

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
    EffectsModule.forFeature([OrdenesEffects, CompraFormEffects])
  ],
  declarations: [
    ...COMPONENTS,
    ...PAGES,
    ComsListComponent,
  ],
  entryComponents: [components.OrdendetAddDialogComponent],
  // Services
  providers: [OrdenesService, ProveedoresService, ComsService]
})
export class ComprasModule { }
