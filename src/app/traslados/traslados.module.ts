import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TrasladosRoutingModule } from './traslados-routing.module';
import { TrasladosPageComponent } from './traslados-page/traslados-page.component';
import { SolicitudesPageComponent } from './solicitudes-page/solicitudes-page.component';
import { RecepcionesPageComponent } from './recepciones-page/recepciones-page.component';
import { AtencionPageComponent } from './atencion-page/atencion-page.component';
import { SolicitudesListComponent } from './_components/solicitudes-list/solicitudes-list.component';
import { SolicitudesService } from 'app/traslados/services/solicitudes.service';
import { SolCreatePageComponent } from './solicitudes-page/sol-create-page.component';
import { SolicitudDeTrasladoFormComponent } from './_components/solicitud-de-traslado-form/solicitud-de-traslado-form.component';
import { SolicitudPartidasListComponent } from './_components/solicitud-partidas-list/solicitud-partidas-list.component';
import { SoldetAddComponent } from './_components/soldet-add/soldet-add.component';
import { SolShowPageComponent } from './solicitudes-page/sol-show-page.component';
import { SolsPoratenderListComponent } from './atencion-page/sols-poratender-list/sols-poratender-list.component';
import { SolAtencionComponent } from './atencion-page/sol-atencion/sol-atencion.component';


@NgModule({
  imports: [
    SharedModule,
    TrasladosRoutingModule
  ],
  declarations: [TrasladosPageComponent,
    SolicitudesPageComponent, RecepcionesPageComponent, AtencionPageComponent,
    SolicitudesListComponent,
    SolCreatePageComponent,
    SolicitudDeTrasladoFormComponent,
    SolicitudPartidasListComponent,
    SoldetAddComponent,
    SolShowPageComponent,
    SolsPoratenderListComponent,
    SolAtencionComponent],
  providers: [SolicitudesService],
  entryComponents: [SoldetAddComponent]
})
export class TrasladosModule { }
