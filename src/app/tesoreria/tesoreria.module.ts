import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TesoreriaRoutingModule } from './tesoreria-routing.module';
import { 
  MainPageComponent, MainDashboardComponent } from './_pages';


@NgModule({
  imports: [
    SharedModule,
    TesoreriaRoutingModule
  ],
  declarations: [
    MainPageComponent, 
    MainDashboardComponent]
})
export class TesoreriaModule { }
