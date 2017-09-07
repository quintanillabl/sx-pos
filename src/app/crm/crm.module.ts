import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CrmRoutingModule } from './crm-routing.module';
import { 
  MainPageComponent, 
  MainDashboardComponent,
  ClientesComponent,
  ClienteDashboardComponent,
  PropiedadesComponent,
  LealtadComponent,
  ClientesSearchComponent,
} from './_pages';

@NgModule({
  imports: [
    SharedModule,
    CrmRoutingModule
  ],
  declarations: [
    MainPageComponent, 
    MainDashboardComponent, 
    ClientesComponent,
    ClienteDashboardComponent,
    PropiedadesComponent,
    LealtadComponent,
    ClientesSearchComponent,
  ]
})
export class CrmModule { }
