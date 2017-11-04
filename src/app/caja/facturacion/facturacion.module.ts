import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { PendientesPageComponent } from './pendientes-page/pendientes-page.component';
import { CobroComponent } from './cobro/cobro.component';
import { CobroFormComponent } from './cobro/cobro-form/cobro-form.component';
import { GeneradasPageComponent } from './generadas-page/generadas-page.component';
import { CobranzaCodComponent } from './cobranza-cod/cobranza-cod.component';
import { CobroCodFormComponent } from './cobranza-cod/cobro-cod-form/cobro-cod-form.component';
import { CobroCodComponent } from './cobranza-cod/cobro-cod/cobro-cod.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([]),
  ],
  declarations: [PendientesPageComponent, CobroComponent, CobroFormComponent, GeneradasPageComponent, CobranzaCodComponent, CobroCodFormComponent, CobroCodComponent]
})
export class FacturacionModule { }
