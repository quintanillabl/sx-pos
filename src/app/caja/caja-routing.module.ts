import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CajaPageComponent} from './caja-page/caja-page.component';
import { MainPageComponent } from './_main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        component: CajaPageComponent,
        children: []
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CajaRoutingModule { }
