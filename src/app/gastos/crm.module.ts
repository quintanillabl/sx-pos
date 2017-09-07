import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CrmRoutingModule } from './crm-routing.module';
import { 
  MainPageComponent, MainDashboardComponent } from './_pages';


@NgModule({
  imports: [
    SharedModule,
    CrmRoutingModule
  ],
  declarations: [
    MainPageComponent, 
    MainDashboardComponent]
})
export class CrmModule { }
