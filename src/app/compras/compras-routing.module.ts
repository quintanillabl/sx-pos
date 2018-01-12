import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenesPageComponent } from "./_pages/ordenes-page/ordenes-page.component";
import { OrdenesCreatePageComponent } from "./_pages/ordenes-create-page/ordenes-create-page.component";
import { MainPageComponent, MainDashboardComponent, RecepcionesPageComponent, OrdenesShowComponent} from './_pages';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', redirectTo: 'ordenes', pathMatch: 'full'},
      { path: 'home', component: MainDashboardComponent },
      { path: 'ordenes', component: OrdenesPageComponent},
      { path: 'ordenes/create', component: OrdenesCreatePageComponent},
      { path: 'ordenes/show/:id', component: OrdenesShowComponent},
      { 
        path: 'recepciones', component: RecepcionesPageComponent,
        
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
