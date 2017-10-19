import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from "app/shared/shared.module";

import { 
  PedidoFormComponent, 
  PedidoEnvioPanelComponent,
  PedidoCargosPanelComponent,
  PedidoTotalesPanelComponent,
  PedidoToolbarComponent,
  PedidoHeaderComponent,
  PedidoComentarioPanelComponent,
} from '.';
import { PartidasGridComponent } from './partidas-grid/partidas-grid.component';
import { PedidoFormService } from "./pedido-form.service";
import { TipoFieldComponent } from './tipo-field/tipo-field.component';
import { ModoFieldComponent } from './modo-field/modo-field.component';
import { CompradorFieldComponent } from './comprador-field/comprador-field.component';
import { PedidoDetFormComponent } from './pedido-det-form/pedido-det-form.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  exports: [
    PedidoFormComponent
  ],
  declarations: [
    PedidoFormComponent, 
    PedidoEnvioPanelComponent,
    PedidoCargosPanelComponent,
    PedidoTotalesPanelComponent,
    PedidoToolbarComponent,
    PedidoHeaderComponent,
    PedidoComentarioPanelComponent,
    PartidasGridComponent,
    TipoFieldComponent,
    ModoFieldComponent,
    CompradorFieldComponent,
    PedidoDetFormComponent
  ],
  entryComponents: [
    PedidoDetFormComponent
  ],
  providers: [ PedidoFormService],
})
export class PedidoFormModule { }
