import { NgModule, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { FlexLayoutModule, } from '@angular/flex-layout';
import {
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, CovalentMessageModule, CovalentExpansionPanelModule,
  CovalentJsonFormatterModule,
} from '@covalent/core';
import {
  MdButtonModule, MdCardModule, MdIconModule,
  MdListModule, MdMenuModule, MdTooltipModule,
  MdSlideToggleModule, MdInputModule, MdCheckboxModule,
  MdToolbarModule, MdSnackBarModule, MdSidenavModule,
  MdTabsModule, MdSelectModule, MdChipsModule, MdAutocompleteModule, MdDatepickerModule, MdNativeDateModule
} from '@angular/material';
import { NgxChartsModule, } from '@swimlane/ngx-charts';

import { ModuloLabelComponent } from './modulo-label/modulo-label.component';
import { PageToolbarComponent } from './page-toolbar/page-toolbar.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { NavListPageComponent } from './nav-list-page/nav-list-page.component';
import { NavPageComponent } from './nav-page/nav-page.component';
import { AddressPipe } from './pipes/address.pipe';
import { ModuleSelectorComponent } from './module-selector/module-selector.component';
import { ComentarioFieldComponent } from './_fields/comentario-field/comentario-field.component';
import { UsoCfdiFieldComponent } from './_fields/uso-cfdi-field/uso-cfdi-field.component';
import { TipoDeCambioComponent } from './_fields/tipo-de-cambio/tipo-de-cambio.component';
import { MonedaFieldComponent } from './_fields/moneda-field/moneda-field.component';
import { MomentModule } from 'angular2-moment';
import { HasRoleDirective } from './directives/has-role.directive';
import { SucursalFieldComponent } from './_fields/sucursal-field/sucursal-field.component';
import { ProductoFieldComponent } from './_fields/producto-field/producto-field.component';
import { GlobalUserNavListComponent } from './global-user-nav-list/global-user-nav-list.component';
import { ConsultasRapidasComponent } from './_components/consultas-rapidas/consultas-rapidas.component';


const FLEX_LAYOUT_MODULES: any[] = [
  FlexLayoutModule,
];

const ANGULAR_MODULES: any[] = [
  FormsModule, ReactiveFormsModule,
];

const MATERIAL_MODULES: any[] = [
  MdButtonModule, MdCardModule, MdIconModule,
  MdListModule, MdMenuModule, MdTooltipModule,
  MdSlideToggleModule, MdInputModule, MdCheckboxModule,
  MdToolbarModule, MdSnackBarModule, MdSidenavModule,
  MdTabsModule, MdSelectModule, MdChipsModule, MdAutocompleteModule, MdNativeDateModule, MdDatepickerModule,
];

const COVALENT_MODULES: any[] = [
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule, CovalentMessageModule,
  CovalentExpansionPanelModule, CovalentJsonFormatterModule,
];

const OTHERS_MODULES: any[] = [
  NgxChartsModule,
  MomentModule
];

const COMPONENTS: any[] = [
  ModuleSelectorComponent,
  UsoCfdiFieldComponent,
  ComentarioFieldComponent,
  TipoDeCambioComponent,
  MonedaFieldComponent,
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    OTHERS_MODULES,
    FLEX_LAYOUT_MODULES,
  ],
  declarations: [
    ...COMPONENTS,
    ModuloLabelComponent,
    PageToolbarComponent,
    PageFooterComponent,
    NavListPageComponent,
    NavPageComponent,
    AddressPipe,
    HasRoleDirective,
    SucursalFieldComponent,
    ProductoFieldComponent,
    GlobalUserNavListComponent,
    ConsultasRapidasComponent,
  ],
  exports: [
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES,
    OTHERS_MODULES,
    FLEX_LAYOUT_MODULES,
    COMPONENTS,
    ModuloLabelComponent,
    PageToolbarComponent,
    PageFooterComponent,
    NavListPageComponent,
    NavPageComponent,
    AddressPipe,
    HasRoleDirective,
    SucursalFieldComponent,
    ProductoFieldComponent,
    GlobalUserNavListComponent,
    ConsultasRapidasComponent,
  ]
})
export class SharedModule { }
