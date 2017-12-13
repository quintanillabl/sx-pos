import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TrasladosPageComponent} from './traslados-page/traslados-page.component';
import {SolicitudesPageComponent} from './solicitudes-page/solicitudes-page.component';
import {RecepcionesPageComponent} from './recepciones-page/recepciones-page.component';
import {AtencionPageComponent} from './atencion-page/atencion-page.component';
import {SolCreatePageComponent} from './solicitudes-page/sol-create-page.component';




const routes: Routes = [
  {
    path: '',
    component: TrasladosPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'solicitudes',
        pathMatch: 'full'
      },
      {
        path: 'solicitudes',
        component: SolicitudesPageComponent
      },
      {
        path: 'solicitudes/create',
        component: SolCreatePageComponent
      },
      {
        path: 'atencion',
        component: AtencionPageComponent
      },
      {
        path: 'recepciones',
        component: RecepcionesPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrasladosRoutingModule { }
