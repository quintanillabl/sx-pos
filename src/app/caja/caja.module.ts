import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { CajaRoutingModule } from './caja-routing.module';
import { CajaPageComponent } from './caja-page/caja-page.component';
import { MainPageComponent } from './_main-page/main-page.component';
import { ReportesService } from './services/reportes.service';
import { VentasDiariasComponent } from './reportes/ventas-diarias/ventas-diarias.component';
import { FacturacionModule } from './facturacion/facturacion.module';
import { CajaService } from './services/caja.service';
import { CobroService } from './services/cobro.service';


// Reportes
import { AplicacionSaldosComponent } from './reportes/aplicacion-saldos/aplicacion-saldos.component';
import { CobranzaCamionetaComponent } from './reportes/cobranza-camioneta/cobranza-camioneta.component';
import { CobranzaEfectivoComponent } from './reportes/cobranza-efectivo/cobranza-efectivo.component';
import { FacturasPendientesCODComponent } from './reportes/facturas-pendientes-cod/facturas-pendientes-cod.component';
import { FacturasCanceladasComponent } from './reportes/facturas-canceladas/facturas-canceladas.component';
import { FacturasCobradasComponent } from './reportes/facturas-cobradas/facturas-cobradas.component';
import { FacturasPendientesEmbarqueComponent } from './reportes/facturas-pendientes-embarque/facturas-pendientes-embarque.component';
import { DisponiblesSucursalComponent } from './reportes/disponibles-sucursal/disponibles-sucursal.component';
import { VentasDiariasCheComponent } from './reportes/ventas-diarias-che/ventas-diarias-che.component';
import { CortesModule } from './cortes/cortes.module';


@NgModule({
  imports: [
    SharedModule,
    CajaRoutingModule,
    FacturacionModule,
    CortesModule,
  ],
  declarations: [
    MainPageComponent,
    CajaPageComponent,
    VentasDiariasComponent,
    AplicacionSaldosComponent,
    CobranzaCamionetaComponent,
    CobranzaEfectivoComponent,
    FacturasPendientesCODComponent,
    FacturasCobradasComponent,
    FacturasCanceladasComponent,
    FacturasPendientesEmbarqueComponent,
    DisponiblesSucursalComponent,
    VentasDiariasCheComponent
  ],
  providers: [
    ReportesService,
    CajaService,
    CobroService,
  ],
  entryComponents: [
    VentasDiariasComponent,
    AplicacionSaldosComponent,
    CobranzaCamionetaComponent,
    CobranzaEfectivoComponent,
    FacturasPendientesCODComponent,
    FacturasCobradasComponent,
    FacturasCanceladasComponent,
    FacturasPendientesEmbarqueComponent,
    DisponiblesSucursalComponent,
    VentasDiariasCheComponent,
  ]
})
export class CajaModule { }
