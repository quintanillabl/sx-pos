import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SociosListComponent } from './_pages/socios-list/socios-list.component';
import {SociosHomeComponent} from './_pages/socios-home/socios-home.component';

const routes: Routes = [
  {
    path: '',
    component: SociosHomeComponent,
    children: [
      {
        path: 'todos',
        component: SociosListComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SociosRoutingModule { }
