import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { CajaRoutingModule } from './caja-routing.module';
import { CajaPageComponent } from './caja-page/caja-page.component';
import { MainPageComponent } from './_main-page/main-page.component';
import { ReportesService } from './services/reportes.service';


@NgModule({
  imports: [
    SharedModule,
    CajaRoutingModule
  ],
  declarations: [
    MainPageComponent,
    CajaPageComponent,
  ],
  providers: [
    ReportesService
  ]
})
export class CajaModule { }
