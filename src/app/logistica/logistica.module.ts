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
import { FacturistasEffects } from 'app/logistica/store/effects/facturistas.effects';
import { FacturistasService } from 'app/logistica/services/facturistas/facturistas.service';
import { ChoferesService } from 'app/logistica/services/choferes/choferes.service';
import { ChoferesEffects } from 'app/logistica/store/effects/choferes.effects';
import { TransportesService } from 'app/logistica/services/transportes/transportes.service';
import { TransportesEffects } from 'app/logistica/store/effects/transportes.effects';
import { EmbarqueService } from 'app/logistica/services/embarque/embarque.service';
import { EmbarquesEffects } from 'app/logistica/store/effects/embarques.effects';


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

  // Embarques
  pages.EmbarquesPageComponent,
  pages.FacturistaPageComponent,
  pages.FacturistasGridComponent,
  pages.ChoferesPageComponent,
  pages.ChoferesGridComponent,
  pages.TransportesPageComponent,
  pages.TransportesGridComponent,
  pages.EmbarquePageComponent,
  pages.EmbarqueFormComponent,
  pages.EmbarqueCreatePageComponent,
  pages.EmbarqueListComponent,
  pages.EmbarqueEditPageComponent,
  pages.EnvioFormComponent,
  pages.PartidasEnvioDialogComponent,
  pages.EnvioFormPartidasComponent,
  pages.TransitoPageComponent,
  pages.TransitoListComponent,
  pages.TransitoEditPageComponent,
  pages.TransitoFormComponent,
  pages.TransitoFormPartidasComponent,
  pages.EntregaPorChoferComponent,
  pages.VentasTransitoPageComponent,
  pages.FacturasPendientesPageComponent,
  pages.TrasladosPendientesPageComponent,
  pages.DevolucionesPendientesPageComponent,
  pages.EnvioEditPageComponent,
  pages.EnvioParcialFormComponent,
  pages.EnvioParcialPartidasComponent,
  pages.EnviodetSelectorDialogComponent,

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
  // Embarques
  components.ChoferFieldComponent,

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
      DevolucionesEffects, ComsEffects, DecsEffects, SolsEffects, SectoresEffects,
      ConteosEffects,
      FacturistasEffects,
      ChoferesEffects,
      TransportesEffects,
      EmbarquesEffects,
    ])
  ],
  declarations: [
    ...PAGES,
    ...COMPONENTS,
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
    pages.PartidasEnvioDialogComponent,
    pages.EntregaPorChoferComponent,
    pages.EnviodetSelectorDialogComponent,
  ],
  providers: [MovimientosService, TransformacionesService,
    DevolucionesService,
    DecsService,
    ComsService,
    SolsService,
    SectoresService,
    ConteosService,
    FacturistasService,
    ChoferesService,
    TransportesService,
    EmbarqueService,
  ]
})
export class LogisticaModule { }
