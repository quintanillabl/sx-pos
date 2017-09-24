import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdenesPageComponent } from "./_pages/ordenes-page/ordenes-page.component";
import { OrdenesCreatePageComponent } from "./_pages/ordenes-create-page/ordenes-create-page.component";
import { RecepcionesPendientesComponent } from './_components/recepciones-pendientes/recepciones-pendientes.component';
import { RecepcionesRegistradasComponent } from './_components/recepciones-registradas/recepciones-registradas.component';
import { DevolucionesComponent } from './_components/devoluciones/devoluciones.component';

import { MainPageComponent, MainDashboardComponent, RecepcionesPageComponent, OrdenesShowComponent} from './_pages';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: MainDashboardComponent },
      { path: 'ordenes', component: OrdenesPageComponent},
      { path: 'ordenes/create', component: OrdenesCreatePageComponent},
      { path: 'ordenes/show/:id', component: OrdenesShowComponent},
      { 
        path: 'recepciones', 
        component: RecepcionesPageComponent,
        children: [
          { path: '', redirectTo: 'pendientes', pathMatch: 'full'},
          { path: 'pendientes', component: RecepcionesPendientesComponent },
          { path: 'entradas', component: RecepcionesRegistradasComponent },
          { path: 'devoluciones', component: DevolucionesComponent}
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
