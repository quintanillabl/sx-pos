import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// ngrx
import { reducers } from './store/reducers';
import { DevolucionesEffects } from './store/effects/devoluciones.effects';
import { DecsEffects } from './store/effects/decs.effects';
import { ComsEffects } from './store/effects/coms.effects';
import { SolsEffects } from './store/effects/sols.effects';

import { SharedModule } from 'app/shared/shared.module';
import { LogisticaRoutingModule } from './logistica-routing.module';

import * as components from './components';
import * as pages from './_pages';

// Services
import { MovimientosService } from './services/movimientos/movimientos.service';
import { TransformacionesService } from './services/transformaciones/transformaciones.service';
import { DevolucionesService } from './services/devoluciones/devoluciones.service';
import { DecsService } from './services/decs/decs.service';
import { ComsService } from './services/coms/coms.service';
import {SolsService} from './services/sols/sols.service';
import {SectoresService} from './services/sectores/sectores.service';
import {SectoresEffects} from 'app/logistica/store/effects/sectores.effects';
import {ConteosService} from 'app/logistica/services/conteos/conteos.service';
import {ConteosEffects} from 'app/logistica/store/effects/conteos.effects';




const PAGES =  [
  pages.MainPageComponent,
  pages.MainDashboardComponent,
  pages.InventariosPageComponent,
  pages.MovimientosPageComponent,
  pages.MovimientosCreateComponent,
  pages.MovimientosShowComponent,
  pages.ComprasPageComponent,
  pages.ExistenciasPageComponent,
  // Transformaciones
  pages.TransformacionesPageComponent,
  pages.TransformacionesCreatePageComponent,
  pages.TransformacionesEditPageComponent,
  pages.TransformacionesShowPageComponent,
  pages.DevolucionesVentaPageComponent,
  pages.DevolucionesShowPageComponent,
  pages.DevolucionCreatePageComponent,
  pages.ComsPageComponent,
  pages.ComsShowPageComponent,
  pages.ComCreatePageComponent,
  // DECS
  pages.DecsPageComponent,
  pages.DecCreatePageComponent,
  pages.DecShowPageComponent,
  // Traslados
  pages.TrasladosPageComponent,
  pages.SolicitudesComponent,
  pages.AtendidosPageComponent,
  pages.SolShowPageComponent,
  pages.SolCreatePageComponent,
  pages.SolicitudesPorAtenderPageComponent,
  // ALMACEN
  pages.AlmacenPageComponent,
  //  Alacen sectores
  pages.SectoresPageComponent,
  pages.SectorCreatePageComponent,
  pages.AlmacenSectorFormComponent,
  pages.SectorDetDialogComponent,
  pages.SectorFormPartidasComponent,
  pages.SectoresGridComponent,
  pages.SectorEditPageComponent,
  // Almacen Conteo
  pages.ConteoPageComponent,
  pages.ConteoEditPageComponent,
  pages.ConteoGridComponent,
  pages.ConteoFormComponent,
  pages.ConteoFormPartidasComponent,
  pages.ConteoDetDialogComponent,
  // Almacen Captura
  pages.CapturaPageComponent,
  pages.CapturaEditPageComponent,
  pages.CapturaGridComponent,
  pages.CapturaFormComponent,
  pages.CapturaFormPartidasComponent,
  pages.CapturaDetDialogComponent,
  // Almacen Registro
  pages.RegistroConteoPageComponent,
];
const COMPONENTS = [
  components.MovimientosListComponent,
  components.MovimientoViewComponent,
  components.MovimientoFormComponent,
  components.MovimientoDetFormComponent,
  components.MovimientoPartidasListComponent,
  components.MovimientoDetGridComponent,
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
  components.ComsGridComponent,
  components.ComdetGridComponent,
  components.ComFormComponent,
  components.SelectorDeCompraDialogComponent,
  components.ComCompradetGridComponent,
  components.ComPartidasComponent,
  // Decs
  components.DecsGridComponent,
  components.DecdetGridComponent,
  components.DecFormComponent,
  components.DecPartidasComponent,
  components.DecComdetGridComponent,
  components.SelectorDeComDialogComponent,
  // Sols
  components.SolsGridComponent,
  components.SolFormComponent,
  components.AddSoldetDialogComponent,
  components.SolFormPartidasComponent,

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
    EffectsModule.forFeature([
      DevolucionesEffects, ComsEffects, DecsEffects, SolsEffects, SectoresEffects, ConteosEffects,
    ])
  ],
  declarations: [
    ...PAGES,
    ...COMPONENTS
  ],
  entryComponents: [
    components.TransformaciondetDialogComponent,
    components.SelectorDeVentasDialogComponent,
    components.SelectorDeCompraDialogComponent,
    components.SelectorDeComDialogComponent,
    components.AddSoldetDialogComponent,
    pages.SectorDetDialogComponent,
    pages.ConteoDetDialogComponent,
    pages.CapturaDetDialogComponent,
  ],
  providers: [MovimientosService, TransformacionesService,
    DevolucionesService,
    DecsService,
    ComsService,
    SolsService,
    SectoresService,
    ConteosService
  ]
})
export class LogisticaModule { }
