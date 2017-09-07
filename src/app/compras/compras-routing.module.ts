import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComprasMainPageComponent } from "./_pages/compras-main-page/compras-main-page.component";
import { OrdenesPageComponent } from "./_pages/ordenes-page/ordenes-page.component";
import { OrdenesCreatePageComponent } from "./_pages/ordenes-create-page/ordenes-create-page.component";


const routes: Routes = [
  {
    path: '',
    component: ComprasMainPageComponent,
    children: [
      { path: 'ordenes', component: OrdenesPageComponent},
      { path: 'ordenes/create', component: OrdenesCreatePageComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
