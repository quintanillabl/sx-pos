import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { ComprasRoutingModule } from './compras-routing.module';
import { SharedModule } from "../shared/shared.module";

//Services
import { OrdenesService } from "./services/ordenes.service";
import { ProveedoresService } from 'app/compras/services/proveedores.service';

// Presentational components
import { OrdenesListComponent } from './_components/ordenes-list/ordenes-list.component';


// Presentational components
import * as components from './_components';
// Container components
import * as pages from './_pages';
import { ComsListComponent } from './_components/coms-list/coms-list.component';
import { ComsService } from './services/coms.service';
import { ComsShowPageComponent } from './_pages/recepciones-page/show/coms-show-page.component';
import { ComdetGridComponent } from './_components/comdet-grid/comdet-grid.component';
import { ComFormComponent } from './_components/com-form/com-form.component';
import { SelectorDeCompraDialogComponent } from './_components/com-form/selector-de-compra/selector-de-compra-dialog.component';
import { ComCompradetGridComponent } from './_components/com-form/selector-de-compra/compradet-gid/comCompradet-grid.component';
import { ComPartidasComponent } from './_components/com-form/partidas/com-partidas.component';
import { ComCreatePageComponent } from './_pages/recepciones-page/create/com-create-page.component';
import { ComEditPageComponent } from './_pages/recepciones-page/edit/com-edit-page.component';



const PAGES  = [
  pages.MainPageComponent,
  pages.OrdenesPageComponent, 
  pages.OrdenesCreatePageComponent, 
  pages.RecepcionesPageComponent,
  pages.OrdenesShowComponent,
];

const COMPONENTS  = [
  components.OrdenFormComponent,
  components.OrdenPartidasListComponent,
  components.ProveedorFieldComponent,
  components.OrdenAddPartidaBtnComponent,
  components.OrdendetAddDialogComponent,
  components.ProductoProvFieldComponent,
  OrdenesListComponent,
];

@NgModule({
  imports: [
    SharedModule,
    ComprasRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...PAGES,
    ComsListComponent,
    ComsShowPageComponent,
    ComPartidasComponent,
    ComdetGridComponent,
    ComFormComponent,
    SelectorDeCompraDialogComponent,
    ComCompradetGridComponent,
    ComCreatePageComponent,
    ComEditPageComponent,
  ],
  entryComponents: [components.OrdendetAddDialogComponent, SelectorDeCompraDialogComponent],
  // Services
  providers: [OrdenesService, ProveedoresService, ComsService]
})
export class ComprasModule { }
