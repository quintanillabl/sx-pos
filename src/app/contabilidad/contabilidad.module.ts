import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ContabilidadRoutingModule } from './contabilidad-routing.module';
import { 
  MainPageComponent, MainDashboardComponent, CuentasComponent, PolizasComponent } from './_pages';


@NgModule({
  imports: [
    SharedModule,
    ContabilidadRoutingModule
  ],
  declarations: [
    MainPageComponent, 
    MainDashboardComponent, 
    CuentasComponent, 
    PolizasComponent]
})
export class ContabilidadModule { }
