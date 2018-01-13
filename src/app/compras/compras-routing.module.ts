import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenesPageComponent } from "./_pages/ordenes-page/ordenes-page.component";
import { OrdenesCreatePageComponent } from "./_pages/ordenes-create-page/ordenes-create-page.component";
import { MainPageComponent, RecepcionesPageComponent, OrdenesShowComponent} from './_pages';
import { ComsShowPageComponent } from './_pages/recepciones-page/show/coms-show-page.component';
import { ComCreatePageComponent } from './_pages/recepciones-page/create/com-create-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', redirectTo: 'ordenes', pathMatch: 'full'},
      { path: 'ordenes', component: OrdenesPageComponent},
      { path: 'ordenes/create', component: OrdenesCreatePageComponent},
      { path: 'ordenes/show/:id', component: OrdenesShowComponent},
      { path: 'recepciones', component: RecepcionesPageComponent},
      { path: 'recepciones/create', component: ComCreatePageComponent},
      { path: 'recepciones/show/:id', component: ComsShowPageComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
