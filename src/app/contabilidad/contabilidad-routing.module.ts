import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { 
  MainPageComponent,
  MainDashboardComponent,
  CuentasComponent,
  PolizasComponent
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
        path: 'cuentas',
        component: CuentasComponent
      },
      {
        path: 'polizas',
        component: PolizasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContabilidadRoutingModule { }
