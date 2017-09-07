import { NgModule } from '@angular/core';

import { ComprasRoutingModule } from './compras-routing.module';
import { SharedModule } from "../shared/shared.module";
import { ComprasMainPageComponent } from './_pages/compras-main-page/compras-main-page.component';
import { OrdenesPageComponent } from './_pages/ordenes-page/ordenes-page.component';
import { OrdenesCreatePageComponent } from './_pages/ordenes-create-page/ordenes-create-page.component';
import { OrdenAddPartidaComponent } from './_components/orden-add-partida/orden-add-partida.component';
import { ProveedorFieldComponent } from './_components/proveedor-field/proveedor-field.component';
import { OrdenesService } from "./services/ordenes.service";
import { OrdenPartidasListComponent } from './_components/orden-partidas-list/orden-partidas-list.component';
import { OrdenesListComponent } from './_components/ordenes-list/ordenes-list.component';


@NgModule({
  imports: [
    SharedModule,
    ComprasRoutingModule
  ],
  declarations: [ComprasMainPageComponent, OrdenesPageComponent, OrdenesCreatePageComponent, OrdenAddPartidaComponent, ProveedorFieldComponent, OrdenPartidasListComponent, OrdenesListComponent],
  providers: [OrdenesService]
})
export class ComprasModule { }
