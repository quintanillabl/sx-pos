import { NgModule } from '@angular/core';

import { SharedModule } from "app/shared/shared.module";

import { 
  PedidoFormComponent, 
  PedidoEnvioPanelComponent,
  PedidoCargosPanelComponent,
  PedidoTotalesPanelComponent,
  PedidoToolbarComponent,
  PedidoHeaderComponent,
  PedidoComentarioPanelComponent,
  AddPartidaComponent
} from '.';
import { PartidasGridComponent } from './partidas-grid/partidas-grid.component';
import { PedidoFormService } from "./pedido-form.service";

@NgModule({
  imports: [
    SharedModule
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
    AddPartidaComponent
  ],
  providers: [ PedidoFormService],
})
export class PedidoFormModule { }
