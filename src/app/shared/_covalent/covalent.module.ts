import { NgModule } from '@angular/core';
import {
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, CovalentMessageModule, CovalentExpansionPanelModule,
  CovalentJsonFormatterModule,
} from '@covalent/core';

const COVALENT_MODULES: any[] = [
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, CovalentMessageModule,
  CovalentExpansionPanelModule, CovalentJsonFormatterModule,
];

@NgModule({
  imports: [
    COVALENT_MODULES
  ],
  exports: [
    COVALENT_MODULES
  ],
  declarations: []
})
export class CovalentModule { }
