import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CortesPageComponent } from './cortes-page/cortes-page.component';
import { CorteCobranzaComponent } from './corte-cobranza/corte-cobranza.component';
import { CorteFondoFijoComponent } from './corte-fondo-fijo/corte-fondo-fijo.component';
import { CorteMorrallaComponent } from './corte-morralla/corte-morralla.component';
import { EfectivoDialogComponent } from './corte-cobranza/efectivo-dialog/efectivo-dialog.component';
import { ChequeDialogComponent } from './corte-cobranza/cheque-dialog/cheque-dialog.component';
import { TarjetaDialogComponent } from './corte-cobranza/tarjeta-dialog/tarjeta-dialog.component';
import { DepositoDialogComponent } from './corte-cobranza/deposito-dialog/deposito-dialog.component';
import { CambioDeChequeDialogComponent } from './corte-cobranza/cambio-de-cheque-dialog/cambio-de-cheque-dialog.component';
import { CorteCobranzaListComponent } from './corte-cobranza/corte-cobranza-list/corte-cobranza-list.component';
import { FondoFijoListComponent } from './corte-fondo-fijo/fondo-fijo-list/fondo-fijo-list.component';
import { RembolsoComponent } from './corte-fondo-fijo/rembolso/rembolso.component';
import { GastoComponent } from './corte-fondo-fijo/gasto/gasto.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([]),
  ],
  declarations: [CortesPageComponent, CorteCobranzaComponent, CorteFondoFijoComponent,
    CorteMorrallaComponent,
    EfectivoDialogComponent,
    ChequeDialogComponent,
    TarjetaDialogComponent,
    DepositoDialogComponent,
    CambioDeChequeDialogComponent,
    CorteCobranzaListComponent,
    FondoFijoListComponent,
    RembolsoComponent,
    GastoComponent,
  ],
  entryComponents: [
    EfectivoDialogComponent,
    ChequeDialogComponent,
    TarjetaDialogComponent,
    DepositoDialogComponent,
    CambioDeChequeDialogComponent,
    RembolsoComponent,
    GastoComponent,
  ]
})
export class CortesModule { }
