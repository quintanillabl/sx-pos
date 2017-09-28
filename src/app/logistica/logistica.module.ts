import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// ngrx
import { reducers } from './store/reducers';
import { DevolucionesEffects } from './store/effects/devoluciones.effects';
import { DecsEffects } from './store/effects/decs.effects';

import { SharedModule } from 'app/shared/shared.module';
import { LogisticaRoutingModule } from './logistica-routing.module';

import * as components  from './components';
import * as pages from './_pages';

// Services
import { MovimientosService } from './services/movimientos/movimientos.service';
import { TransformacionesService } from './services/transformaciones/transformaciones.service';
import { DevolucionesService } from './services/devoluciones/devoluciones.service';
import { DecsService } from './services/decs/decs.service';


const PAGES =  [
  pages.MainPageComponent,
  pages.MainDashboardComponent,
  pages.InventariosPageComponent,
  pages.MovimientosPageComponent,
  pages.MovimientosCreateComponent,
  pages.ComprasPageComponent,
  pages.TrasladosPageComponent,
  pages.ExistenciasPageComponent,
  pages.TransformacionesPageComponent,
  pages.TransformacionesCreatePageComponent,
  pages.TransformacionesEditPageComponent,
  pages.TransformacionesShowPageComponent,
  pages.DevolucionesVentaPageComponent,
  pages.DevolucionesShowPageComponent,
  pages.DevolucionCreatePageComponent,
  pages.DecsPageComponent,
];
const COMPONENTS = [
  components.MovimientosListComponent,
  components.MovimientoViewComponent,
  components.MovimientoFormComponent,
  components.MovimientoDetFormComponent,
  components.MovimientoPartidasListComponent,
  components.TransformacionFormComponent,
  components.TransformacionDetFormComponent,
  components.TransformacionPartidasListComponent,
  components.TransformaciondetDialogComponent,
  components.DevolucionesGridComponent,
  components.DevolucionDetGridComponent,
  components.DevolucionFormComponent,
  components.SelectorDeVentasDialogComponent,
  components.DevolucionPartidasComponent,
  components.RmdVentadetGridComponent,
  
]

@NgModule({
  imports: [
    SharedModule,
    LogisticaRoutingModule,
    /**
     * Feature store module for the state of this module
     */
    StoreModule.forFeature('logistica', reducers),
    /**
     * Side Effects for the module
     */
    EffectsModule.forFeature([DevolucionesEffects, DecsEffects])
  ],
  declarations: [
    ...PAGES,
    ...COMPONENTS
  ],
  entryComponents: [components.TransformaciondetDialogComponent, components.SelectorDeVentasDialogComponent],
  providers: [MovimientosService, TransformacionesService,
    DevolucionesService,
    DecsService
  ]
})
export class LogisticaModule { }
