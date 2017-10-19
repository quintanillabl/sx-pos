import { NgModule, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { FlexLayoutModule, } from '@angular/flex-layout';

import { NgxChartsModule, } from '@swimlane/ngx-charts';

import { MaterialModule } from './_material/material.module';
import { CovalentModule } from './_covalent/covalent.module';

import { PageFooterComponent } from './page-footer/page-footer.component';
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
import { ExistenciaFieldComponent } from './_fields/existencia-field/existencia-field.component';
import { GlobalUserNavListComponent } from './global-user-nav-list/global-user-nav-list.component';
import { ConsultasRapidasComponent } from './_components/consultas-rapidas/consultas-rapidas.component';

import * as Layout from './layout';
import { QvProductosBtnComponent } from './quick-views';
import { DireccionFormComponent } from './_components/direccion-form/direccion-form.component';
import { ClienteFieldComponent } from './_fields/cliente-field/cliente-field.component';


const FLEX_LAYOUT_MODULES: any[] = [
  FlexLayoutModule,
];

const ANGULAR_MODULES: any[] = [
  FormsModule, 
  ReactiveFormsModule,
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
  DireccionFormComponent,
  QvProductosBtnComponent,
  ClienteFieldComponent,
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ANGULAR_MODULES,
    MaterialModule,
    CovalentModule,
    OTHERS_MODULES,
    FLEX_LAYOUT_MODULES,
  ],
  declarations: [
    ...COMPONENTS,
    PageFooterComponent,
    AddressPipe,
    HasRoleDirective,
    SucursalFieldComponent,
    ProductoFieldComponent,
    ExistenciaFieldComponent,
    GlobalUserNavListComponent,
    ConsultasRapidasComponent,
    Layout.MainLayoutComponent,
    Layout.NavLayoutComponent,
    Layout.NavListLayoutComponent,
    Layout.ManageListLayoutComponent,
    DireccionFormComponent,
  ],
  exports: [
    ANGULAR_MODULES,
    MaterialModule,
    CovalentModule,
    OTHERS_MODULES,
    FLEX_LAYOUT_MODULES,
    COMPONENTS,
    PageFooterComponent,
    // Layout components
    Layout.MainLayoutComponent,
    Layout.NavLayoutComponent,
    Layout.NavListLayoutComponent,
    Layout.ManageListLayoutComponent,
    AddressPipe,
    HasRoleDirective,
    SucursalFieldComponent,
    ProductoFieldComponent,
    ExistenciaFieldComponent,
    GlobalUserNavListComponent,
    ConsultasRapidasComponent,
  ],
})
export class SharedModule { }
