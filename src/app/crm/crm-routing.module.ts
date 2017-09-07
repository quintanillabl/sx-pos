import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { 
  MainPageComponent,
  MainDashboardComponent,
  ClientesComponent,
  ClienteDashboardComponent,
  PropiedadesComponent,
  LealtadComponent
} from './_pages';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: MainDashboardComponent
      },
      {
        path: 'clientes',
        component: ClientesComponent
      },
      {
        path: 'cliente/:id',
        component: ClienteDashboardComponent,
        children: [
          { path: '', redirectTo: 'propiedades', pathMatch: 'full'},
          { path: 'propiedades', component: PropiedadesComponent },
          { path: 'lealtad', component: LealtadComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }
